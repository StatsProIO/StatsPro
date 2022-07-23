import React, { useEffect, useRef, useState } from 'react';
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import ReactTooltip from "react-tooltip";



const geoUrl = "/features.json";

const colorScale = scaleLinear()
  .domain([0.29, 0.68])
  .range(["#1b73e8e6", "#eee"]);


export function LocationChart() {

  const [data, setData] = useState([]);
  const [content, setContent] = useState("");


  useEffect(() => {
    setData([
      {
        ISO3: "USA",
        "2017": ".33",
        "pageviews": 10
      },
      {
        ISO3: "AFG",
        "2017": ".4",
        "pageviews": 12
      }
    ]);

  }, []);


  return <>
    <ComposableMap data-tip="" projection='geoMercator' height={500} projectionConfig={{ center: [0, 45], scale: 120 }}  >
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const d = data.find((s) => s.ISO3 === geo.id);
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={d ? colorScale(d["2017"]) : "#eee"}
                style={{
                  default: { outline: "none" },
                  hover: { outline: "none" },
                  pressed: { outline: "none" },
                }}
                onMouseEnter={() => {
                  console.log("Mouse enter" + geo.properties.name);
                  setContent(`${geo.properties.name} - ${d["pageviews"]}`);
                }}
                onMouseLeave={() => {
                  setContent("");
                }}
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
    <ReactTooltip>{content}</ReactTooltip>

  </>
}
