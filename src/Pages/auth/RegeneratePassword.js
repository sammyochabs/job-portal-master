/**
|--------------------------------------------------
| Regenerate Password If request by admin user
|--------------------------------------------------
*/

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import useForm from '../../reuseable/hooks/useForm';
import { resetPassword, toggleLoader } from '../../store/actions/auth';
import './login.css';

const RegeneratePassword = (props) => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const [ isSubmitBtnPressed, setIsSubmitBtnPressed ] = useState( false );
    const [goBack, setGoBack] = useState(false);
    const [ state, inputHandler, touchHandler ] = useForm(
        {
            email: {
                value: '',
                isValid: false,
                isTouched: false
            }
        },
        false
    );

    const handleFormSubmit = (ev) =>{
        ev.preventDefault();
        setIsSubmitBtnPressed( true );
        const { inputs, formValidity } = state;
        if( formValidity ){
            dispatch( toggleLoader( true ) );
            resetPassword({ 
                email: inputs.email.value, 
            }).then( response => {
                dispatch( toggleLoader( false ) );
                console.log(response);
                if( response.error ){
                    toast.error(response.message);
                }else{
                    const {data} = response;
                    if( data && data.success)
                        toast.success(`Password is generated successfully and send to registerd email.`, {
                            onClose: () => setGoBack(true)
                        });
                }
                
            });
        }
    }
    
    useEffect(()=>{
        document.body.classList.add('login');

        return () =>{
            document.body.classList.remove('login');
        }
    },[]);

    if(goBack)
        return (<Redirect to="/login"/>)

    if( isAuthenticated )
        return (<Redirect to='/'/>)

    return (
        <div className="login-holder">
            <div className="row">
                <div className="col-md-4 col-sm-12 col-12">
                    <div className="log-logohlder">
                        <img src={require('../../assets/images/logo.png').default} alt="logo"/>
                    </div>

                    <div className="lft-img">
                        <img src={require('../../assets/images/login-lft-bg.png').default} alt="left-img"/>
                    </div>
                </div>

                <div className="col-md-8 col-sm-12 col-12">
                    <div className="login-nd-frm-holder clear">
                        <h1>Generate Password</h1>
                        <form onSubmit={handleFormSubmit}>
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    placeholder="Email(Associate with account)" 
                                    className="login-emil"
                                    value={state.inputs.email.value}
                                    onChange={(e) => inputHandler('email', e.target.value)}
                                    onBlur={() => touchHandler('email') }
                                />
                                { !state.formValidity && isSubmitBtnPressed && state.inputs.email.value === '' &&
                                    <span className="invalid">Email is required.</span>
                                }
                            </div>

                            <div className="form-group">
                                <input type="submit" value="Regenerate" className="login-btnl"/>
                            </div>
                        </form>
                        <Link className="regenPBtn" to="/login">Back to Login</Link>
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default RegeneratePassword;
