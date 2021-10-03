/**
|--------------------------------------------------
| Chart section for App User
|--------------------------------------------------
*/
/**
 * Add dependencies
 */
import React, {useEffect, useState} from 'react';
import BaseChart from '../../../reuseable/BaseChart';
import { getResponseTimeChart } from '../../../store/actions/dashboard';

function ResponseTimeChart() {

    const [filterData, setFilterData] = useState({
        time_interval : 'weekly',
    });

    const [chartX, setChartX] = useState([]);
    const [chartY, setChartY] = useState([]);
    const [dataLoading, setDataLoading] = useState(false);

    const _resetXYData = () =>{
        setChartX([]);
        setChartY([]); 
    }

    useEffect(()=>{
        
        _loadCharts( filterData );

    },[]);

    const _loadCharts = (filter = filterData) =>{
        setDataLoading(true);
        getResponseTimeChart(filter).then(res => {
            setDataLoading(false);
            if( res.data && res.data.length > 0){
                setChartY(res.data.map(t => (t.avgqueryrestime / 60).toFixed(2)));
                setChartX(res.data.map(t => t.created_at));
            }else
                _resetXYData();
            
            console.log(res.data);
            
        })
    }

    const _filteredReportHandler = (ev, filter) =>{
        ev.preventDefault();
        setFilterData(prevFilter => ({...prevFilter, time_interval: filter}));
        _loadCharts({...filterData, time_interval: filter});
    }

    return (
        <div className={dataLoading ? "dashboard_card on-load" : "dashboard_card"}>
            <h4>Response Time</h4>
            <div className="chrt-hlder">
                <BaseChart
                    chartTitle="Response Time Chart"
                    data={[
                            {
                                x: [ ...chartX ],
                                y: [ ...chartY ],
                                type: 'scatter',
                                marker: {color: '#1bb390'},
                            },
                        ]}
                    layoutWidth={480}
                    layoutHeight={400}
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

export default ResponseTimeChart;
