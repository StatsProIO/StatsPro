import ValidationErrors from '@/Components/ValidationErrors';
import { useForm } from '@inertiajs/inertia-react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useEffect } from 'react';

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
      <Grid container justifyContent="center">
        <Grid item md={5}>

          <Box style={{ backgroundColor: '#fff' }} sx={{ p: 4 }}>

            <Typography sx={{ py: 1 }}>Put in the URL for your website.</Typography>
            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <ValidationErrors errors={errors} />

            <form onSubmit={submit}>

              <TextField
                fullWidth
                label="URL (https://example.com)"
                variant="outlined"
                type="text"
                name="domain_name"
                value={data.domain_name}

                placeholder=""

                onChange={onHandleChange}
              />


              <Button variant="contained" type="submit" size="large" sx={{ my: 2 }}>
                Add Domain
              </Button>

            </form>
          </Box>

        </Grid>
      </Grid>

    </>
  );
}
