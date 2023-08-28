import * as React from 'react';
import { useSelector } from 'react-redux'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import UserMenu from '../components/user-menu';

export default function BottomBar() {
  // todo: do not use any
  const { sportObject }: AdminData = useSelector((state: any) => state.adminData);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {sportObject.name}
          </Typography>
          <UserMenu />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
