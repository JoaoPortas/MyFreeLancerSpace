'use client';

import { Autocomplete, TextField, SxProps, Button, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText } from "@mui/material";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function MeasureUnitNormSelectBoxComponent({ sx }: { sx?: SxProps }) {
    const notify = () => {
        toast.success("Norma de medida criada!", { theme: "colored" });
    };

    const [newNormName, setNewNormName] = useState<string>('');
    const [hasNewNormNameError, setNewNormNameError] = useState<boolean>(false);
    const [newNormNameHelper, setNewNormNameHelper] = useState<string | null>();

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setNewNormNameError(false);
    };

    const [norms, setNorms] = useState<{ id: number, label: string, isButton: boolean }[]>([
        { id: -1, label: 'Nova norma', isButton: true },
    ]);

    useEffect(() => {
        // Fetch data from the API and update state within useEffect
        fetch(process.env.API_BASE_URL + "api/norms")
          .then(async (response) => {
            const responseJSON = await response.json();
            let loadNorms: { id: number, label: string, isButton: boolean }[] = [];
            responseJSON.forEach((element: any) => {
                loadNorms.push({
                id: element.id,
                label: element.name,
                isButton: false
              });
            });
    
            setNorms([...norms, ...loadNorms]);
          })
          .catch(err => { console.log(err); });
    }, []);

    const createNewNorm = async () => {
        fetch(process.env.API_BASE_URL + "api/norms", {
            method: "POST",
            body: JSON.stringify({
                name: newNormName
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(async (data) => {
            const newCategoryResponse = await data.json();
            const normToAdd: { label: string; id: number, isButton: boolean } = { id: newCategoryResponse.id, label: newCategoryResponse.name, isButton: false };
            setNorms([...norms, normToAdd]);
            notify();
        })
        .catch(err => {
            console.log(err);
        })
    };

    const handleSubmit = () => {
        if (newNormName !== "") {
            const exists = norms.some(item => { return item.label.toLocaleLowerCase() === newNormName.toLocaleLowerCase()});

            if (!exists) {
                createNewNorm();
                setNewNormName('');
                setNewNormNameError(false);
                setOpen(false);
            }
            else {
                setNewNormNameError(true);
                setNewNormNameHelper("Já existe uma norma com esse nome!");
            }
        }
        else {
            setNewNormNameError(true);
            setNewNormNameHelper("Preencha o campo acima");
        }
    };

    const brands = [
        { label: 'Nova norma', id: -1, isButton: true },
        { label: 'Un.', id: 1 },
        { label: 'M', id: 2 },
        { label: 'Km', id: 3 },
      ];

    return (
        <div style={{width: "auto"}}>
            <Autocomplete
                sx={sx}
                disablePortal
                id="combo-box-demo"
                options={norms}
                onChange={(event, value) => console.log(value)}
                renderInput={(params) => <TextField {...params} size="small" label="Norma de medida"/>}
                renderOption={(props, option) => {
                    if (option.isButton) {
                        return (
                            <li {...props} key={option.label} onClick={handleClickOpen}>
                            <Button fullWidth>{option.label}</Button>
                            </li>
                        );
                    }
                    return (
                    <li {...props} key={option.label}>
                        {option.label}
                    </li>
                    );
                }}
            />
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Criar uma nova norma</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Após confirmar a nova norma será adicionada a caixa de seleção.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nome da norma"
                        type="text"
                        fullWidth
                        variant="outlined"
                        size='small'
                        onChange={e => {
                            setNewNormName(e.target.value);
                            setNewNormNameError(false);
                        }}
                        error={hasNewNormNameError?true:false} helperText={hasNewNormNameError?newNormNameHelper:null}
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