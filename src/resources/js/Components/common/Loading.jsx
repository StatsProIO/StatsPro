import {Typography} from '@mui/material';
import React from 'react';
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";


export default function Loading({ loading, children }) {

        return loading ? (

                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ width: 1, height: "50vh" }}
                >
                    <Typography variant={'h4'} sx={{textAlign: 'center'}}>
                        <CircularProgress size={'5rem'} />
                    </Typography>
                </Stack>

        ) : children
}
