import React from 'react';

const BaseForm = ({children, buttonSection}) => {

    return (
        <div className="">
            <div className="form_panel ">
                <div className="form_top">
                    { children } 
                </div>
                <div className="form-bottom clear">
                    {/* <div className="chkdiv">
                        <input type="checkbox" name=""/>
                        <label>Create another</label>
                    </div> */}
                    { buttonSection }
                </div>
                </div>
          </div>
    )
}

export default BaseForm;
