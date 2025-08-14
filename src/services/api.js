import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
  headers: { 'Content-Type': 'application/json' }
});

export const analyzeGitHubProfile = async (githubUrl) => {
  try {
    // Validate GitHub URL format
    const githubUrlPattern = /^https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9-_]+$/;
    if (!githubUrlPattern.test(githubUrl)) {
      throw new Error('Please enter a valid GitHub profile URL');
    }

    // Make API call to backend
    const response = await api.post('/api/evaluate', {
      githubUrl: githubUrl.trim()
    });

    return response;

  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      switch (status) {
        case 400: throw new Error(data.message || 'Invalid GitHub URL');
        case 404: throw new Error('GitHub user not found or profile is private');
        case 429: throw new Error('Too many requests. Please try again in 15 minutes');
        case 500: throw new Error('Analysis service temporarily unavailable');
        default: throw new Error(data.message || 'Analysis failed');
      }
    } else if (error.code === 'ECONNABORTED') {
      throw new Error('Analysis is taking too long. Please try again');
    } else {
      throw new Error('Unable to connect. Check your internet connection');
    }
  }
};

export const checkBackendHealth = async () => {
  const response = await api.get('/health');
  return response.data;
};