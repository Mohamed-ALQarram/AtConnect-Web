
import  {api} from "g:/MyProjects/AtConnect-Web/src/Api/axios"

// Login API request
// Expects: { userNameOrEmail, password }
// Returns standard wrapper: { success, message, data }
export const login = async (userNameOrEmail, password) => {
  const response = await api.post('/api/Account/Login', {
    userNameOrEmail,
    password
  });
  return response.data; 
};

// Register API request
// Expects: { firstName, lastName, userName, email, password }
// Returns standard wrapper: { success, message, data }
export const register = async (userData) => {
  const response = await api.post('/api/Account/Register', userData);
  return response.data;
};

// Verify Email (OTP) API request
// Expects: { email, token }
// Returns standard wrapper: { success, message, data: { accessToken, ... } }
export const verifyEmail = async (email, token) => {
  const response = await api.post('/api/Account/VerifyEmailCode', {
    email,
    token
  });
  return response.data;
};
