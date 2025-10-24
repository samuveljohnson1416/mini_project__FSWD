import api from './api';

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface SignupData extends LoginData {
  name: string;
}

export const authService = {
  signup: async (data: SignupData) => {
    console.log('authService.signup called with:', data.email);
    const response = await api.post('/auth/signup', data);
    console.log('authService.signup response:', response.data);
    return response.data;
  },

  login: async (data: LoginData) => {
    console.log('authService.login called with:', data.email);
    console.log('API base URL:', api.defaults.baseURL);
    const response = await api.post('/auth/login', data);
    console.log('authService.login response:', response.data);
    return response.data;
  },

  getProfile: async () => {
    console.log('authService.getProfile called');
    const response = await api.get('/auth/profile');
    console.log('authService.getProfile response:', response.data);
    return response.data;
  },
};
