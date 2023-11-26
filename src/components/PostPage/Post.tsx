import React from 'react';
import style from './PostPage.module.scss';

interface Props {
    userId: number,
    id: number,
    title: string,
    body: string,
}

const Post:React.FC<Props> = ({userId, id, title, body}) => {
    return (
        <div className={style.post}>
            <h3>{id} {title}</h3>
            <div>{body}</div>
        </div>
    );
};

export default Post;