import { stopConnection, startConnection, getConnection } from '../../../api/signalR';
import { useEffect, useState } from 'react';

export const useChat = () => {
    // List to hold all chat messages
    const [messages, setMessages] = useState([]);
    // State to know if we are connected to the server
    const [isConnected, setIsConnected] = useState(false);

    // Method to clear accumulated local new messages
    const clearMessages = () => setMessages([]);

    useEffect(() => {
        // A flag to check if the component is still visible on the screen
        let isMounted = true;

        const initSignalR = async () => {
            // Wait for the connection to start
            const connection = await startConnection();

            // If the component is visible and the connection is ready
            if (isMounted && connection) {
                setIsConnected(true);

                // Start listening for new messages coming from the server
                connection.on("ReceiveMessage", (messageDto) => {
                    console.log("ReceiveMessage raw data:", messageDto);

                    // Normalize properties to handle potential PascalCase from .NET serialization
                    // Fallback to default values for sentAt and status if they are missing
                    const normalizedMsg = {
                        id: messageDto.id || messageDto.Id,
                        chatId: messageDto.chatId || messageDto.ChatId,
                        senderId: messageDto.senderId || messageDto.SenderId,
                        content: messageDto.content || messageDto.Content,
                        sentAt: messageDto.sentAt || messageDto.SentAt || new Date().toISOString(),
                        status: messageDto.status || messageDto.Status || 'Sent'
                    };
                    console.log("Normalized new message:", normalizedMsg);

                    // Add the new message to the end of our current list
                    setMessages(prev => [...prev, normalizedMsg]);
                });
            }
        };

        // Call the function to start everything
        initSignalR();

        // This function runs only when the component is removed from the screen
        return () => {
            isMounted = false;
            const connection = getConnection();

            if (connection) {
                // Stop listening to messages to save memory
                connection.off("ReceiveMessage");

                // Note: We do not call stopConnection() here.
                // We keep the connection open in the background for better performance.
            }
        };
    }, []);

    // Function to send a message to the server
    const sendMessage = async (chatId, content) => {
        const connection = getConnection();

        // Make sure we are fully connected before trying to send
        if (connection && connection.state === 'Connected') {
            try {
                // Send the chat data to the server
                await connection.invoke("SendMessage", { chatId, content });
            } catch (error) {
                // Print the error if sending fails
                console.error("Error sending message: ", error);
            }
        } else {
            // Show a warning if the connection is closed
            console.warn("Cannot send message. SignalR is not connected.");
        }
    };

    // Return the data and functions so the component can use them
    return { messages, isConnected, sendMessage, clearMessages };
};