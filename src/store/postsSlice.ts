import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {postsAPI} from "../api/api";

interface Post {
    userId: number,
    id: number,
    title: string,
    body: string,
}

interface PostsState {
    list: Post[],
    pages: number,
    currentPage: number,
    limitPerPage: number,
    totalAmount: number,
    loading: boolean,
    error: string | null
}

const initialState: PostsState = {
    list: [],
    pages: 1,
    currentPage: 1,
    limitPerPage: 10,
    totalAmount: 0,
    loading: false,
    error: null
}

export const fetchAllPosts = createAsyncThunk<Post[], void, {rejectValue: string}>(
    'posts/fetchAllPosts',
    async function (_, {rejectWithValue}) {
        const response = await postsAPI.getAllPosts();

        if (response.status !== 200) {
            return rejectWithValue('Server error');
        }

        return response.data;
    }
)

export const fetchPosts = createAsyncThunk<Post[], void, {rejectValue: string, state: {posts: PostsState}}>(
    'posts/fetchPosts',
    async function (_, {rejectWithValue, getState}) {
        const pageToFetch = getState().posts.currentPage;
        const response = await postsAPI.getPosts(pageToFetch);

        if (response.status !== 200) {
            return rejectWithValue('Server error');
        }

        return response.data;
    }
)

export const fetchFilterPosts = createAsyncThunk<Post[], string>(
    'posts/fetchFilterPosts',
    async function (text) {
        const response = await postsAPI.getFilterPosts(text);

        return response.data;
    }
)

export const fetchFilterPostsWithPage = createAsyncThunk<Post[], {searchText: string, currentPage: number}>(
    'posts/fetchFilterPostsWithPage',
    async function ({searchText, currentPage}) {
        const response = await postsAPI.getFilterPostsWithPage(searchText, currentPage);

        return response.data;
    }
)

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        changeCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllPosts.fulfilled, (state, action) => {
                state.pages = Math.ceil(action.payload.length / state.limitPerPage);
                state.totalAmount = action.payload.length;
                state.loading = false;
            })
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.list = action.payload;
                state.loading = false;
            })
            .addCase(fetchFilterPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFilterPosts.fulfilled, (state, action) => {
                state.totalAmount = action.payload.length;
                state.loading = false;
            })
            .addCase(fetchFilterPostsWithPage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFilterPostsWithPage.fulfilled, (state, action) => {
                state.list = action.payload;
                state.loading = false;
            })
    }
})

export const {changeCurrentPage} = postsSlice.actions;
export default postsSlice.reducer;