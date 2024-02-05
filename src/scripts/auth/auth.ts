'use server'

import axios, { AxiosError, AxiosResponse, HttpStatusCode } from 'axios';

export async function serverAct() : Promise<string> {
    console.log("Hello world");

    return "Hello";
}

export async function authenticate(formData: FormData): Promise<HttpStatusCode> {
    try {
        /*formData.forEach(k => {
            console.log(k);
        });*/

        const username: string | undefined = formData.get("username")?.toString();
        const password: string | undefined = formData.get("password")?.toString();
        const keepSession: boolean = formData.get("keepSession")?.valueOf()?true:false;

        console.log("--- Data ---");
        console.log(username);
        console.log(password);
        console.log(keepSession);

        axios.post(process.env.API_BASE_URL + "api/users/auth", {
            username: username,
            password: password
        })
        .then(function (response: AxiosResponse) {
            console.log(response.data);
            //window.location.href = "/home";
            fetch(`/api/auth?email=${response.data.email}&id=${response.data.id}&isSession=${!keepSession}`).then(function (res) {
                //console.log(res);
                //return router.push('/home');
            });

        })
        .catch(function (reason: AxiosError) {
            if (reason.response?.status == 401) {
                return HttpStatusCode.Unauthorized;
            } else {
                console.log(reason.response?.status);
                alert(reason.response?.status);
            }
        });
    }
    catch (error: any) {

    }

    return HttpStatusCode.InternalServerError;
}