import {configureStore} from "@reduxjs/toolkit";
import postsReducer from "./postsSlice";
import postReducer from './postSlice';


export const store = configureStore({
    reducer: {
        posts: postsReducer,
        post: postReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;