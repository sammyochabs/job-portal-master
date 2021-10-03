import React from 'react';
import ReactDom from 'react-dom';

function BaseModal({title, modalBody, onClose, show}) {

    const _modalCloseHandler = (ev) =>{
        ev.preventDefault();
        onClose();
    }

    return ReactDom.createPortal(
        <div className={show ? "commonmodal openmodal" : "commonmodal"}>
            <span className="overlay"></span>
            <div className="modalholder">
                <div className="modalheader">
                    <h3>{ title || 'Modal Title' }</h3>
                    <a href="#" onClick={ _modalCloseHandler }> <i className="fa fa-times" aria-hidden="true"></i></a>
                </div>
                <div className="modallbody">
                    {/* <div class="form-group">
                        <input type="text" placeholder="Name" name=""/>
                    </div>
                    <div class="form-group">
                        <input type="text" placeholder="Email" name=""/>
                    </div>
                    <div class="form-group">
                        <input type="submit" value="submit" name=""/>
                    </div> */}
                    { modalBody }
                </div>
            </div>
        </div>,
        document.getElementById('baseModal')
    )
}

export default BaseModal;