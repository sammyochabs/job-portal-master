/**
|--------------------------------------------------
| Chart section for Business Volume
|--------------------------------------------------
*/
/**
 * Add dependencies
 */
 import React, { useState, useEffect} from 'react';
 import { getBusinessChart } from '../../../store/actions/dashboard';
 import BaseChart from '../../../reuseable/BaseChart';

function BusinessVolumeChart() {

    const [filterData, setFilterData] = useState({
        time_interval : 'weekly'
    });

    const [chartX, setChartX] = useState([]);
    const [chartY, setChartY] = useState([]);
    const [dataLoading, setDataLoading] = useState(false);

    useEffect(()=>{
        
        _loadCharts();

    },[]);

    const _loadCharts = (filter = filterData) =>{
        setDataLoading(true);
        getBusinessChart(filter).then(res => {
            setDataLoading(false);
            if(res.data && Object.keys(res.data).length > 0 ){
                const { business_amount } = res.data;
                if( business_amount && Array.isArray( business_amount ) && business_amount.length > 0 ){
                        
                    setChartY( business_amount.map(b => b.amount) );
                    setChartX( business_amount.map(b => b.created_at) );

                }else{
                    setChartY( [] );
                    setChartX( [] );
                }                  

            }
        })
    }

    const _filteredReportHandler = (ev, filter) =>{
        ev.preventDefault();
        setFilterData(prevFilter => ({...prevFilter, time_interval: filter}));
        _loadCharts({...filterData, time_interval: filter});
    }

    return (
        <div className={dataLoading ? "dashboard_card on-load" : "dashboard_card"}>
            <h4>Business Volume</h4>
            <div className="bsvolume_tab">
                <div className="bsvolume_tab_container active">
                    <div className="chrt-hlder">
                        <BaseChart
                            chartTitle="Business Volume"
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
            
        </div>
    )
}

export default BusinessVolumeChart;
