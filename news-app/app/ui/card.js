import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const card = (
  <React.Fragment>

    <CardContent>
    <Typography gutterBottom variant="h6" component="div">FILTERS</Typography>

    <Box>
      <Typography gutterBottom variant="h6" component="div">Tags</Typography>
      <Box sx={{ width: 500, maxWidth: '100%' }}>
        <TextField fullWidth label="fullWidth" id="fullWidth" />
      </Box>
      <Stack direction="row" spacing={2}>
      <Button variant="contained">Contained</Button>
      <Button variant="contained">Contained</Button>
      </Stack>
    </Box>

    <Box>
      <Typography gutterBottom variant="h6" component="div">Websites</Typography>
      <Box sx={{ width: 500, maxWidth: '100%' }}>
        <TextField fullWidth label="fullWidth" id="fullWidth" />
      </Box>
      <Stack direction="row" spacing={2}>
      <Button variant="contained">Contained</Button>
      <Button variant="contained">Contained</Button>
      </Stack>
    </Box>

    <Box>
      <Typography gutterBottom variant="h6" component="div">Subscription</Typography>
      <FormGroup>
        <FormControlLabel control={<Switch/>} label="Email" />
        <FormControlLabel control={<Switch/>} label="Text" />
      </FormGroup>
    </Box>
    </CardContent>

    <CardActions>
      <Button size="small">Apply Filter</Button>
      <Button size="small" disabled>Save</Button>
    </CardActions>

  </React.Fragment>
);

export default function OutlinedCard() {
  return (
    <Box sx={{ minWidth: 275, backgroundColor: '#6573C3'}}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}