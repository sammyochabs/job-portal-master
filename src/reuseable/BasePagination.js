import React from 'react';
import { Link } from "react-router-dom";

const MAX_PAGE_SHOW = 5;

function BasePagination({ pages, onPaginate }) {

    if (Object.keys(pages).length <= 0)
        return null;

    const { page, totalPages } = pages;

    const _onPageClickHandler = (ev, data) => {
        ev.preventDefault();
        if (data.isPrev && page > 1) {
            onPaginate({ skip: page - 1 });
            return;
        }
        if (data.isNext && page < totalPages) {
            onPaginate({ skip: page + 1 });
            return;
        }
        else {
            onPaginate({ skip: data._p })
        }
    }

    const _Link = ({ onClick, title }) => {
        return (
            <Link
                to="#"
                onClick={onClick} >
                {title}
            </Link>
        );
    }

    const _PageElements = () => {
        let _html = [<li key={0}> <_Link
            onClick={(ev) => page === 1 ? null : _onPageClickHandler(ev, { isPrev: true })}
            title='Pev'
        />
        </li>];
        for (let _p = 1; _p <= (totalPages < MAX_PAGE_SHOW ? totalPages : MAX_PAGE_SHOW); _p++) {
            _html.push(<li key={_p} className={page === _p ? "active" : null}>
                <_Link
                    onClick={(ev) => page === _p ? null : _onPageClickHandler(ev, { _p })}
                    title={_p}
                />
            </li>
            );
        }
        _html.push(<li key={totalPages + 1}>
            <_Link onClick={(ev) => page === totalPages ? null : _onPageClickHandler(ev, { isNext: true })} title="Next" /></li>);

        return _html;
    }

    if (totalPages <= 1)
        return null;

    return (
        <ul className="pegination">
            <_PageElements />
        </ul>
    )
}

export default BasePagination;
