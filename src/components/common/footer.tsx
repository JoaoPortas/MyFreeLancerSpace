'use client';

import { Box, Container, Paper, Typography } from "@mui/material";

export default function Footer() {
    return (
      <Paper sx={{marginTop: 'calc(10% + 60px)',
      width: '100%',
      position: 'fixed',
      bottom: 0
      }} component="footer" square variant="outlined">
        <Container maxWidth="lg">
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "center",
              display: "flex",
              my:1
            }}
          >
              <div>
              {/*<img src="/Logo.svg" width={75} height={30} alt="Logo" />*/}
              <Typography variant="subtitle2">By JPortas | <a href="/pt/home">PT</a> | <a href="/en/home">EN</a> </Typography>
              </div>
          </Box>
  
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "center",
              display: "flex",
              mb: 2,
            }}
          >
            <Typography variant="caption" color="initial">
              Copyright ©2023. [] Limited
            </Typography>
          </Box>
        </Container>
      </Paper>
    );
  }