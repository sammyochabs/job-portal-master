import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { RouteNames } from '../../../constants/RouteNames';
import DefaultStructure from '../../../layouts/defaultStructure';
import BaseForm from '../../../reuseable/base-form';
import useForm from '../../../reuseable/hooks/useForm';
import { addBranch, getBranchById, updateBranch, getStates, getCitiesByState,addStates,getStatesById, updateState } from '../../../store/actions/master';
import { toggleLoader } from '../../../store/actions/auth';
import Bredcrumb from '../../../reuseable/Bredcrumb';

const StateEdit = (props) => {
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
            },
            state_code: {
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

            getStatesById(id).then(
                response => {
                    dispatch(toggleLoader(false));
                    if (!response.error) {
                        updateForm(_setFormData(response.data), true);
                        if( response.data.state_id ){
                            //setLoadCity(true);
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

    //console.log(state.inputs);

    const handleFormSubmit = (ev) => {

        ev.preventDefault();
        setIsSubmitBtnPressed(true);
        const { inputs, formValidity } = state;
        if (formValidity) {
            dispatch(toggleLoader(true));
            if(!id){
                addStates(_setSubmitableData(inputs)).then(result => {
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
                updateState(_setSubmitableData(inputs)).then(result => {
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
            <Redirect to={RouteNames.stateList} />
        )

    return (
        <DefaultStructure pageTitle='State Add/Edit Form'>
            <Bredcrumb
                leading={{ title: 'State List', url: RouteNames.stateList }}
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

                <div className="form-group">
                    <label>State Code <em>*</em></label>
                    <input
                        type="text"
                        name=""
                        value={state.inputs.state_code.value}
                        onChange={(e) => inputHandler('state_code', e.target.value)}
                    //onBlur={() => touchHandler('name') }
                    />
                    {!state.formValidity && isSubmitBtnPressed && state.inputs.state_code.value === '' &&
                        <span className="invalid">State Code is required field.</span>
                    }
                </div>
                
            </BaseForm>
        </DefaultStructure>
    )
}

export default StateEdit;
