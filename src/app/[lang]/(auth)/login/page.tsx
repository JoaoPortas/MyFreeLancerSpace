import { Locale } from '../../../../../i18n-config';
import { getDictionary } from '../../dictionaries';
import LoginFormComponent from '@/components/auth/loginFormComponent';

export default async function Login({ params: { lang } }: { params: { lang: Locale } }) {
    const dict = await getDictionary(lang);

    return (
        <main>
            <LoginFormComponent dict={dict}></LoginFormComponent>
        </main>
    );
}