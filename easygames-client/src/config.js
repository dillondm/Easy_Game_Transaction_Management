export const API_BASE_URL = 'https://localhost:7144'; 
export const API_ENDPOINTS = {
  clients: `${API_BASE_URL}/api/clients`,
  clientSearch: (term) => `${API_BASE_URL}/api/clients/search?term=${term}`,
  clientById: (id) => `${API_BASE_URL}/api/clients/${id}`,
  transactionTypes: `${API_BASE_URL}/api/transactions/types`,
  clientTransactions: (id) => `${API_BASE_URL}/api/transactions/client/${id}`,
  addTransaction: `${API_BASE_URL}/api/transactions`,
  updateComment: `${API_BASE_URL}/api/transactions/comment`,
};