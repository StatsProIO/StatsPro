import ValidationErrors from '@/Components/ValidationErrors';
import {useForm} from '@inertiajs/inertia-react';
import {Box, Button, Link, TextField} from '@mui/material';
import React, {useEffect} from 'react';
import AddIcon from '@mui/icons-material/Add';
import {LoadingButton} from "@mui/lab";

export default function AddDomainForm() {
  const { data, setData, post, processing, errors, reset } = useForm({
    domain_name: ''
  });

  useEffect(() => {
    return () => {
      reset('domain_name');
    };
  }, []);

  const onHandleChange = (event) => {
    setData(event.target.name, event.target.value);
  };

  const submit = (e) => {
    e.preventDefault();

    post(route('domain'));
  };

  return (
    <>
        <ValidationErrors errors={errors} />

        <form onSubmit={submit}>
            <TextField
            fullWidth
            label="URL (https://example.com)"
            variant="outlined"
            type="text"
            name="domain_name"
            value={data.domain_name}
            onChange={onHandleChange}
            sx={{mt: 2}}
            />
            <LoadingButton loading={processing} fullWidth variant="contained" type="submit" size="large" sx={{ my: 2 }} startIcon={<AddIcon />}>Add Domain</LoadingButton>
        </form>
        <Box sx={{mt: 3}}>
            <Link variant={'subtitle1'} href={'/contact'}>Need Help?</Link>
        </Box>
    </>
  );
}
