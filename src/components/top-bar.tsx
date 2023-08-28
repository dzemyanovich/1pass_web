import * as React from 'react';
import { useSelector } from 'react-redux'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import UserMenu from './user-menu';

export default function TopBar() {
  // todo: do not use any
  const { sportObject }: AdminData = useSelector((state: any) => state.adminData);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {sportObject.name}
          </Typography>
          <UserMenu />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
