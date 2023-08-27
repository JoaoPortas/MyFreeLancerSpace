'use client';

import { Button, Autocomplete, TextField, SxProps, Dialog, DialogTitle, DialogContentText, DialogActions, DialogContent } from "@mui/material";
import { useState } from "react";

export default function BrandSelectBoxComponent({ sx, fullWidth = false }: { sx?: SxProps, fullWidth?: boolean }) {
    const [newBrandName, setNewbrandName] = useState('');
    const [selectedOption, setSelectedOption] = useState<{ label: string; id: number, isButton: boolean } | null>(null);

    const [brands, setBrands] = useState<{ label: string; id: number, isButton: boolean }[]>([
        { label: 'Nova marca', id: -1, isButton: true },
        { label: 'Legrand', id: 1, isButton: false },
        { label: 'Efapel', id: 2, isButton: false },
        { label: 'JBL', id: 3, isButton: false },
      ]);

      const handleAddNewBrand = () => {
        const brandToAdd: { label: string; id: number, isButton: boolean } = { label: newBrandName, id: 4, isButton: false };
        setBrands([...brands, brandToAdd]);
        setSelectedOption(brandToAdd);
      };
    const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    handleAddNewBrand();
  };

    

    
    return (
        <div>
            <Autocomplete
            fullWidth={fullWidth}
            sx={sx}
            disablePortal
            key={1}
            id="combo-box-demo"
            options={brands}
            onChange={(event, value) => console.log(value)}
            renderInput={(params) => <TextField {...params} size="small" label="Marca"/>}
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
        <DialogTitle>Criar uma nova marca</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Após confirmar a nova marca será adicionada a caixa de seleção.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            onChange={e => {
                setNewbrandName(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleClose}>Adicionar</Button>
        </DialogActions>
      </Dialog>
        </div>
    );
}