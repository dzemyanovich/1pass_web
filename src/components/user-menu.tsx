import * as React from 'react';
import { useSelector } from 'react-redux'

import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';

import { removeAuthToken } from '../utils/local-storage-manager';
import Icon from '@mui/material/Icon';
import Box from '@mui/material/Box';

export default function UserMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { username }: AdminData = useSelector((state: ReduxState) => state.adminData);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const signOut = () => {
    removeAuthToken();
    location.reload();
  }

  return (
    <div>
      <Button color="inherit" size="large" onClick={handleMenu}>
        <Box sx={{ m: 1, display: 'flex' }}>
          <AccountCircle  sx={{ mr: 1 }}/>
          {username}
        </Box>
      </Button>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={signOut}>Sign out</MenuItem>
      </Menu>
    </div>
  );
}
