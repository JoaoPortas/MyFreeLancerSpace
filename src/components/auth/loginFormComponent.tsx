'use client';

import { FormEvent, useState } from 'react';

import { FormControlLabel, FormGroup, Grid, Stack, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';

import axios, { AxiosError, AxiosResponse } from 'axios';
import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/router';


function isFormValid(
    username: string,
    password: string
  ): boolean {

    if (username !== "" && password !== "") {
      return true;
    }
    else {
      return false;
    }
}

export default function LoginFormComponent({ dict }: { dict: any }) {
    const [usernameHelperText, setUsernameHelper] = useState(null);
    const [hasUsernameError, setUsernameError] = useState(false);

    function onInputUsername() {
        if (hasUsernameError) {
            setUsernameHelper(null);
            setUsernameError(false);
        }
    }

    const submitLogin = async (event: FormEvent) => {
        event.preventDefault();
      
        const form = event.target as HTMLFormElement;
      
        const username: string = form.username.value;
        const password: string = form.password.value;
        const keepSession: boolean = form.keepSession.checked;
        console.log(`${username} - ${password}`);
      
        const isFormDataValid: boolean = isFormValid(username, password);
      
        if (!isFormDataValid) {
            setUsernameHelper(dict.authentication.accountLoginError);
            setUsernameError(true);
            return;
        } else {
            setUsernameHelper(null);
            setUsernameError(false);
        }
      
        //trocar por .env var
        axios.post(process.env.API_BASE_URL + "api/users/auth", {
            username: username,
            password: password
        })
        .then(function (response: AxiosResponse) {
            console.log(response.data);
            window.location.href = "/home";
        })
        .catch(function (reason: AxiosError) {
            if (reason.response?.status == 401) {
                setUsernameHelper(dict.authentication.accountLoginError);
                setUsernameError(true);
            } else {
                console.log(reason.response?.status);
            }
        });
      };
    
      return (
        <main>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '90vh' }}
          >
            <Grid item>
              <div className='auth-container'>
                <div className='auth-header-container'>
                  <Typography variant="h4" align='center'>Login</Typography>
                </div>
                <div className='auth-body-container'>
                  <form onSubmit={submitLogin}>
                    <Stack spacing={2}>
                      <TextField error={hasUsernameError?true:false} helperText={usernameHelperText?dict.authentication.accountLoginError:null} id="username" label={dict.authentication.username} onInput={onInputUsername} variant="outlined" size='small' fullWidth />
                      <TextField error={hasUsernameError?true:false} id="password" label={dict.authentication.password} variant="outlined" type='password' size='small' fullWidth />
                      <FormGroup>
                        <FormControlLabel control={<Checkbox id='keepSession' />} label={<Typography variant="body2" color="textSecondary">{dict.authentication.keepSignIn}</Typography>} />
                      </FormGroup>
                      <Link href="recovery-password" variant="body2" underline="none">{dict.authentication.recoveryPassword}</Link>
                      <Button type='submit' variant="contained">{dict.authentication.signIn}</Button>
                    </Stack>
                  </form>
                </div>
              </div>
            </Grid>
          </Grid>
        </main>
      );
}