/**
|--------------------------------------------------
| State City components will return state and city
|--------------------------------------------------
*/

import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getCitiesByState, getStates } from '../store/actions/master';
import { toggleLoader } from '../store/actions/auth';

const STATIC_STATE_ID = '6049d87be25695c0e6bc89d5';

function StateCityComponent({state_id, city_id,  onStateCityChanged}) {

    //const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [activeOther, setActiveOther] = useState(false);
    //const [loadState, setLoadState] = useState(false);
    const [loadCity, setLoadCity] = useState(false);
    const dispatch = useDispatch();
    const [selectedStateCity, setSelectedStateCity] = useState(
        {state_id: STATIC_STATE_ID, city_id: city_id || '', city_name: ''});

    const [redirect, setRedirect] = useState(false);
    const userReauthenticate = ({ message }) => {
        toast.error(message, {
            onOpen: () => setRedirect(true)
        });
    }

    useEffect(() => {
        // setLoadState(true);
        // getStates().then(resp => {
        //     setStates(resp.data);
        //     setLoadState(false);
        // })

        if( STATIC_STATE_ID)
        {
            onStateCityChanged('state_id', STATIC_STATE_ID);
            dispatch(toggleLoader(true));
            setLoadCity(true);
            __loadCities(STATIC_STATE_ID);
        }
        
    }, []);

    // const _handleState = ({ target: { value } }) => {
    //     setLoadCity(true);
    //     setSelectedStateCity(prevData => ({...prevData, state_id: value}));
    //     __loadCities(value);
    //     onStateCityChanged('state_id', value);
    // }

    const __loadCities = (stateId) => {
        getCitiesByState(stateId).then(resp => {
            if (resp.data)
                setCities(resp.data);
            setLoadCity(false);
            dispatch(toggleLoader(false));
        })
    }

    const _handleCity = ({target: {value}}) =>{
        if( cities.find(c => c.name === 'Other' && c._id === value) )
            setActiveOther(true);
        else
            setActiveOther(false);

        setSelectedStateCity(prevData => ({...prevData, city_id: value}));
        onStateCityChanged('city_id', value);
    }

    const _handleOtherCityName = ({target: {value}}) =>{
        setSelectedStateCity(prevData => ({...prevData, city_name: value}));
        onStateCityChanged('city_name', value);
    }

    if (redirect)
        return <Redirect to="/login" />

    return (
        <>
            <div className={loadCity ? "form-group load-frm-grup" : "form-group"}>
                <label>City</label>
                {
                    loadCity && <span className="cityLoading"></span>
                }
                <select
                    value={selectedStateCity.city_id ? selectedStateCity.city_id : ''}
                    onChange={ _handleCity }
                >
                    <option value="">Select City</option>
                    {
                        cities && cities.length > 0 && cities.map(city => <option value={city._id} key={city._id}>{city.name} </option>)
                    }

                </select>
                
            </div>
            {
                activeOther &&
                <div className="form-group">
                    <label>City Name</label>
                    <input
                        type="text"
                        value={selectedStateCity.city_name}
                        onChange={_handleOtherCityName}
                    />
                </div>
            }  
        </>
    )
}

export default StateCityComponent;
