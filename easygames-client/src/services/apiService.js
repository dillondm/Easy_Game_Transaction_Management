import axios from 'axios';
import { API_ENDPOINTS } from '../config';


const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, 
});


api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ERR_NETWORK') {
      console.error('Network Error: Cannot connect to API. Is the API running?');
      throw new Error('Cannot connect to API. Please ensure the API is running.');
    }
    if (error.response) {
      console.error('API Error:', error.response.data);
      throw new Error(error.response.data.message || 'API request failed');
    }
    throw error;
  }
);


export const apiService = {
  getAllClients: async () => {
    const response = await api.get(API_ENDPOINTS.clients);
    return response.data.data;
  },

  
  getClientById: async (id) => {
    const response = await api.get(API_ENDPOINTS.clientById(id));
    return response.data.data;
  },

  
  searchClients: async (searchTerm) => {
    const response = await api.get(API_ENDPOINTS.clientSearch(searchTerm));
    return response.data.data;
  },

  
  getTransactionTypes: async () => {
    const response = await api.get(API_ENDPOINTS.transactionTypes);
    return response.data.data;
  },

  
  getClientTransactions: async (clientId) => {
    const response = await api.get(API_ENDPOINTS.clientTransactions(clientId));
    return response.data.data;
  },

  
  addTransaction: async (transactionData) => {
    const response = await api.post(API_ENDPOINTS.addTransaction, transactionData);
    return response.data;
  },

 
  updateComment: async (commentData) => {
    const response = await api.put(API_ENDPOINTS.updateComment, commentData);
    return response.data;
  },
};