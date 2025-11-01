import apiClient from './api';

export const loginUser = async (email, password) => {
  const response = await apiClient.post('/auth/login', {
    email,
    password,
  });
  return response.data; // { token, email, firstName }
};

export const signupUser = async (firstName, lastName, email, password) => {
  const response = await apiClient.post('/auth/signup', {
    firstName,
    lastName,
    email,
    password,
    role: 'RECIPIENT', // Default role for new signups
  });
  return response.data; // { token, email, firstName }
};
