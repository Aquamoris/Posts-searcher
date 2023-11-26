import React from 'react';
import style from './PostPage.module.scss';

interface Props {
    postId: number,
    id: number,
    name: string,
    email: string,
    body: string
}

const Comment:React.FC<Props> = ({postId, id, name, email, body}) => {
    return (
        <div className={style.comment}>
            <div>{postId} {id}</div>
            <div>{name}</div>
            <h5>{email}</h5>
            <div>{body}</div>
        </div>
    );
};

export default Comment;