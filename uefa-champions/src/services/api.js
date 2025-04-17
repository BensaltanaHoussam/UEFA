import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.sofascore.com/api/v1',
    headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0'
    }
});

export const fetchQuarterFinalMatches = () => {
    api.get('/sport/football/scheduled-events/2025-04-15');
}
export const fetchMatchDetails = (matchId) => 
    api.get(`/event/${matchId}`);