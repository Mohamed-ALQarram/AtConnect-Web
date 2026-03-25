// src/features/chat/api/signalr.ts
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useAuthStore } from '../features/auth/stores/useAuthStore';

// Create a variable to hold the connection instance
let connection = null;
// const url = "https://localhost:7217/Hubs/AtConnect";
const url = "https://atconnect.runasp.net/Hubs/AtConnect";
// Function to establish the connection
export const startConnection = async () => {
    // Return existing connection if it is already established
    if (connection) return connection;

    connection = new HubConnectionBuilder()
        .withUrl(url, {
            accessTokenFactory: () => useAuthStore.getState().accessToken
        })
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Information)
        .build();

    try {
        await connection.start();
        // Connection successful
        console.log("SignalR Connected.");
    } catch (err) {
        // Handle connection error
        console.error("SignalR Connection Error: ", err);
    }

    return connection;
};

// Function to stop the connection
export const stopConnection = async () => {
    if (connection) {
        await connection.stop();
        connection = null;
    }
};

// Function to get the current connection
export const getConnection = () => connection;