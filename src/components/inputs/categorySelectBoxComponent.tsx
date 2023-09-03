'use client';

import { SxProps, Autocomplete, TextField, Button, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function CategorySelectBoxComponent({ sx, name }: { sx?: SxProps, name?: string }) {
    const notify = () => {
        toast.success("Categoria criada!", { theme: "colored" });
    };

    const [newCategoryName, setNewCategoryName] = useState<string>('');
    const [hasNewCategoryNameError, setNewCategoryNameError] = useState<boolean>(false);
    const [newCategoryNameHelper, setNewCategoryNameHelper] = useState<string | null>();

    const [selectedCategoryOption, setSelectedCategoryOption] = useState<{ id: number, label: string, isButton: boolean } | null>(null);

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setNewCategoryNameError(false);
    };

    const [categories, setCategories] = useState<{ id: number, label: string, isButton: boolean }[]>([
        { id: -1, label: 'Nova categoria', isButton: true },
    ]);

    useEffect(() => {
        // Fetch data from the API and update state within useEffect
        fetch(process.env.API_BASE_URL + "api/categories")
        .then(promise => promise.json())
          .then((response) => {
            const responseJSON = response;
            let loadCategories: { id: number, label: string, isButton: boolean }[] = [];
            responseJSON.forEach((element: any) => {
              loadCategories.push({
                id: element.id,
                label: element.name,
                isButton: false
              });
            });
    
            setCategories([...categories, ...loadCategories]);
          })
          .catch(err => { console.log(err); });
    }, []);

    const createNewBrand = () => {
        fetch(process.env.API_BASE_URL + "api/categories", {
            method: "POST",
            body: JSON.stringify({
                name: newCategoryName
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(promise => promise.json())
        .then((data) => {
            const newCategoryResponse = data;
            const brandToAdd: { label: string; id: number, isButton: boolean } = { id: newCategoryResponse.id, label: newCategoryResponse.name, isButton: false };
            setCategories([...categories, brandToAdd]);
            notify();
            setSelectedCategoryOption(brandToAdd);
        })
        .catch(err => {
            console.log(err);
        })
    };

    const handleSubmit = () => {
        if (newCategoryName !== "") {
            const exists = categories.some(item => { return item.label.toLocaleLowerCase() === newCategoryName.toLocaleLowerCase()});

            if (!exists) {
                createNewBrand();
                setNewCategoryName('');
                setNewCategoryNameError(false);
                setOpen(false);
            }
            else {
                setNewCategoryNameError(true);
                setNewCategoryNameHelper("Já existe uma categoria com esse nome!");
            }
        }
        else {
            setNewCategoryNameError(true);
            setNewCategoryNameHelper("Preencha o campo acima");
        }
    };

    return (
        <div style={{width: "100%"}}>
            <Autocomplete
                sx={sx}
                disablePortal
                id="combo-box-demo"
                options={categories}
                onChange={(event, value) => setSelectedCategoryOption(value)}
                renderInput={(params) => <TextField {...params} inputProps={{...params.inputProps, "data-id": selectedCategoryOption?.id}} name={name} size="small" label="Categoria"/>}
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
                <DialogTitle>Criar uma nova categoria</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Após confirmar a nova categoria será adicionada a caixa de seleção.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nome da categoria"
                        type="text"
                        fullWidth
                        variant="outlined"
                        size='small'
                        onChange={e => {
                            setNewCategoryName(e.target.value);
                            setNewCategoryNameError(false);
                        }}
                        error={hasNewCategoryNameError?true:false} helperText={hasNewCategoryNameError?newCategoryNameHelper:null}
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