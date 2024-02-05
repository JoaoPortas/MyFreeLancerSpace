import { getDictionary } from '../../dictionaries';
import LoginFormComponent from '@/components/auth/loginFormComponent';

export default async function Login() {
    return (
        <main>
            <LoginFormComponent></LoginFormComponent>
        </main>
    );
}