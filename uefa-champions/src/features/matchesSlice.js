import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  matches: [],
  currentPage: 1,
  loading: false,
  error: null
};

export const matchesSlice = createSlice({
  name: 'matches',
  initialState,
  reducers: {
    setMatches: (state, action) => {
      state.matches = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { setMatches, setCurrentPage, setLoading, setError } = matchesSlice.actions;
export default matchesSlice.reducer;