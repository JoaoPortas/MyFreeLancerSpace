import { Typography, Card, CardMedia } from "@mui/material";

export default async function Products() {
    return (
        <main>
            <Typography>Em construção</Typography>
            <Typography>Todos os produtos</Typography>
            <Card sx={{maxWidth: "250px", height: "430px"}}>
                <CardMedia
                    sx={{ height: 200, width: 200, marginRight: "auto", marginLeft: "auto", marginTop: 3 }}
                    image="/static/no-product-image.png"
                    title="green iguana"
                />
                <Typography>Em construção</Typography>
            </Card>
        </main>
    );
}