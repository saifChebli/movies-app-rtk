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

export const addMovies = createAsyncThunk("movies/addMovies" , async (movie , thunkAPI) => {
    try {
        const response = await axios.post(API_URL, movie)
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue('Failed to add movies')
    }
})

export const deleteMovie = createAsyncThunk("movies/deleteMovies" , async (id , thunkAPI) => {
    try {
        await axios.delete(`${API_URL}/${id}`)
        return id
    }catch (error) {
        return thunkAPI.rejectWithValue('Failed to delete movie')
    }
})

export const editMovie = createAsyncThunk("movie/editMovie" , async ({id, updatedMovie}, thunkAPI) =>{
    try {
        const response = await axios.put(`${API_URL}/${id}`, updatedMovie)
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue('Failed to edit movie')
    }
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
        .addCase(addMovies.fulfilled , (state , action) => {
            state.status = "succeeded"
            state.list = action.payload
        })
        .addCase(deleteMovie.fulfilled , (state , action) => {
            state.status = "succeeded"
            state.list = state.list.filter(movie => movie.id !== action.payload)
        })
        .addCase(editMovie.fulfilled , (state , action) => {
            state.status = "succeeded"
            const {id , updatedMovie} = action.payload
            const movie = state.list.find(movie => movie.id === id)
            if(movie) {
                movie.title = updatedMovie.title
                movie.rating = updatedMovie.rating
                movie.genre = updatedMovie.genre
            }
        })
    }
})








export default moviesSlice.reducer