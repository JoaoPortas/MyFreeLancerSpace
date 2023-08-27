import { Typography } from "@mui/material";
import { Locale } from "../../../../../i18n-config";
import { getDictionary } from '../../dictionaries';

export default async function Products({ params: { lang } }: { params: { lang: Locale } }) {
    const dict = await getDictionary(lang);

    return (
        <main>
            <Typography>Em construção</Typography>
            <Typography>Todos os produtos</Typography>
        </main>
    );
}