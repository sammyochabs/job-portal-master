import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Loader() {
    const showLoader = useSelector(state => state.auth.showLoader);
    if( !showLoader )
        return <div></div>
    
    return (
        <div className="loaderWrapper">
          <div className="loading">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </div>
    )
}

export default Loader;
