import { useCallback, useReducer } from 'react';

const INPUT_CHANGED = 'input_changed';
const INPUT_TOUCHED = 'input_touched';
const INPUT_UPDATE = 'input_update';

const formReducer = (state, action) =>{
    switch( action.type ){
        case INPUT_CHANGED:{ 
            const { inputs } = state;
            let _formValidity = true
            
            for( const inputField in inputs ){

                if( inputField === action.field ){
                    //console.log(action.field, action.isIgnorable);
                    inputs[inputField].value = action.value;
                    if( !action.isIgnorable )
                        inputs[inputField].isValid = action.value !== '' ? true : false;
                    
                    if( action.isIgnorable )
                        inputs[inputField].isValid = true;

                    inputs[inputField].isTouched = true;

                }

                if( !inputs[inputField].isValid )
                    _formValidity = false;
            }

            return {
                ...state,
                inputs,
                formValidity: _formValidity
            };
        }
        
        case INPUT_TOUCHED:{
            const { inputs } = state;
            inputs[action.field].isTouched = true;

            return {
                ...state,
                inputs
            };
        }

        case INPUT_UPDATE:{
            return {
                inputs : action.inputs,
                formValidity : action.formValidity
            };
        }

        default: {
            return state;
        }
        
    }
};

const useForm = (initValue, initFormValidity) =>{
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: initValue,
        formValidity: initFormValidity
    });

    const inputHandler = useCallback(( field, value, ignore = false)=>{
        dispatch({
            type: INPUT_CHANGED,
            value: value,
            field: field,
            isIgnorable: ignore
        });
    },[]);

    
    const touchHandler = useCallback(( field )=>{
        dispatch({
            type: INPUT_TOUCHED,
            field: field
        });
    },[]);

    const updateForm = useCallback((inputs, formValidity)=>{
        dispatch({
            type: INPUT_UPDATE,
            inputs,
            formValidity
        });
    },[]);
    

    return [ formState, inputHandler, touchHandler, updateForm ];
}

export default useForm;