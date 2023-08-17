import { Locale } from '../../../../../i18n-config';
import { getDictionary } from '../../dictionaries';

export default async function Home({ params: { lang } }: { params: { lang: Locale } }) {
    const dict = await getDictionary(lang);

    return (
        <main>
            <p>Welcome!</p>
            <img src='/static/as.jpg'></img>
            <a href='/login'>Login page</a>
        </main>
    );
}