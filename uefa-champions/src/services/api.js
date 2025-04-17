import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.sofascore.com/api/v1',
    headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0' // Required for SofaScore API
    }
});

export const matchesApi = {
    // Get Quarter Final matches
    getQuarterFinals: () => api.get('/sport/football/scheduled-events/2025-04-15'),
    
    // Get match details by ID
    getMatchDetails: (matchId) => api.get(`/event/${matchId}`),
    
    // Get player statistics for a match
    getMatchStatistics: (matchId) => api.get(`/event/${matchId}/statistics`),
    
    // Get lineups for a match (includes player ratings)
    getMatchLineups: (matchId) => api.get(`/event/${matchId}/lineups`)
};

export default matchesApi;