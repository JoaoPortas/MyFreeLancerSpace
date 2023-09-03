'use client';

import { Button, Autocomplete, TextField, SxProps, Dialog, DialogTitle, DialogContentText, DialogActions, DialogContent } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function BrandSelectBoxComponent({ sx, fullWidth = false, name }: { sx?: SxProps, fullWidth?: boolean, name?: string }) {
    const notify = () => {
        toast.success("Marca criada!", { theme: "colored" });
    };
    
    const [newBrandName, setNewbrandName] = useState('');
    const [selectedOption, setSelectedOption] = useState<{ label: string; id: number, isButton: boolean } | null>(null);
    const [hasNewBrandError, setNewBrandError] = useState<boolean>(false);
    const [newBrandNameHelperText, setNewBrandNameHelperText] = useState<string | null>(null);

    const [brands, setBrands] = useState<{ label: string, id: number, isButton: boolean }[]>([
        { label: 'Nova marca', id: -1, isButton: true },
    ]);

    useEffect(() => {
        // Fetch data from the API and update state within useEffect
        fetch(process.env.API_BASE_URL + "api/brands")
        .then(promise => promise.json())
          .then((response) => {
            const responseJSON = response;
            let loadBrands: { label: string; id: number; isButton: boolean }[] = [];
            responseJSON.forEach((element: any) => {
              loadBrands.push({
                label: element.name,
                id: element.id,
                isButton: false
              });
            });
    
            setBrands([...brands, ...loadBrands]);
          })
          .catch(err => { console.log(err); });
      }, []); 

    const handleAddNewBrand = () => {
        fetch(process.env.API_BASE_URL + "api/brands", {
            method: "POST",
            body: JSON.stringify({
                name: newBrandName
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(promise => promise.json())
        .then((data) => {
            const newBrandResponse = data;
            const brandToAdd: { label: string; id: number, isButton: boolean } = { label: newBrandResponse.name, id: newBrandResponse.id, isButton: false };
            setBrands([...brands, brandToAdd]);
            notify();
            setSelectedOption(brandToAdd);
        })
        .catch(err => {
            console.log(err);
        })
    };

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setNewBrandError(false);
    };

    const handleSubmit = () => {
        if (newBrandName !== "") {
            const exists = brands.some(item => { return item.label.toLocaleLowerCase() === newBrandName.toLocaleLowerCase()});

            if (!exists) {
                handleAddNewBrand();
                setNewbrandName('');
                setNewBrandError(false);
                setOpen(false);
            }
            else {
                setNewBrandError(true);
                setNewBrandNameHelperText("Já existe uma marca com esse nome!");
            }
        }
        else {
            setNewBrandError(true);
            setNewBrandNameHelperText("Preencha o campo acima");
        }
    };
    
    return (
        <div style={{width: "100%"}}>
            <Autocomplete
                fullWidth={fullWidth}
                sx={sx}
                disablePortal
                key={1}
                id="combo-box-demo"
                options={brands}
                onChange={(event, value) => setSelectedOption(value)}
                renderInput={(params) => <TextField {...params} inputProps={{...params.inputProps, "data-id": selectedOption?.id}} name={name} size="small" label="Marca"/>}
                renderOption={(props, option) => {
                    if (option.isButton) {
                        return (
                            <li {...props} key={option.label} onClick={handleClickOpen}>
                                <Button fullWidth>{option.label}</Button>
                            </li>
                        );
                    }
                    return (
                    <li {...props} key={`${option.label}_${option.id}`}>
                        {option.label}
                    </li>
                    );
                }}
            />

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Criar uma nova marca</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Após confirmar a nova marca será adicionada a caixa de seleção.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nome da marca"
                        type="text"
                        fullWidth
                        variant="outlined"
                        size='small'
                        onChange={e => {
                            setNewbrandName(e.target.value);
                            setNewBrandError(false);
                        }}
                        error={hasNewBrandError?true:false} helperText={hasNewBrandError?newBrandNameHelperText:null}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleSubmit}>Adicionar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}