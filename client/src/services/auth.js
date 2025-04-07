const API_URL = '/api/auth';

export const registerAdmin = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/register/admin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Registration failed');
    }

    return data;
  } catch (error) {
    return { error: error.message };
  }
};

export const login = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Login failed');
    }

    // Store the token in localStorage
    if (data.token) {
      localStorage.setItem('token', data.token);
    }

    return data;
  } catch (error) {
    return { error: error.message };
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const getProfile = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch(`${API_URL}/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to get profile');
    }

    return data;
  } catch (error) {
    return { error: error.message };
  }
};