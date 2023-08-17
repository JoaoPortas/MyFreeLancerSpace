import { SwipeableDrawer, List, ListItemButton, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function LeftDrawerMenuComponent({ isOpen, setIsDrawerOpenFunction } : { isOpen: boolean, setIsDrawerOpenFunction: any }) {
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(isOpen);

      const toggleDrawer = (open: boolean) => (event: any) => {
        handleCloseDrawer();
        if (
          event &&
          event.type === 'keydown' &&
          (event.key === 'Tab' || event.key === 'Shift')
        ) {
          return;
        }
    
        setIsDrawerOpen(open);
      };

    useEffect(() => {
        setIsDrawerOpen(isOpen);
    }, [isOpen]);

    const handleCloseDrawer = () => {
        setIsDrawerOpen(false);
        setIsDrawerOpenFunction(false);
    };

    return (
        <SwipeableDrawer PaperProps={{sx: { width: "300px" },}} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)} open={isDrawerOpen} /* onClose={handleCloseDrawer} */>
            <List>
                <ListItemButton>
                    <ListItemText>Produtos</ListItemText>
                </ListItemButton>
                <ListItemButton>
                    <ListItemText>Produtos</ListItemText>
                </ListItemButton>
                <ListItemButton>
                    <ListItemText>Produtos</ListItemText>
                </ListItemButton>
                <ListItemButton>
                    <ListItemText>Produtos</ListItemText>
                </ListItemButton>
                <ListItemButton>
                    <ListItemText>Produtos</ListItemText>
                </ListItemButton>
                <ListItemButton>
                    <ListItemText>Produtos</ListItemText>
                </ListItemButton>
                <ListItemButton>
                    <ListItemText>Produtos</ListItemText>
                </ListItemButton>
                <ListItemButton>
                    <ListItemText>Produtos</ListItemText>
                </ListItemButton>
                <ListItemButton>
                    <ListItemText>Produtos</ListItemText>
                </ListItemButton>
                <ListItemButton>
                    <ListItemText>Produtos</ListItemText>
                </ListItemButton>
                <ListItemButton>
                    <ListItemText>Produtos</ListItemText>
                </ListItemButton>
                <ListItemButton>
                    <ListItemText>Produtos</ListItemText>
                </ListItemButton>
                <ListItemButton>
                    <ListItemText>Produtos</ListItemText>
                </ListItemButton>
                <ListItemButton>
                    <ListItemText>Produtos</ListItemText>
                </ListItemButton>
                <ListItemButton>
                    <ListItemText>Produtos</ListItemText>
                </ListItemButton>
                <ListItemButton>
                    <ListItemText>Produtos</ListItemText>
                </ListItemButton>
                <ListItemButton>
                    <ListItemText>Produtos</ListItemText>
                </ListItemButton>
                <ListItemButton>
                    <ListItemText>Produtos</ListItemText>
                </ListItemButton>
                <ListItemButton>
                    <ListItemText>Produtos</ListItemText>
                </ListItemButton>
                <ListItemButton>
                    <ListItemText>Produtos</ListItemText>
                </ListItemButton>
                <ListItemButton>
                    <ListItemText>Produtos</ListItemText>
                </ListItemButton>
                <ListItemButton>
                    <ListItemText>Produtos</ListItemText>
                </ListItemButton>
                <ListItemButton>
                    <ListItemText>Produtos</ListItemText>
                </ListItemButton>
                <ListItemButton>
                    <ListItemText>Produtos</ListItemText>
                </ListItemButton>
                <ListItemButton>
                    <ListItemText>Produtos</ListItemText>
                </ListItemButton>
                <ListItemButton>
                    <ListItemText>Produtos</ListItemText>
                </ListItemButton>
                <ListItemButton>
                    <ListItemText>Produtos</ListItemText>
                </ListItemButton>
                <ListItemButton>
                    <ListItemText>Produtos</ListItemText>
                </ListItemButton>
                <ListItemButton>
                    <ListItemText>Produtos</ListItemText>
                </ListItemButton>
                <ListItemButton>
                    <ListItemText>Produtos</ListItemText>
                </ListItemButton>
            </List>
        </SwipeableDrawer>
    );
}