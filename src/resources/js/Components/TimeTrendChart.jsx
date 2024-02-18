import React from 'react';
import {BarElement, CategoryScale, Chart as ChartJS, LinearScale} from 'chart.js';
import Box from "@mui/material/Box";
import {Grid} from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement
);

var darkBlue = [15, 87, 255];
var purple = [168, 191, 255];

function createLinearGradient(element, color, size) {
  var gradient = element.createLinearGradient(0, 0, 0, size);
  gradient.addColorStop(0, hexToRGB(color, .6));
  gradient.addColorStop(.7, hexToRGB(color, .4));
  gradient.addColorStop(1, hexToRGB(color, 0));
  return gradient;
}

function calculateColor(weight) {
    var w1 = weight;
    var w2 = 1 - w1;
    var rgb = [Math.round(darkBlue[0] * w1 + purple[0] * w2),
        Math.round(darkBlue[1] * w1 + purple[1] * w2),
        Math.round(darkBlue[2] * w1 + purple[2] * w2)];
    return 'rgb('+rgb+')'
}


const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const HOURS_OF_DAY_BUCKETS = ['', '', '12 AM', '3 AM', '6 AM', '9 AM', '12PM', '3 PM', '6PM', '9 PM'];


export function TimeTrendChart({ inputData }) {

    return (
        <>
            <Grid container direction={'row'} xs={12}>
            {HOURS_OF_DAY_BUCKETS.map(HOUR_OF_DAY => {
                return (<Grid item xs={1} sx={{textAlign: "center"}} >{HOUR_OF_DAY}</Grid>)
            })}
            </Grid>

            {inputData.map((weekDay, index) => {
                return (<Grid container direction={'row'} xs={12}>
                    <Grid item xs={2} sx={{textAlign: 'right'}} alignItems="center" flexDirection={'column'} justifyContent={'center'}><p>{DAYS_OF_WEEK[index]}</p></Grid>
                     {
                        weekDay.map(hourRate => {
                            return (<Grid item xs={1}>
                                <Box sx={{backgroundColor: calculateColor(hourRate), borderRadius: '5px', textAlign: 'center', color: 'transparent'}} mx={1}  >
                                   <p> {'`'}</p>
                                </Box>
                            </Grid>)
                        })
                    }
                </Grid>)
            })}
        </>
    );
}
