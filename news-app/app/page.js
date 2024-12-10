'use client'
import Table from './ui/table.js'
import OutlinedCard from './ui/card.js'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import {useState} from 'react';

export default function App() {
  const [data, setData] = useState('');

  const updateData = (newData) => {
    setData(newData);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={9}>
        <Table data = {data}/>
        </Grid>
        <Grid size={3}>
        <OutlinedCard data = {data} updateData = {updateData}/>
        </Grid>
      </Grid>
    </Box>
  );
}
