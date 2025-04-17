import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMatches = createAsyncThunk(
  "matches/fetchMatches",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://api.sofascore.com/api/v1/sport/football/scheduled-events/2025-04-15', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0'
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const quarterFinalMatches = data.events.slice(0, 4);

      return quarterFinalMatches;
    } catch (error) {
      console.error("Fetch error:", error);
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  matches: [],
  currentPage: 1,
  loading: false,
  error: null,
};

export const matchesSlice = createSlice({
  name: "matches",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMatches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMatches.fulfilled, (state, action) => {
        state.loading = false;
        state.matches = action.payload;
        state.error = null;
      })
      .addCase(fetchMatches.rejected, (state, action) => {
        state.loading = false;
        state.matches = [];
        state.error = action.payload;
      });
  },
});

export const { setCurrentPage } = matchesSlice.actions;
export default matchesSlice.reducer;