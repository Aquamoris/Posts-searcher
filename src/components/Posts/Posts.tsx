import React, {useEffect, useState} from 'react';
import style from './Posts.module.scss';
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {fetchAllPosts, fetchFilterPosts, fetchFilterPostsWithPage, fetchPosts} from "../../store/postsSlice";
import PostItem from "./PostItem";
import Paginator from "../common/Paginator";

const Posts:React.FC = () => {
    const [searchText, setSearchText] = useState<string>('');
    const posts = useAppSelector(state => state.posts.list);
    const {loading} = useAppSelector(state => state.posts);
    const {totalAmount, pages, currentPage, limitPerPage} = useAppSelector(state => state.posts)
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (searchText.trim()) {
            dispatch(fetchFilterPosts(searchText));
            dispatch(fetchFilterPostsWithPage({searchText, currentPage}));
        } else {
            dispatch(fetchAllPosts());
            dispatch(fetchPosts());
        }
    }, [dispatch, currentPage, searchText]);

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        setSearchText(e.currentTarget.value);
    }

    return (
        <div>
            <input className={style.input} onChange={handleChange} value={searchText} type="text" />
            { loading
                ? <h3>Loading...</h3>
                : posts.map(p => (
                    <PostItem key={p.id} userId={p.userId} id={p.id} title={p.title} body={p.body} />
                ))
            }
            <Paginator currentPage={currentPage} totalCount={totalAmount} limitPerPage={limitPerPage}/>
        </div>
    );
};

export default Posts;