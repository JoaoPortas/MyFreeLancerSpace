'use client';

import { Button, FormControl, InputLabel, ListSubheader, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";

export default function CategorySelectBoxComponentCopy() {
    const [category, setCategory] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setCategory(event.target.value);
    };

    return (
        <FormControl sx={{width: { xs: "100%", sm: "250px" }}} size="small">
                            <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={category}
                                label="Category"
                                onChange={handleChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <ListSubheader><Button fullWidth>Nova categoria</Button></ListSubheader>
                                <MenuItem value={10}>Dij</MenuItem>
                                <MenuItem value={20}>Y</MenuItem>
                                <MenuItem value={30}>Z</MenuItem>
                            </Select>
                        </FormControl>
    );
}