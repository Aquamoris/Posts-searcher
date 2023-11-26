import React from 'react';
import style from './Posts.module.scss';
import {Link} from "react-router-dom";

interface Props {
    userId: number,
    id: number,
    title: string,
    body: string
}

const PostItem:React.FC<Props> = ({userId, id, title, body}) => {
    return (
        <div className={style.post}>

            <h3>{id} <Link to={`/posts/${id}`}>{title}</Link></h3>
            <span>{body}</span>
        </div>
    );
};

export default PostItem;