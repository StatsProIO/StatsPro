import React, {useState} from 'react';
import {ComposableMap, Geographies, Geography} from "react-simple-maps";
import {scaleLinear} from "d3-scale";
import ReactTooltip from "react-tooltip";


const geoUrl = "/features.json";

const colorScale = scaleLinear()
  .domain([0, 100])
  .range(["#6992ff", "#2a63fe"]);


export function LocationChart({ inputData }) {


  const [content, setContent] = useState("");


  return <>
    <ComposableMap data-tip="" projection='geoMercator' height={500} projectionConfig={{ center: [0, 45], scale: 120 }}  >
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const d = inputData.find((s) => s.country === geo.id);
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={d ? colorScale(d["count"]) : "#eee"}
                style={{
                  default: { outline: "none" },
                  hover: { outline: "none" },
                  pressed: { outline: "none" },
                }}
                onMouseEnter={() => {
                  console.log("Mouse enter" + geo.properties.name);
                  setContent(`${geo.properties.name} - ${d["count"]}`);
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
