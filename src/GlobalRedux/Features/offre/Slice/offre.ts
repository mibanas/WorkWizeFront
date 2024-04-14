import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Company, JobOffer, JobOffersResponse, Recruiter, Status } from '@/interfaces/offre/offre';
import {  createJobOffer, deleteJobOffer, getAllJobOffers, getJobOfferById, updateJobOffer } from '@/api/offre/offreApi';

interface JobOffersState {
    jobOffers: JobOffersResponse | null;
    loading: boolean;
    error: string | null;
}

const initialState: JobOffersState = {
    jobOffers: null,
    loading: false,
    error: null,
};


export const fetchAllOffersAsync = createAsyncThunk(
    'jobOffers/fetchAllOffers',
    async ({ page, limit }: { page: number; limit: number }) => {
        try {
            const response = await getAllJobOffers({ page: page, limit: limit });
            return response;        
        } catch (error) {
            throw new Error('Une erreur s\'est produite lors de la récupération des offres d\'emploi.');
        }
    }
);

const jobOffersSlice = createSlice({
    name: 'jobOffers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllOffersAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllOffersAsync.fulfilled, (state, action) => {
                if (!action.payload.success) {
                    state.loading = false;
                } else {
                    state.loading = false;
                    state.jobOffers = action.payload;
                }
            })
            .addCase(fetchAllOffersAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Une erreur s\'est produite lors de la récupération des offres d\'emploi.';
            });
    },
});

export default jobOffersSlice.reducer;