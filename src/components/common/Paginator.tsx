import React from 'react';
import style from './Paginator.module.scss';
import {useAppDispatch} from "../../hooks/hooks";
import {changeCurrentPage} from "../../store/postsSlice";

interface Props {
    currentPage: number,
    totalCount: number,
    limitPerPage: number
}

const Paginator:React.FC<Props> = ({currentPage, totalCount, limitPerPage}) => {
    const dispatch = useAppDispatch();

    const pages = Math.ceil(totalCount / limitPerPage);

    const handleChange = (e: React.MouseEvent):void => {
        const changePage = +(e.currentTarget.innerHTML);
        dispatch(changeCurrentPage(changePage));
    }

    let paginator:number[] = [];

    for (let i = 1; i<=pages; i++) {
        paginator.push(i);
    }

    if (paginator.length < currentPage) {
        dispatch(changeCurrentPage(1));
    }

    return (
        <div className={style.paginator}>
            {
                paginator.length === 1
                    ? null
                    : paginator.map(i => (
                    <div
                        key={i}
                        className={i === currentPage ? style.active : style.item}
                        onClick={handleChange}
                    >{i}</div>
                ))
            }
        </div>
    );
};

export default Paginator;