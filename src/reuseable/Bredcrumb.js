import React from 'react';
import { Link } from 'react-router-dom';

function Bredcrumb({leading, trailing}) {
    return (
        <div className="brd-cm">
            <ul className="brd-ul">
                <li>
                    <Link to={leading.url}>{ leading.title }</Link>
                </li>

                <li>
                    <Link to={trailing.url}>{ trailing.title }</Link>
                </li>
            </ul>
        </div>
    )
}

export default Bredcrumb;
