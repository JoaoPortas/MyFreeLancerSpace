import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { getDictionary } from '../../../dictionaries';
import { Locale } from "../../../../../../i18n-config";
import BrandSelectBoxComponent from "@/components/inputs/brandSelectBoxComponent";
import CategorySelectBoxComponent from "@/components/inputs/categorySelectBoxComponent";
import MeasureUnitNormSelectBoxComponent from "@/components/inputs/measureUnitNormSelectBoxComponent";

export default async function Products({ params: { lang } }: { params: { lang: Locale } }) {
    const dict = await getDictionary(lang);

    return (
        <div>
            <Grid
                container
                spacing={2}
            >
                <Grid item container xs={12} sm={4} md={3} justifyContent="center">
                <div style={{ width: "95%", height: "0",  paddingBottom: "95%", background: "url('https://sklep.elektrospark.pl/upload/1920/b2efcb49ed6fe51d587750688a86029cb269170d[1].jpg') no-repeat  center", backgroundSize: "cover" }}>
                    <img src="/static/as.jpg" style={{width: "100%", height: "100%"}}></img>
                </div>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                    <Stack spacing={2}>
                        <TextField
                            disabled
                            label="ID"
                            id="outlined-size-small"
                            defaultValue="1"
                            size="small"
                            sx={{width: "200px"}}
                        />
                        <TextField
                            label="Designação"
                            id="outlined-size-small"
                            size="small"
                        />
                        <Stack direction={{ xs: "row", sm: "row" }} spacing={{ xs: 1, sm: 2 }}>
                            <BrandSelectBoxComponent fullWidth sx={{ width: { xs: "100%", sm: "100%", md: "250px" } }}/>
                            {/*<IconButton sx={{width: { xs: "auto", sm: "auto" }}}><AddIcon /></IconButton>*/}
                        </Stack>
                        <Stack direction={{ xs: "column", sm: "column",  md: "row"}} spacing={{ xs: 1, sm: 1, md: 2 }}>
                            <TextField
                                label="Referência do produto"
                                id="outlined-size-small"
                                size="small"
                                sx={{width: { xs: "100%", sm: "100%", md: "250px" }}}
                            />
                            <Button disabled variant="contained" sx={{width: { xs: "100%", sm: "100%", md: "250px" }}}>Obter preço</Button>
                        </Stack>
                        <Stack direction={{ xs: "row", sm: "row" }} spacing={{ xs: 1, sm: 2 }}>
                            <CategorySelectBoxComponent sx={{ width: { xs: "100%", sm: "100%", md: "250px" } }}/>
                            {/*<IconButton sx={{width: { xs: "auto", sm: "auto" }}}><AddIcon /></IconButton>*/}
                        </Stack>
                        <Stack direction={{ xs: "column", sm: "column", md: "row" }} spacing={{ xs: 1, sm: 1, md: 2 }}>
                            <TextField
                                label="Qtn. por pack"
                                id="outlined-size-small"
                                size="small"
                                sx={{width: { xs: "100%", sm: "100%", md: "250px" }}}
                            />
                            <MeasureUnitNormSelectBoxComponent sx={{ width: { xs: "100%", sm: "100%", md: "250px" } }}/>
                        </Stack>
                        <Stack direction="column" spacing={{ xs: 0, sm: 0, md: 1 }}>
                            <Stack direction={{ xs: "column", sm: "column", md: "row" }} spacing={{ xs: 0, sm: 0, md: 1 }}>
                                <TextField
                                    label="Preço"
                                    id="outlined-size-small"
                                    size="small"
                                    sx={{width: { xs: "100%", sm: "100%", md: "250px" }}}
                                />
                                <Box sx={{ display: 'flex', alignItems: 'end' }}><Typography>€ s/Iva</Typography></Box>
                            </Stack>
                            <Stack direction="row" spacing={{ xs: 1, sm: 1 }}>
                                <Typography variant="h6">Preço final: </Typography>
                                <Typography variant="h6"> 00,00€ c/Iva</Typography>
                            </Stack>
                        </Stack>
                        
                        <TextField
                            id="outlined-multiline-static"
                            label="Descrição"
                            multiline
                        />
                        <Button variant="contained" sx={{width: { xs: "100%", sm: "100%", md: "250px" }}}>Criar</Button>
                    </Stack>
                </Grid>                
            </Grid>
        </div>
    );
}