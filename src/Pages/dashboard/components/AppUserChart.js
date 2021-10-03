/**
|--------------------------------------------------
| Chart section for Response Time
|--------------------------------------------------
*/
/**
 * Add dependencies
 */
import React from 'react';

function AppUserChart() {
    return (
        <div className="dashboard_card">
            <h4>App User</h4>
            <div className="chrt-hlder">
                <img src={require('../../../assets/images/Donut-chart.jpg').default} alt="barcht" />
            </div>
        </div>
    )
}

export default AppUserChart;
