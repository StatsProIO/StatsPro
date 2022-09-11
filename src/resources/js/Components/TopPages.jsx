import React from 'react';
import HorizontalBarChart from './HorizontalBarChart';



export function TopPages({ inputData }) {
    //TODO: this should really be the total number of pageviews, its currently limited to the ones being shown in the Top Pages chart
    var totalPageCounts = inputData.map((pageData) => pageData.count).reduce(function (a, b) { return a + b }, 0);
    return (<>
        <HorizontalBarChart valueTitle="Views" data={inputData} totalValue={totalPageCounts} colorMin="#d5e9ff" colorMax="#1c5aff" />
    </>);
}
