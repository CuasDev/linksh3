import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// URL related API calls
const urlService = {
  // Shorten a URL
  shortenUrl: async (longUrl) => {
    try {
      const response = await api.post('/url/shorten', { longUrl });
      return response.data;
    } catch (error) {
      console.error('Error shortening URL:', error);
      throw error.response?.data?.error || 'Failed to shorten URL. Please try again.';
    }
  },

  // Get public URL statistics
  getStats: async () => {
    try {
      const response = await api.get('/url/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching URL statistics:', error);
      throw error.response?.data?.error || 'Failed to load URL statistics. Please try again later.';
    }
  },
  
  // Get user's own URLs
  getUserUrls: async () => {
    try {
      const response = await api.get('/url/my-urls');
      return response.data;
    } catch (error) {
      console.error('Error fetching user URLs:', error);
      throw error.response?.data?.error || 'Failed to load your URLs. Please try again later.';
    }
  },
  
  // Get all URLs (admin only)
  getAdminStats: async () => {
    try {
      const response = await api.get('/url/admin-stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching admin stats:', error);
      throw error.response?.data?.error || 'Failed to load admin statistics. Please try again later.';
    }
  },
  
  // Delete a URL
  deleteUrl: async (id) => {
    try {
      const response = await api.delete(`/url/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting URL:', error);
      throw error.response?.data?.error || 'Failed to delete URL. Please try again.';
    }
  },
  
  // Get all users (admin only)
  getUsers: async () => {
    try {
      const response = await api.get('/auth/users');
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error.response?.data?.error || 'Failed to load users. Please try again later.';
    }
  },
};

// Export both the axios instance and the URL service
export { urlService as default, api };