import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { RouteNames } from '../../../constants/RouteNames';
import DefaultStructure from '../../../layouts/defaultStructure';
import BaseForm from '../../../reuseable/base-form';
import useForm from '../../../reuseable/hooks/useForm';
import { addEducation, getEducationById, updateEducation } from '../../../store/actions/master';
import { toggleLoader } from '../../../store/actions/auth';
import Bredcrumb from '../../../reuseable/Bredcrumb';

const EducationEdit = (props) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [redirectToList, setRedirectToList] = useState(false);
    const [loadState, setLoadState] = useState(false);
    const [loadCity, setLoadCity] = useState(false);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [isSubmitBtnPressed, setIsSubmitBtnPressed] = useState(false);

    const [redirect, setRedirect] = useState(false);
    const userReauthenticate = ({ message }) => {
        toast.error(message, {
            onOpen: () => setRedirect(true)
        });
    }

    const [state, inputHandler, _, updateForm] = useForm(
        {
            name: {
                value: '',
                isValid: false,
                isTouched: false
            }
            
        },
        false
    );

    const _setFormData = (data) => {
        let formatedData = {};
        for (const _k in data) {
            formatedData[_k] = {
                value: data[_k],
                isValid: true,
                isTouched: true
            }
        }

        return formatedData;
    }

    const _setSubmitableData = (data) => {
        let formData = {};

        for (const k in data) {
            formData[k] = data[k].value;
        }

        return formData;
    }

    useEffect(() => {
        //setLoadState(true);
        /* getStates().then(resp => {
            setStates(resp.data);
            setLoadState(false);
        }) */

        if (id) {
            dispatch(toggleLoader(true));

            getEducationById(id).then(
                response => {
                    dispatch(toggleLoader(false));
                    if (!response.error) {
                        if(response.data[0]){
                            updateForm(_setFormData(response.data[0]), true);
                        }else{
                            updateForm(_setFormData(response.data), true);
                        }
                        
                        if( response.data.state_id ){
                            setLoadCity(true);
                            //__loadCities(response.data.state_id);
                        }
                        
                    }
                    if (response.redirect)
                        userReauthenticate(response);
                }
            ).catch(error => {
                console.log(error);
            });
        }
    }, [id]);
    useEffect(()=>{
       
    },[])

    //console.log(state.inputs);

    const handleFormSubmit = (ev) => {

        ev.preventDefault();
        setIsSubmitBtnPressed(true);
        const { inputs, formValidity } = state;
        console.log(formValidity)
        if (formValidity) {
            dispatch(toggleLoader(true));

            if(!id){
                addEducation(_setSubmitableData(inputs)).then(result => {
                    if (!result.error) {
                        dispatch(toggleLoader(false));
                        toast.success(result.message,
                            { onOpen: () => setRedirectToList(true) }
                        );
                    }
                    if (result.redirect)
                        userReauthenticate(result);
                });
            }

            if(id){
                updateEducation(_setSubmitableData(inputs)).then(result => {
                    if (!result.error) {
                        dispatch(toggleLoader(false));
                        toast.success(result.message,
                            { onOpen: () => setRedirectToList(true) }
                        );
                    }
                    if (result.redirect)
                        userReauthenticate(result);
                });
            }
           /*  if (!id)
                addBranch(_setSubmitableData(inputs)).then(result => {
                    if (!result.error) {
                        dispatch(toggleLoader(false));
                        toast.success(result.message,
                            { onOpen: () => setRedirectToList(true) }
                        );
                    }
                    if (result.redirect)
                        userReauthenticate(result);
                });

            if (id)
                updateBranch(_setSubmitableData(inputs)).then(result => {
                    if (!result.error) {
                        dispatch(toggleLoader(false));
                        toast.success(result.message,
                            { onOpen: () => setRedirectToList(true) }
                        );
                    }
                    if (result.redirect)
                        userReauthenticate(result);
                }); */
        }
    }

    const FormHandler = () => {
        return (
            <div className="submitdiv">
                <input type="submit" name="" value="submit" onClick={handleFormSubmit} />
            </div>
        );
    }

    const _handleState = ({ target: { value } }) => {
        inputHandler('state_id', value);
        /* setLoadCity(true);
        inputHandler('state_id', value);
        __loadCities(value); */
    }

    const __loadCities = (stateId) => {
       /*  getCitiesByState(stateId).then(resp => {
            if (resp.data)
                setCities(resp.data);
            setLoadCity(false);
        }).catch(error => {
            setLoadCity(false);
        }) */
    }

    if (redirect)
        return <Redirect to="/login" />

    if (redirectToList)
        return (
            <Redirect to={RouteNames.education} />
        )

    return (
        <DefaultStructure pageTitle='Education Add/Edit Form'>
            <Bredcrumb
                leading={{ title: 'Education', url: RouteNames.education }}
                trailing={{ title: 'Add-Edit Form', url: '#' }}
            />
            <BaseForm buttonSection={<FormHandler />}>
                <div className="form-group">
                    <label>Name <em>*</em></label>
                    <input
                        type="text"
                        name=""
                        value={state.inputs.name.value}
                        onChange={(e) => inputHandler('name', e.target.value)}
                    //onBlur={() => touchHandler('name') }
                    />
                    {!state.formValidity && isSubmitBtnPressed && state.inputs.name.value === '' &&
                        <span className="invalid">Name is required field.</span>
                    }
                </div>

               
                
            </BaseForm>
        </DefaultStructure>
    )
}

export default EducationEdit;
