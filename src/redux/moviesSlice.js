import { createSlice , createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    list : [],
    status : '',
    error : null
}

const API_URL = "http://localhost:3000/movies"

// Async Thunk : Get Movies

export const getMovies = createAsyncThunk("movies/getMovies" , async () => {
    const response = await axios.get(API_URL)
    return response.data
})



const moviesSlice = createSlice({
    name : 'movies',
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(getMovies.pending , (state) => {
            state.status = "loading"
        })
        .addCase(getMovies.fulfilled , (state , action) => {
            state.status = "succeeded"
            state.list = action.payload
        })
        .addCase(getMovies.rejected , (state , action) => {
            state.status = "failed"
            state.error = action.error.message
        })
    }
})








export default moviesSlice.reducer