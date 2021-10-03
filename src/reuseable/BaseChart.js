/**
|--------------------------------------------------
| Base chart as main chat widget for entire chart
|--------------------------------------------------
*/

/**
 * Add dependencies
 */

import React from 'react';
import Plot from 'react-plotly.js';

const BaseChart = ({chartTitle, data, layoutWidth, layoutHeight, xaxis, yaxis }) => {

    return (
        <Plot
            data={data}
            layout={ {
                width: layoutWidth, 
                height: layoutHeight, 
                title: chartTitle,
                xaxis: xaxis || {},
                yaxis: yaxis || {},
            } }
            config={{
                responsive: true,
                scrollZoom: false,
                displayModeBar: false
            }}
        />
    )
}

export default BaseChart;
