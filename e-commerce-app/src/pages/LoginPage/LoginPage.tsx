import { Grid, Box, TextField, Button, Alert, Typography } from '@mui/material';
import LoginImage from '../../assets/images/ImgLoginPage.png';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

export const LoginPage: React.FC = () => {
    const [error, setError] = useState({
        status: false,
        message: '',
        type: ''
    });
    const handleSubmit=(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const data=new FormData(e.currentTarget);
        const actualData = {
            email: data.get('email'),
            password: data.get('password'),
        };
        if (actualData.email && actualData.password) {
            console.log(actualData);
            (document.getElementById('login-form') as HTMLFormElement).reset();
            setError({ 
                status: true, 
                message: 'Successful!', 
                type: 'success'
            });
        } else {
            setError({ 
                status: true, 
                message: 'All fields are required', 
                type: 'error'
            });
        }
    };
    return (
        <Grid container sx={{ height: '80vh'}}>
            <Grid item lg={7} sm={5} sx={{
                backgroundImage: `url(${LoginImage})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
            </Grid>
            <Grid item lg={5} sm={7}>
                <Box component='form' noValidate sx={{ mt: 5, ml:8, mr:8}} id='login-form' onSubmit={handleSubmit}>
                    <Box>
                        {error.status ? <Alert severity={'error'}>{error.message}</Alert> : ''}
                    </Box>
                    <TextField sx={{mt: 2}} required fullWidth id='email' name='email' label='Email Address' type='email' />
                    <TextField required fullWidth margin='normal' id='password' name='password' label='Password' type='password'/>
                    <Box textAlign='center'>
                        <Button type='submit' variant='contained' sx={{px:5, mt: 2, backgroundColor: 'green'}}>Login</Button>
                        <Typography component='p' color='gray'>Remember me</Typography>
                    </Box>
                    <Box>
                        <NavLink to='/'>Forgot Password?</NavLink>
                    </Box>
                    <Box sx={{mt: 10}}>
                        <Typography component='p' textAlign='center'>Don&apos;t have account yet? Sign up</Typography>
                    </Box>
                    <Box textAlign='center'>
                        <Button type='submit' variant='contained' sx={{px:2, mt: 2, backgroundColor: 'green'}}>Registration</Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>

    );
};
