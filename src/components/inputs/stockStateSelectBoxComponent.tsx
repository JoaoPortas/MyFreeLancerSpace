'use client';

import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, SelectProps, Stack, SxProps, FormHelperText } from "@mui/material";
import { useState } from "react";
import CircleIcon from '@mui/icons-material/Circle';

export default function StockStateSelectBoxComponent({sx, props, onChange, error, helperText}: {sx?: SxProps, props?: SelectProps<any>, onChange?: any, helperText?: string | null, error?: boolean}) {
    const [category, setCategory] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setCategory(event.target.value);
    };

    return (
        <FormControl sx={sx} size="small" error={error}>
            <InputLabel id="demo-simple-select-label">Estado do stock</InputLabel>
            <Select
                {...props}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="Estado do stock"
                onChange={(e) => {
                    handleChange(e);
                    onChange();
                }}
                size="small"
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value={"available"}>
                    <Stack direction="row" spacing={1} style={{marginBottom: "-1px"}}>
                        <CircleIcon style={{color: "green", width: "16px"}} />
                        <label>Disponível</label>
                    </Stack>  
                </MenuItem>
                <MenuItem value={"unconfirmed"}>
                    <Stack direction="row" spacing={1} style={{marginBottom: "-1px"}}>
                        <CircleIcon style={{color: "orange", width: "16px"}} />
                        <label>Confirmar</label>
                    </Stack>  
                </MenuItem>
                <MenuItem value={"unavailable"}>
                    <Stack direction="row" spacing={1} style={{marginBottom: "-1px"}}>
                        <CircleIcon style={{color: "red", width: "16px"}} />
                        <label>Indisponível</label>
                    </Stack>  
                </MenuItem>
            </Select>
            <FormHelperText sx={{display: error? "block":"none"}} error={error}>{helperText}</FormHelperText>
        </FormControl>
    );
}