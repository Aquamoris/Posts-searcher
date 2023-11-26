import React from 'react';
import './styles/global.scss'
import {Route, Routes} from "react-router-dom";
import Posts from "./components/Posts/Posts";
import PostPage from "./components/PostPage/PostPage";

function App() {
    return (
        <div className='App'>
            <Routes>
                <Route path='/posts/:postId' element={<PostPage />}/>
                <Route path='/' element={<Posts />}/>
            </Routes>
        </div>
    );
}

export default App;
