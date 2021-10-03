import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SideBarItem({ classes, title, icon, menuTitle, navTo, hasSubMenu, onClose, isOpen, onOpen }) {
    const [open, setOpen] = useState(isOpen);

    React.useEffect(() => {
        if (isOpen)
            onOpen(isOpen);
    }, []);

    const _handleSabMenu = (ev) => {
        ev.preventDefault();
        if (onClose)
            onClose();
        else
            setOpen(open => !open);
    }

    return (
        <li>
            <Link
                to={navTo ? navTo : "#"}
                className={classes}
                title={title}
                onClick={(hasSubMenu || onClose) ? _handleSabMenu : null}
            >
                <span className="ico"><i className={`fa ${icon}`} aria-hidden="true"></i></span>
                <span className="text">{menuTitle}</span>
            </Link>
            {
                hasSubMenu &&
                <ul className={open ? "submenu open" : "submenu"}>
                    {hasSubMenu}
                </ul>

            }
        </li>
    )
}

export default SideBarItem;
