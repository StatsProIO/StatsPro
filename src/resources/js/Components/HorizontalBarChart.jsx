import {Box, Grid, Typography} from "@mui/material";
import {scaleLinear} from "d3-scale";
import React, {Fragment} from "react";


export default function HorizontalBarChart({ valueTitle, data, totalValue, colorMin, colorMax, labelKey }) {

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
                <Grid item xs={12} textAlign="right">
                    <Typography textAlign={'right'} variant="subtitle2" color="text.secondary">{valueTitle}</Typography>
                </Grid>
            </Grid>
            <Grid container alignItems="center"
                justifyContent="center">

                {data.map((dataItem) =>
                    <Fragment key={dataItem.label + "-bar"}>
                        <Grid item xs={8} sx={{ pt: 2}}>
                            <Typography variant={'body2'} style={{textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', textAlign: 'left'  }} sx={{ py: 1 }}>{dataItem.label ?? dataItem[labelKey]}</Typography>
                        </Grid>
                        <Grid item xs={4} sx={{ pt: 2}}>
                            <Typography variant={'body2'} textAlign="right">{dataItem.count}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Box style={{ backgroundColor: '#eee', borderTopRightRadius: '5px', borderBottomRightRadius: '5px' }}>
                                <Box style={{ backgroundColor: colorScale(dataItem.count), width: (dataItem.count / totalValue) * 100 + '%', height: '5px', borderTopRightRadius: '5px', borderBottomRightRadius: '5px' }}>&nbsp;</Box>
                            </Box>
                        </Grid>
                    </Fragment>
                )}
            </Grid>
        </>
    );
}
