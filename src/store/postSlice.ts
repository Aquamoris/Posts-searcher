import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {postsAPI} from "../api/api";

interface Post {
    userId: number,
    id: number,
    title: string,
    body: string,
}

interface Comment {
    postId: number,
    id: number,
    name: string,
    email: string,
    body: string
}

interface PostsState {
    post: Post | null,
    comments: Comment[],
    loading:  boolean,
    error: string | null,
}

const initialState: PostsState = {
    post: null,
    comments: [],
    loading: false,
    error: null
}

export const fetchCurrentPost = createAsyncThunk<Post, string, {rejectValue: string}>(
    'post/fetchCurrentPost',
    async function (postId, {rejectWithValue}) {
        const response = await postsAPI.getPostInfo(postId);

        if (response.status !== 200) {
            return rejectWithValue('Server error');
        }

        return (response.data) as Post;
    }
)

export const fetchCurrentPostComments = createAsyncThunk<Comment[], string>(
    'post/fetchCurrentPostComments',
    async function (postId) {
        const response = await postsAPI.getPostComments(postId);

        return response.data;
    }
)


const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchCurrentPost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCurrentPost.fulfilled, (state, action) => {
                state.post = action.payload;
                state.loading = false;
            })
            .addCase(fetchCurrentPostComments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCurrentPostComments.fulfilled, (state, action) => {
                state.comments = action.payload;
                state.loading = false;
            })
    }
})

export const {} = postSlice.actions;
export default postSlice.reducer;