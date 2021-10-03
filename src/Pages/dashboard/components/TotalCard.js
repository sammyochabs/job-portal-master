/**
|--------------------------------------------------
| Base Card section for Dashboard report
|--------------------------------------------------
*/

/**
 * Add dependencies
 */
import React from 'react';

function TotalCard({title, data, symbol}) {
    return (
        <div className="user_crd_cntnt">
            <h4>{title}</h4>
            <p>{symbol && symbol}{data}</p>
        </div>
    )
}

export default TotalCard;
