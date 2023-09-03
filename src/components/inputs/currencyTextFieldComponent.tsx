'use client';

import { SxProps, TextField, InputAdornment } from "@mui/material";

function limitOneCommaKey(event: any) {
    const regexPattern = /^(?![\x08\u2190-\u2193]).$/;
    
    if (event.key === ',') {
        if (event.target.value.indexOf(',') > -1) {
            event.preventDefault();
        }
        else {
            return true;
        }
    }
    if (event.keyCode === 8 || event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40 || /^\d$/.test(event.key)) {
        return true;
    }
    else {
        event.preventDefault();
    }
}

function currencyFormat(event:any) {
    const input = event.target;

    let cursorStart = input.selectionStart;
    let cursorEnd = input.selectionEnd;
  
    let value = input.value;

    // Get the character that the user has just typed
    let matches = value.match(/\,/g);

    if (matches != null && matches.length == 2) {
        cursorEnd -= 1;
        cursorStart -= 1;
        return;
    }
  
    // Remove any non-numeric characters except for the first comma
    value = value.replace(/[^0-9,]/g, '');
        if (value.startsWith('0')) {
            value = value.replace(/^0+(?=\d)/, '');

            if (value !== '0') {
                cursorEnd -= 1;
                cursorStart -= 1;
            }
        }

  
    // Add '0' to the left of the comma if the comma is entered alone
    if (value === ',') {
      value = '0,00';
    }

    if (value === '0'){
        cursorStart = 1;
        cursorEnd = 1;
    }
  
    // Add '00' to the right of the comma if there is a comma without any number on the right
    if (value.endsWith(',')) {
      value += '00';
    }
    
    if (value.startsWith(',')) {
        value = '0' + value;
        cursorEnd =+ 1;
        cursorStart += 1;
    }
  
    // Split the value into integer and decimal parts
    const parts = value.split(',');
  
    // Ensure there are at most 2 decimal places
    if (parts.length > 1) {
      parts[1] = parts[1].slice(0, 2);
    }
  
    // Join the parts back together with a comma as the decimal separator
    value = parts.join(',');
  
    // Update the input value with the formatted result
    input.value = value;
  
    // Restore the cursor position
    input.setSelectionRange(cursorStart, cursorEnd);
}

export default function CurrencyTextFieldComponent({ sx, name, label, value, onChange, helperText, error }: { sx?: SxProps, name?: string, label?: string, value?: string | number, onChange?: any, helperText?: string | null, error?: boolean }) {
    return (
        <TextField
            label={label}
            id="outlined-size-small"
            size="small"
            sx={sx}
            name={name}
            defaultValue={0}
            InputProps={{
                endAdornment: <InputAdornment position="start">€ s/IVA</InputAdornment>
            }}
            onKeyDown={(event) => limitOneCommaKey(event)}
            onInput={(event) => currencyFormat(event)}
            onChange={onChange}
            helperText={helperText}
            error={error}
        />
    );
}