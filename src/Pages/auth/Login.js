import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RouteNames } from '../../constants/RouteNames';
import useForm from '../../reuseable/hooks/useForm';
import {toggleLoader, userLogin } from '../../store/actions/auth';
import './login.css';

const Login = (props) => {

    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const userStoredData = localStorage.getItem('userData');
    const [ redirectToDashboard, setRedirectToDashboard ] = useState( false );
    const [ isSubmitBtnPressed, setIsSubmitBtnPressed ] = useState( false );
    const [showRegeneratePasswordSection, setShowRegeneratePasswordSection] = useState(false);
    const [ state, inputHandler, touchHandler ] = useForm(
        {
            email_phone: {
                value: '',
                isValid: false,
                isTouched: false
            },
            password: {
                value: '',
                isValid: false,
                isTouched: false
            }
        },
        false
    );

    const genarateGreetingMsg = (_userName) => {
        
        let msg = '';
        const date = new Date();  
        const hour = date.getHours();  
        const min = date.getMinutes();

        //console.log(hour, min);

        if (hour < 12) {  
            msg = `Good morning ${_userName}!`;  
        } 
        else if (hour === 12 && min === 0) {  
            msg = `Good noon ${_userName}!`;  
        }
        else if (hour >= 12 && hour < 18 && min > 0) {  
            msg = `Good afternoon ${_userName}!`;  
        } 
        else if (hour >= 18 && hour < 20 && min > 0) {  
            msg = `Good evening ${_userName}!`;  
        }
        else {  
            msg = `Good night ${_userName}!`;  
        }

        return msg;

    };

    const handleFormSubmit = (ev) =>{
        ev.preventDefault();
        setIsSubmitBtnPressed( true );
        const { inputs, formValidity } = state;
        if( formValidity ){
            dispatch( toggleLoader( true ) );
            dispatch( userLogin({ 
                email_phone: inputs.email_phone.value, 
                password: inputs.password.value 
            })).then( response => {
                dispatch( toggleLoader( false ) );
                if( response.error ){
                    toast.error(response.message);
                    setShowRegeneratePasswordSection(true);
                }
                else{
                    const { data } = response;
                    if( data && data.first_name)
                        setTimeout( toast.success(genarateGreetingMsg(data.first_name), {
                            onOpen: () => setRedirectToDashboard( true )
                        }), 100);
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

    //console.log(isAuthenticated, userStoredData);

    if( redirectToDashboard || (isAuthenticated && userStoredData))
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
                        <h1>Login</h1>
                        <form onSubmit={handleFormSubmit}>
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    placeholder="Email ID" 
                                    className="login-emil"
                                    value={state.inputs.email_phone.value}
                                    onChange={(e) => inputHandler('email_phone', e.target.value)}
                                    onBlur={() => touchHandler('email_phone') }
                                />
                                { !state.formValidity && isSubmitBtnPressed && state.inputs.email_phone.value === '' &&
                                    <span className="invalid">Email ID is required.</span>
                                }
                            </div>

                            <div className="form-group">
                                <input 
                                    type="password" 
                                    placeholder="Password" 
                                    className="login-password"
                                    value={state.inputs.password.value}
                                    onChange={(e) => inputHandler('password', e.target.value)}
                                    onBlur={() => touchHandler('password') }
                                />
                                { !state.formValidity && isSubmitBtnPressed && state.inputs.password.value === '' &&
                                    <span className="invalid">Password is required.</span>
                                }
                            </div>

                            <div className="form-group">
                                <input type="submit" value="Login" className="login-btnl"/>
                            </div>
                        </form>
                        { showRegeneratePasswordSection && <div className="regenPass">
                            <Link className="regenPBtn" to={RouteNames.regenPass}>Regenerate Password</Link>
                        </div> }
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default Login;
