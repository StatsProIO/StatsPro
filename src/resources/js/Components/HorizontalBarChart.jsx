import {Box, Grid, Typography} from "@mui/material";
import {scaleLinear} from "d3-scale";
import {Fragment} from "react";


export default function HorizontalBarChart({ valueTitle, data, totalValue, colorMin, colorMax }) {

    var min = Number.MAX_SAFE_INTEGER
    var max = 0;

    Object.values(data).forEach((dataItem) => {
        if (dataItem.count !== 0) {
            min = Math.min(min, dataItem.count);
        }
        max = Math.max(max, dataItem.count);
    });

    const colorScale = scaleLinear()
        .domain([min, max])
        .range([colorMin, colorMax]);

    return (
        <>
            <Grid container>
                <Grid item xs={1} textAlign="center">
                    <Typography variant="subtitle1" color="text.secondary">{valueTitle}</Typography>
                </Grid>
            </Grid>
            <Grid container alignItems="center"
                justifyContent="center">

                {data.map((dataItem) =>

                    <Fragment key={dataItem.label + "-bar"}>
                        <Grid item xs={1} justifyContent="center" >
                            <Typography textAlign="center">{dataItem.count}</Typography>
                        </Grid>
                        <Grid item xs={11} >
                            <Box sx={{ m: 1 }}>
                                <Box style={{ backgroundColor: '#eee', borderTopRightRadius: '10px', borderBottomRightRadius: '10px' }}>
                                    <Typography style={{ position: 'absolute', maxWidth: '15em', textOverflow: 'ellipsis', overflow: 'hidden' }} sx={{ py: 1, pl: 1 }} display="inline">{dataItem.label}</Typography>
                                    <Box style={{ backgroundColor: colorScale(dataItem.count), width: (dataItem.count / totalValue) * 100 + '%', borderTopRightRadius: '10px', borderBottomRightRadius: '10px' }} sx={{ py: 1, pl: 1 }}>&nbsp;</Box>
                                </Box>
                            </Box>
                        </Grid>
                    </Fragment>
                )}
            </Grid>
        </>
    );
}
