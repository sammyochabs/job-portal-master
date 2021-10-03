import React from 'react';

const BaseImageList = ({imageList, onRemove, isPdf}) => {

    const _removeImageHandler = (ev, index) =>{
        ev.preventDefault();
        onRemove(index);
    }

    if(imageList.length > 0)
        return (
            <div className="addedit_image_holder">
                {
                    imageList.map((img, index)=> 
                        <div key={index} className="image_box">
                            <img src={ isPdf ? require('../assets/images/pdf.png').default : img} alt="upload image" />
                            <a href="#" onClick={(ev) =>_removeImageHandler(ev, index)}><i className="fa fa-times" aria-hidden="true"></i></a>
                        </div>
                    )
                }
                
            </div>
        )
    else 
        return (
            <div className="addedit_image_holder">
                <p>No item added yet</p>
            </div>
        )
}

export default BaseImageList;
