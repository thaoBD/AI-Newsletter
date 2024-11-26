import Table from './ui/table.js'
import OutlinedCard from './ui/card.js'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';

export const metadata = {
  title: 'NewsApp',
}

export default function App() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={9}>
        <Table/>
        </Grid>
        <Grid size={3}>
        <OutlinedCard/>
        </Grid>
      </Grid>
    </Box>
  );
}
