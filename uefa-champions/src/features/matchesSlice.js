import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { matchesApi } from '../../services/api';

export const fetchMatches = createAsyncThunk(
    'matches/fetchMatches',
    async (_, { rejectWithValue }) => {
        try {
            const response = await matchesApi.getQuarterFinals();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

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
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        }
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
    }
});

export const { setCurrentPage } = matchesSlice.actions;
export default matchesSlice.reducer;