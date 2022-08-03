import React from 'react';
import { scaleLinear } from "d3-scale";
import HorizontalBarChart from './HorizontalBarChart';

export function TopSourcesChart({ inputData, timeBuckets }) {


  //TODO: this should really be the total number of pageviews, its currently limited to the ones being shown in the Top Pages chart
  var topSourceCounts = inputData.map((sourceData) => sourceData.count).reduce(function (a, b) { return a + b }, 0);

  return (<>
    <HorizontalBarChart valueTitle="Views" data={inputData} totalValue={topSourceCounts} colorMin="#c09aff" colorMax="#7526ff" />
  </>);
}
