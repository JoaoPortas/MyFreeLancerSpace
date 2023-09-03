'use client';

import { Button, FormHelperText, Grid, Stack, TextField, Typography } from "@mui/material";
import BrandSelectBoxComponent from "@/components/inputs/brandSelectBoxComponent";
import CategorySelectBoxComponent from "@/components/inputs/categorySelectBoxComponent";
import MeasureUnitNormSelectBoxComponent from "@/components/inputs/measureUnitNormSelectBoxComponent";

import { FormEvent } from "react";
import CurrencyTextFieldComponent from "@/components/inputs/currencyTextFieldComponent";
import { useState } from "react";

export default function Products({ params: { dict } }: { params: { dict: any } }) {
    const [designationHP, setDesignationHP] = useState<string | null>(null);
    const [hasDesignationError, setHasDesigntationError] = useState(false);
    const [productReferenceHP, setProductReferenceHP] = useState<string | null>(null);
    const [hasProductReferenceError, setHasProductReferenceError] = useState(false);
    const [qtnPerPackHP, setQtnPerPackHP] = useState<string | null>(null);
    const [hasQtnPerPackError, setHasQtnPerPackError] = useState(false);
    const [normHP, setNormHP] = useState<string | null>(null);
    const [hasNormError, setHasNormError] = useState(false);
    const [priceHP, setPriceHP] = useState<string | null>(null);
    const [hasPriceError, setHasPriceError] = useState(false);

    const [priceWithVat, setPriceWithVat] = useState('0,00');
    const IVA = 1.23;

    const [imageName, setImageName] = useState("No image selected");
    const [imageSrc, setImageSrc] = useState("");

    function updatePriceWithVat(priceNoVat: number) {
        console.log(priceNoVat);
        if (priceNoVat === null || isNaN(priceNoVat)) {
            setPriceWithVat("0,00");
            return;
        }
            
        let newPrice: any = priceNoVat * IVA;
        setPriceWithVat(newPrice.toFixed(2).replace('.',','));
    }

    function validateForm(designation: any, qtnPerPack: any, norm: any, price: any): boolean {
        let isValid = true;

        if (designation === "" || designation === null) {
            isValid = false;
            setDesignationHP("Campo obrigatório");
            setHasDesigntationError(true);
        }

        if (qtnPerPack === "" || qtnPerPack === null) {
            isValid = false;
            setQtnPerPackHP("Campo obrigatório");
            setHasQtnPerPackError(true);
        }
        else if (qtnPerPack <= 0) {
            isValid = false;
            setQtnPerPackHP("Tem de ser pelomenos 1");
            setHasQtnPerPackError(true);
        }

        if (norm === "" || norm === null) {
            setNormHP("Selecione uma norma");
            setHasNormError(true);
        }

        if (price === "" || price === null) {
            isValid = false;
            setPriceHP("Campo obrigatório");
            setHasPriceError(true);
        }

        return isValid;
    }

    const submit = (event: FormEvent) => {
        event.preventDefault();

        const form = event.target as HTMLFormElement;

        const designation: string = form.designation.value;
        const brandId: string = form.brand.getAttribute("data-id");
        const productRef: string = form.reference.value;
        const categoryId: string = form.category.getAttribute("data-id");
        const quantityPerPack: string = form.qtnPerPack.value;
        const measurementNormId: string = form.measureUnit.getAttribute("data-id");
        const price: string = form.price.value;
        const description: string = form.description.value;

        /*console.log("Brand", brandId);
        console.log("Category", categoryId);
        console.log("Norm", measurementNormId);

        console.log("1", designation);
        console.log("2", productRef);
        console.log("3", quantityPerPack);
        console.log("4", price);
        console.log("5", description);*/
        
        const isFormValid = validateForm(designation, quantityPerPack, measurementNormId, price);
        
        if (isFormValid) {
            console.log(true);
        } else {
            console.log(false);
        }
    }

    function imageUpload() {
        document.getElementById("image_upload")?.click();
    }

    function updateImageName(event: any) {
        let uploadedImageDisplay = document.getElementById('uploaded_image_display');
        
        const file = event.target.files[0];

        if (file) {
        // Create a FileReader to read the file as a blob
        const reader: FileReader = new FileReader();

        reader.onload = () => {
            // Convert the result to a blob
            if (!reader) { return; }
            const blob = new Blob([reader.result as ArrayBuffer], { type: file.type });
            console.log(blob);
            // Create a URL from the blob and set it as background image
      const imageUrl = URL.createObjectURL(blob);
      uploadedImageDisplay?.style.setProperty('background-image', `url(${imageUrl})`);
            setImageName(file.name);
        };

        // Read the file as a binary data
        reader.readAsArrayBuffer(file);
        }
    }

    return (
        <form onSubmit={submit}>
            <Grid
                container
                spacing={2}
            >
                <Grid item container xs={12} sm={4} md={3} justifyContent="center">
                    <Stack direction="column" spacing={2} style={{width: "100%", display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <div id="uploaded_image_display" style={{ width: "95%", height: "0",  paddingBottom: "95%", background: "url('https://sklep.elektrospark.pl/upload/1920/b2efcb49ed6fe51d587750688a86029cb269170d[1].jpg') no-repeat  center", backgroundSize: "cover" }}>
                            <img src="/static/as.jpg" style={{width: "100%", height: "100%"}}></img>
                        </div>
                        <div style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}}>
                            <FormHelperText id="image_name" style={{textAlign: "center"}}>{imageName}</FormHelperText>
                            <Button onClick={imageUpload}>Carregar imagem<input hidden type="file" /></Button>
                            <input type="file" id="image_upload" onChange={updateImageName} style={{display: "none"}} />
                            <FormHelperText style={{textAlign: "center"}}>Carregar .png ou .jpg e resolução ex: 256x256</FormHelperText>
                        </div>
                    </Stack>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                    <Stack spacing={2}>
                        <TextField
                            label="Designação"
                            id="outlined-size-small"
                            size="small"
                            name="designation"
                            error={hasDesignationError?true:false} helperText={hasDesignationError?designationHP:null}
                            onChange={() => { if (hasDesignationError) {setDesignationHP(null); setHasDesigntationError(false)} }}
                        />
                        <Stack direction={{ xs: "row", sm: "row" }} spacing={{ xs: 1, sm: 2 }}>
                            <BrandSelectBoxComponent name="brand" fullWidth sx={{ width: { xs: "100%", sm: "100%", md: "250px" } }}/>
                            {/*<IconButton sx={{width: { xs: "auto", sm: "auto" }}}><AddIcon /></IconButton>*/}
                        </Stack>
                        <Stack direction={{ xs: "column", sm: "column",  md: "row"}} spacing={{ xs: 1, sm: 1, md: 2 }}>
                            <TextField
                                label="Referência do produto"
                                id="outlined-size-small"
                                size="small"
                                sx={{width: { xs: "100%", sm: "100%", md: "250px" }}}
                                name="reference"
                                error={hasProductReferenceError?true:false} helperText={hasProductReferenceError?productReferenceHP:null}
                                onChange={() => { if (hasProductReferenceError) {setProductReferenceHP(null); setHasProductReferenceError(false)} }}
                            />
                            <Button disabled variant="contained" sx={{width: { xs: "100%", sm: "100%", md: "250px" }}}>Obter preço</Button>
                        </Stack>
                        <Stack direction={{ xs: "row", sm: "row" }} spacing={{ xs: 1, sm: 2 }}>
                            <CategorySelectBoxComponent name="category" sx={{ width: { xs: "100%", sm: "100%", md: "250px" } }}/>
                            {/*<IconButton sx={{width: { xs: "auto", sm: "auto" }}}><AddIcon /></IconButton>*/}
                        </Stack>
                        <Stack direction={{ xs: "column", sm: "column", md: "row" }} spacing={{ xs: 1, sm: 1, md: 2 }}>
                            <TextField
                                label="Qtn. por pack"
                                id="outlined-size-small"
                                size="small"
                                sx={{width: { xs: "100%", sm: "100%", md: "250px" }}}
                                name="qtnPerPack"
                                type="number"
                                defaultValue={1}
                                error={hasQtnPerPackError?true:false} helperText={hasQtnPerPackError?qtnPerPackHP:null}
                                onChange={() => { if (hasQtnPerPackError) {setQtnPerPackHP(null); setHasQtnPerPackError(false)} }}
                            />
                            <MeasureUnitNormSelectBoxComponent 
                                name="measureUnit" sx={{ width: { xs: "100%", sm: "100%", md: "250px" } }}
                                error={hasNormError?true:false} helperText={hasNormError?normHP:null}
                                onChange={() => { 
                                        if (hasNormError) {
                                            setNormHP(null); setHasNormError(false)
                                        }
                                    }
                                }
                            />
                        </Stack>
                        <Stack direction="column" spacing={{ xs: 0, sm: 0, md: 1 }}>
                            <Stack direction={{ xs: "column", sm: "column", md: "row" }} spacing={{ xs: 0, sm: 0, md: 1 }}>
                                <CurrencyTextFieldComponent
                                    name="price"
                                    label="Preço"
                                    value={0}
                                    sx={{width: { xs: "100%", sm: "100%", md: "250px" }}}
                                    error={hasPriceError?true:false} helperText={hasPriceError?priceHP:null}
                                    onChange={(event: any) => { 
                                            if (hasPriceError) {
                                                setPriceHP(null); setHasPriceError(false)
                                            }
                                            let value = event.target.value;
                                            updatePriceWithVat(parseFloat(value.replace(',','.').replace(' ','')));
                                        }
                                    }
                                />
                            </Stack>
                            <Stack direction="row" spacing={{ xs: 1, sm: 1 }}>
                                <Typography sx={{fontWeight: "bold"}} variant="body1">Preço final:</Typography>
                                <Typography variant="body1">{priceWithVat}€ c/Iva 23%</Typography>
                            </Stack>
                        </Stack>
                        
                        <TextField
                            id="outlined-multiline-static"
                            label="Descrição"
                            multiline
                            name="description"
                        />
                        <FormHelperText style={{marginBottom: "-10px"}}>Identificação do novo produto: 1</FormHelperText>
                        <Button type="submit" variant="contained" sx={{width: { xs: "100%", sm: "100%", md: "250px" }}}>Criar</Button>
                    </Stack>
                </Grid>                
            </Grid>
        </form>
    );
}