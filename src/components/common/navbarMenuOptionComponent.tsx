import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';

export default function NavbarMenuOptionComponent({ text, type, subOptions }: { text: string, type: string, subOptions?: null | { key: string, href: string, name: string }[] }) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{ my: 2, color: 'white', display: 'block' }}
            >
                { text }
            </Button>
            {type === "multiOptions" && (
                
				<Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                            'aria-labelledby': 'basic-button',
                    }}
                >
                    {subOptions?.map((opt) => (
                        <MenuItem component={Link} href={opt.href} key={opt.name} onClick={handleClose}>{opt.name}</MenuItem>
                    ))}
                </Menu>
            )}
            
        </Box>
    );
}