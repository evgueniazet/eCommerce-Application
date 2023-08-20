import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

export const FormPage1 = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="new-password"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          name="repassword"
          label="Repeat Password"
          type="password"
          id="password"
          autoComplete="new-password"
        />
      </Grid>
    </Grid>
  );
};
