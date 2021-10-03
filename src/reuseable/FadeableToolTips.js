import React, { useState, useEffect } from 'react';

function FadeableToolTips({message, duration}) {
    const [hide, setHide] = useState( false );

    useEffect(()=>{
        setTimeout(()=> setHide( true ), (duration || 1500) );
    },[]);

    return (
        <span className={hide ? "fadeOutToolTips _toolTips" : "_toolTips"}>
            {message}
        </span>
    )
}

export default FadeableToolTips;
