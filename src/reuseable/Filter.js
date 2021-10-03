import React, { useEffect } from 'react';

const INPUT_TYPE_SELECT = 'select';
const INPUT_TYPE_TEXT = 'input-text';
const INPUT_TYPE_NUMBER = 'input-number';
const INPUT_TYPE_DATE = 'input-date';

function Filter({ applyFilter, filterData, filterName, clearFilter }) {

    const [filters, setFilters] = React.useState({});

    useEffect(() => {
        filterData.forEach(fileter => {
            setFilters(prevData => ({
                ...prevData,
                [fileter.name]: fileter.defaultValue ? fileter.defaultValue : ''
            }));
        })
    }, [filterData]);

    const _filterSubmitHandler = (ev) => {
        ev.preventDefault();
        applyFilter(filters);
    }

    const _clearFilter = (ev) =>{
        ev.preventDefault();
        setFilters({});
        applyFilter({});
    }

    const _inputHandler = ({ target: { name, value } }) => {

        setFilters(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    const _inputElement = (filter) => {
        
        switch (filter.type) {
            case INPUT_TYPE_SELECT: return (
                <select
                    onChange={_inputHandler}
                    value={filters[filter.name] || ""}
                    name={filter.name}
                >
                    <option value="">Select {filter.placeHolder || ''}</option>
                    { filter.data && filter.data.length > 0 &&
                        filter.data.map((item, index) =>
                            <option key={index} value={item.key}>{item.value}</option>
                        )
                    }
                </select>
            );

            case INPUT_TYPE_TEXT: return (
                <input
                    type="text"
                    placeholder={filter.placeHolder || ''}
                    value={filters[filter.name] || ""}
                    name={filter.name}
                    onChange={_inputHandler}
                />
            );

            case INPUT_TYPE_NUMBER: return (
                <input 
                    type="number"
                    placeholder={filter.placeHolder || ''}
                    value={filters[filter.name] || ""}
                    name={filter.name}
                    onChange={_inputHandler}
                />
            );

            case INPUT_TYPE_DATE: return (
                <input 
                    type="date"
                    placeholder={filter.placeHolder || ''}
                    value={filters[filter.name] || ""}
                    name={filter.name}
                    onChange={_inputHandler}
                />
            )

            default: return (
                <input
                    type="text"
                    placeholder={filter.placeHolder || ''}
                    value={filter.defaultValue || ""}
                    name={filter.name}
                    onChange={_inputHandler}
                />
            );
        }
    }

    return (
        <>
            
            <div className="filter_row">

                {
                    filterData && filterData.length > 0 &&
                    filterData.map((filter, index) =>
                        <div className={filter.wrapperClass ? `form-group ${filter.wrapperClass}` : "form-group"} key={index}>
                            <label>{filter.title || 'Search'}</label>
                            {_inputElement(filter)}
                        </div>
                    )
                }

            </div>
            <div className="search-clr_btn_holder">
                <a href="#" className="commn-btn filter" onClick={_filterSubmitHandler}>{ filterName || 'Filter' }</a>
                {clearFilter && 
                    <a href="#" className="commn-btn filter filterClear" onClick={_clearFilter}>Clear</a>
                }
            </div>
        </>
    )
}

export default Filter;