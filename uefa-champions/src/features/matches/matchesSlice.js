import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMatches = createAsyncThunk(
  "matches/fetchMatches",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://api.sofascore.com/api/v1/sport/football/scheduled-events/2025-04-15",
        {
          headers: {
            "User-Agent": "Mozilla/5.0",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Raw API response:", data);

      // Mock data for testing if API fails
      const mockMatches = [
        {
          id: 1,
          homeTeam: "Real Madrid",
          awayTeam: "Manchester City",
          startTime: "2025-04-15T19:45:00Z",
        },
        {
          id: 2,
          homeTeam: "Bayern Munich",
          awayTeam: "PSG",
          startTime: "2025-04-15T19:45:00Z",
        },
      ];

      return mockMatches;
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
      })
      .addCase(fetchMatches.fulfilled, (state, action) => {
        state.loading = false;
        state.matches = action.payload;
        state.error = null;
      })
      .addCase(fetchMatches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCurrentPage } = matchesSlice.actions;
export default matchesSlice.reducer;
