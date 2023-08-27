'use client';

import { SxProps, Autocomplete, TextField, Button } from "@mui/material";

export default function CategorySelectBoxComponent({ sx }: { sx?: SxProps }) {
    const brands = [
        { label: 'Nova categoria', id: -1, isButton: true },
        { label: 'Dij.', id: 1 },
        { label: 'Quadros', id: 2 },
        { label: 'Aparelhagens', id: 3 },
      ];

    return (
        <Autocomplete
            sx={sx}
            disablePortal
            id="combo-box-demo"
            options={brands}
            onChange={(event, value) => console.log(value)}
            renderInput={(params) => <TextField {...params} size="small" label="Categoria"/>}
            renderOption={(props, option) => {
                if (option.isButton) {
                    return (
                        <li {...props} key={option.label} onClick={() => {console.log("Hello world");}}>
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
    );
}