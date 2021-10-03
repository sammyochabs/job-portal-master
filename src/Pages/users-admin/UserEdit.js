import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { RouteNames } from '../../constants/RouteNames';
import DefaultStructure from '../../layouts/defaultStructure';
import BaseForm from '../../reuseable/base-form';
import useForm from '../../reuseable/hooks/useForm';
import { getUserById, addNewUser, updateUser, getBranches } from '../../store/actions/user';
import { getCities } from '../../store/actions/master';
import { toggleLoader } from '../../store/actions/auth';
import Bredcrumb from '../../reuseable/Bredcrumb';
import BaseImageList from '../../reuseable/BaseImageList';

const FILE_TYPES = ['image/jpeg','image/png', 'image/jpeg'];

const UserEdit = (props) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [ redirectToList, setRedirectToList ] = useState( false );
    const [ cities, setCities ] = useState( [] );
    const [ branches, setBranches] = useState( [] );
    const [isUploading, setIsUploading] = useState(false);
    const [images, setImages] = useState([]);
    const [ isSubmitBtnPressed, setIsSubmitBtnPressed ] = useState( false );

    const [redirect, setRedirect] = useState( false );
    const userReauthenticate = ({ message }) =>{
        toast.error(message, {
            onOpen: () => setRedirect( true ) 
        });
    }

    const formFields = {
        first_name: {
            value: '',
            isValid: false,
            isTouched: false
        },
        last_name: {
            value: '',
            isValid: false,
            isTouched: false
        },
        email: {
            value: '',
            isValid: false,
            isTouched: false
        },
        phone: {
            value: '',
            isValid: false,
            isTouched: false
        },
        role: {
            value: '',
            isValid: false,
            isTouched: false
        },
        // profile_picture: {
        //     value: '',
        //     isValid: false,
        //     isTouched: false
        // },
        is_active: {
            value: false,
            isValid: true,
            isTouched: true
        }
        
    };

    const [state, inputHandler, _, updateForm ] = useForm(
        formFields,
        false
    );

    const _setFormData = ( data ) =>{
        //let formatedData = {};
        for( const _k in data ){
            formFields[_k] = {
                value: data[_k],
                isValid: true,
                isTouched: true
            }

            if( _k === 'profile_picture'){
                setImages([ data[_k] ]);
            }
        }

        return formFields;
    }

    const _setSubmitableData = ( data ) =>{
        let formData = {};

        for( const k in data ){
            if( data[k].value )
                formData[k] = data[k].value;
        }
    
        return formData;
    }

    useEffect(()=>{

        if( id ){
            dispatch( toggleLoader( true ) );
            getUserById( id ).then(
                response => {
                    dispatch( toggleLoader( false ) );
                    if( !response.error ){
                        updateForm( _setFormData( response.data ), true);
                    }
                    if( response.redirect )
                        userReauthenticate( response );
                }
            );
        }
    },[id]);

    //console.log( state );

    const uploadImageHandler = (ev) =>{

        const fileData = ev.target.files[0];
        console.log(fileData);
        if( fileData ){
            const _i = ev.target.getAttribute('index');
            document.getElementById(`img_upload_${_i}`).classList.add('imguploading');
            
            const { type } = fileData;
            //console.log(type);
            if( type && FILE_TYPES.includes(type)){
                                
                const formData = new FormData();
                formData.append('packaging_file',fileData);
                formData.append('product_type', 'profile_picture');
                // uploadImage(formData).then(res => {
                    
                //     if(!res.error){
                //         const { Location } = res.data;
                //         if( Location ){
                //             setImages(prevImages => [...prevImages, Location]);
                //             inputHandler('profile_picture', Location);
                //             ev.target.disabled = true;
                //             document.getElementById(`img_upload_${_i}`).classList.remove('imguploading');
                //             document.getElementById(`img_upload_${_i}`).classList.add('imgupdone');
                //         }
                //     }
                // })  
            
            }else{
                document.getElementById(`img_upload_${_i}`).classList.remove('imguploading');
                toast.error('Only Image file can be uploaded here.');
            }
        }
        
    }

    const _removeImageHandler = ( index ) =>{
        
        setImages([]);
        inputHandler('profile_picture', '');
        const _upload = document.getElementById('img_uploadbtn_1');
        _upload.disabled = false;
        _upload.value = "";
        document.getElementById(`img_upload_1`).classList.remove('imgupdone');
    
    }

    const handleFormSubmit = (ev) =>{
        
        ev.preventDefault();
        setIsSubmitBtnPressed( true );
        const { inputs, formValidity } = state;
        console.log( inputs );
        if( formValidity ){
            dispatch( toggleLoader( true ) );
            if( !id )
                addNewUser(_setSubmitableData( inputs )).then(result => {
                    if( !result.error ){
                        dispatch( toggleLoader( false ) );
                        toast.success( result.message, 
                            { onOpen: () => setRedirectToList( true ) }
                        );
                    }else{
                        dispatch( toggleLoader( false ) );
                        toast.error( result.message ); 
                    }
                    if( result.redirect )
                        userReauthenticate( result );
                });

            if( id )
                updateUser(_setSubmitableData( inputs )).then(result => {
                    if( !result.error ){
                        dispatch( toggleLoader( false ) );
                        toast.success( result.message, 
                            { onOpen: () => setRedirectToList( true ) }
                        );
                    }else{
                        dispatch( toggleLoader( false ) );
                        toast.error( result.message ); 
                    }
                    if( result.redirect )
                        userReauthenticate( result );
                });
        }
    }

    const FormHandler = () =>{
        return (
            <div className="submitdiv">
                <input type="submit" name="" value="submit" onClick={handleFormSubmit}/>
            </div>
        );
    }

    //console.log(state.inputs);

    if( redirect )
        return <Redirect to="/login"/>

    if( redirectToList )
        return (
            <Redirect to={RouteNames.adminUserList}/>
        )

    return (
        <DefaultStructure pageTitle='Admin User Add/Edit Form'>
            <Bredcrumb 
                leading={{title: 'Admin User', url: RouteNames.adminUserList }}
                trailing={{title: 'Add-Edit Form', url: '#'}}
            />
            <BaseForm buttonSection={<FormHandler/>}>
                <div className="form-group">
                    <label>First Name<em>*</em></label>
                    <input 
                        type="text" 
                        name=""
                        value={state.inputs.first_name.value}
                        onChange={(e) => inputHandler('first_name', e.target.value)}
                        //onBlur={() => touchHandler('name') }
                    />
                    { !state.formValidity && isSubmitBtnPressed && state.inputs.first_name.value === '' &&
                        <span className="invalid">First name is required field.</span>
                    }
                </div>
                <div className="form-group">
                    <label>Last Name<em>*</em></label>
                    <input 
                        type="text" 
                        name=""
                        value={state.inputs.last_name.value}
                        onChange={(e) => inputHandler('last_name', e.target.value)}
                        //onBlur={() => touchHandler('name') }
                    />
                    { !state.formValidity && isSubmitBtnPressed && state.inputs.last_name.value === '' &&
                        <span className="invalid">Last name is required field.</span>
                    }
                </div>
                <div className="form-group">
                    <label>Email<em>*</em></label>
                    <input 
                        type="text" 
                        name=""
                        value={state.inputs.email.value}
                        onChange={(e) => inputHandler('email', e.target.value)}
                        //onBlur={() => touchHandler('name') }
                    />
                    { !state.formValidity && isSubmitBtnPressed && state.inputs.email.value === '' &&
                        <span className="invalid">Email is required field.</span>
                    }
                </div>
                <div className="form-group">
                    <label>Phone Number<em>*</em></label>
                    <input 
                        type="number" 
                        name=""
                        value={ state.inputs.phone.value }
                        onChange={(e) => inputHandler('phone', e.target.value)}
                        //onBlur={() => touchHandler('name') }
                    />
                    { !state.formValidity && isSubmitBtnPressed && state.inputs.phone.value === '' && 
                        <span className="invalid">Phone number is required field.</span>
                    }
                </div>
                <div className="form-group">
                    <label>Select Role<em>*</em></label>
                    <select
                        value={state.inputs.role.value.slug}
                        onChange={(e) => inputHandler('role', e.target.value)}
                    >
                        <option value="">Select Role</option>
                        <option value="super_admin">Super admin</option>
                        <option value="admin">Admin</option>
                    </select>
                    { !state.formValidity && isSubmitBtnPressed && state.inputs.role.value === '' && 
                        <span className="invalid">Role is required field.</span>
                    }
                </div>
                <div className="form-group">
                    <label>Upload Profile Image<em>*</em></label>
                    <div className="upload-img-hlder">

                        <label id={`img_upload_1`} className={isUploading ? "load_check imgupdone" : "load_check"}></label>
                            {/*<input
                                index={1} 
                                type="file" 
                                id={`img_uploadbtn_1`}
                                onChange={uploadImageHandler}
                            />*/}
                        <label className="imgupload_btn" htmlFor={`img_uploadbtn_1`}></label>
                    </div>
                    {!state.formValidity && isSubmitBtnPressed && state.inputs.profile_picture.value === '' &&
                        <span className="invalid">File (Image) is required field.</span>
                    }
                </div>
                <div className="form-group imgPrevSection">
                    <BaseImageList onRemove={_removeImageHandler} imageList={images}/>
                </div>
                <div className="form-group">
                    <label>Is Active</label>
                    <select
                        value={state.inputs.is_active.value}
                        onChange={(e) => inputHandler('is_active', e.target.value)}
                    >
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
                    { !state.formValidity && isSubmitBtnPressed && state.inputs.is_active.value === '' && 
                        <span className="invalid">It is required field.</span>
                    }
                </div>
            </BaseForm>
        </DefaultStructure>
    )
}

export default UserEdit;
