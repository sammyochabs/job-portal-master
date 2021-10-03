/**
|--------------------------------------------------
| Query Chart section for Query
|--------------------------------------------------
*/
/**
 * Add dependencies
 */
import React, { useState, useEffect} from 'react';
import { getQueryChart } from '../../../store/actions/dashboard';
import { getStatus } from '../../../store/actions/master';
import BaseChart from '../../../reuseable/BaseChart';

function QueryChart() {

    const [filterData, setFilterData] = useState({
        time_interval : 'weekly',
        status_id : ''
    });

    const [chartX, setChartX] = useState([]);
    const [chartY, setChartY] = useState([]);
    const [dataLoading, setDataLoading] = useState(false);

    const [status, setStatus] = useState([]);

    const _resetXYData = () =>{
        setChartX([]);
        setChartY([]); 
    }

    useEffect(()=>{
        
        getStatus().then(resp => {
            
            if (!resp.error) {
                setStatus(resp.data);
                if(resp.data && resp.data.length > 0 ){
                    setFilterData(prevData => ({...prevData, status_id: resp.data[0]._id}));
                    _loadCharts({...filterData, status_id: resp.data[0]._id});
                }else{
                    _resetXYData();
                }
            }else{
                _resetXYData();
            }
        
        })

    },[]);

    const _loadCharts = (filter = filterData) =>{
        setDataLoading(true);
        getQueryChart(filter).then(res => {
            setDataLoading(false);
            
            if(res.data && Object.keys(res.data).length > 0){
                let _c = {};
                for(const k in res.data){
                    if( Array.isArray(res.data[k]) && res.data[k].length > 0 ){
                                              
                        res.data[k].forEach(item => {
                            
                            _c = {
                                ..._c,
                                [item.created_at] : _c[item.created_at]  ? _c[item.created_at] + item.count : item.count
                            }
                            
                        })
                    }
                        
                }
                
                if( Object.keys(_c).length > 0){
                    setChartY( Object.values(_c) );
                    setChartX( Object.keys(_c) );
                }else{
                    _resetXYData();
                }
                

            }else{
                _resetXYData();
            }
        })
    }

    const _filteredReportHandler = (ev, filter) =>{
        ev.preventDefault();
        setFilterData(prevFilter => ({...prevFilter, time_interval: filter}));
        _loadCharts({...filterData, time_interval: filter});
    }

    const _changeBookingStatus =(value) =>{
        setFilterData(prevFilter => ({...prevFilter, status_id: value}));
    }

    const _handleQueryReportByFilter = () =>{
        _loadCharts(filterData);
    }

    return (
        <div className={dataLoading ? "dashboard_card on-load" : "dashboard_card"}>
            <h4>Query</h4>
            <div className="queryChart">
                <select 
                    value={ filterData.status_id } 
                    onChange={(ev) => _changeBookingStatus( ev.target.value ) }>
                    
                    {
                        status && status.length > 0 && status.map((sts, index) => 
                            <option key={index} value={sts._id}>{sts.name}</option>
                        )
                    }
                        
                </select>
                <button type="button" className="queryFilter" onClick={_handleQueryReportByFilter}>Filter</button>
            </div>
            
            <div className="chrt-hlder">
                <BaseChart
                            chartTitle="Query Chart"
                            data={[
                                {
                                    x: [ ...chartX ],
                                    y: [ ...chartY ],
                                    type: 'scatter',
                                    //mode: 'lines+markers',
                                    marker: {color: '#1bb390'},
                                },
                                //{type: 'scatter', x: [1, 2, 3], y: [2, 4, 3]},
                                ]}
                            layoutWidth={500}
                            layoutHeight={340}
                            xaxis = {{
                                ticks: 'outside',
                                tickformat: filterData.time_interval === 'yearly' ? 'd' : (chartX.length > 0 ? '%d/%m/%Y' : null )
                            }}
                            yaxis = {{
                                ticks: 'outside',
                                tickformat: 'd'
                            }}
                        />
            </div>
            <ul className="bsvolume_tab_ancher_list">
                <li>
                    <a className={filterData.time_interval === 'weekly' ? 'active' : ''} onClick={(ev)=> _filteredReportHandler(ev, 'weekly')} href="#">Weekly</a>
                </li>

                <li>
                    <a className={filterData.time_interval === 'monthly' ? 'active' : ''} onClick={(ev)=> _filteredReportHandler(ev, 'monthly')} href="#">Monthly</a>
                </li>

                <li>
                    <a className={filterData.time_interval === 'yearly' ? 'active' : ''} onClick={(ev)=> _filteredReportHandler(ev, 'yearly')} href="#">Yearly</a>
                </li>
            </ul>
        </div>
    )
}

export default QueryChart;
