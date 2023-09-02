import * as React from 'react';

import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';

export default function SplashScreen() {
  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%' }}>
          <Skeleton width="100%">
            <Typography>.</Typography>
          </Skeleton>
        </Box>
        <Box sx={{ margin: 1 }}>
          <Skeleton variant="circular">
            <Avatar />
          </Skeleton>
        </Box>
      </Box>
      <Table size="medium" sx={{ mt: 2 }}>
        <TableBody>
          {[...Array(6)].map((value: number, index: number) => (
            <TableRow key={`${value}${index}`}>
              <TableCell><Skeleton /></TableCell>
              <TableCell><Skeleton /></TableCell>
              <TableCell><Skeleton /></TableCell>
              <TableCell><Skeleton /></TableCell>
              <TableCell><Skeleton /></TableCell>
              <TableCell><Skeleton /></TableCell>
              <TableCell><Skeleton /></TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={7}>
              <Box sx={{ display: 'flex', alignItems: 'left' }}>
                <Skeleton variant="circular" width={10} height={10} sx={{ mr: 1 }} />
                <Skeleton variant="circular" width={10} height={10} sx={{ mr: 1 }} />
                <Skeleton variant="circular" width={10} height={10} sx={{ mr: 1 }} />
              </Box>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
