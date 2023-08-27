'use client';

import { Autocomplete, TextField, SxProps, Button } from "@mui/material";
import { useState } from "react";

export default function MeasureUnitNormSelectBoxComponent({ sx }: { sx?: SxProps }) {
    const brands = [
        { label: 'Nova norma', id: -1, isButton: true },
        { label: 'Un.', id: 1 },
        { label: 'M', id: 2 },
        { label: 'Km', id: 3 },
      ];

    return (
        <Autocomplete
            sx={sx}
            disablePortal
            id="combo-box-demo"
            options={brands}
            onChange={(event, value) => console.log(value)}
            renderInput={(params) => <TextField {...params} size="small" label="Norma de medida"/>}
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