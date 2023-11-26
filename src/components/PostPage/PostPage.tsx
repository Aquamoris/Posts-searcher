import React, {useEffect} from 'react';
import style from './PostPage.module.scss';
import {Link, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {fetchCurrentPost, fetchCurrentPostComments} from "../../store/postSlice";
import Comment from "./Comment";
import Post from './Post';

const PostPage = () => {
    const {postId} = useParams();

    const dispatch = useAppDispatch();
    const post = useAppSelector(state => state.post.post);
    const comments = useAppSelector(state => state.post.comments);

    const {loading, error} = useAppSelector(state => state.post);

    useEffect(() => {
        if (postId) {
            dispatch(fetchCurrentPost(postId));
            dispatch(fetchCurrentPostComments(postId));
        }
    }, [dispatch, postId]);

    if (loading) return <h3>Loading</h3>

    return (
        <div>
            <Link to='/'>
                <button className={style.backButton}>&#8592; Back</button>
            </Link>
            {post && <Post key={post.id} id={post.id} userId={post.userId} title={post.title} body={post.body}/>}
            {comments.map(c => (
                <Comment key={c.id} postId={c.postId} id={c.id} name={c.name} email={c.email} body={c.body}/>
            ))}
        </div>
    );
};

export default PostPage;