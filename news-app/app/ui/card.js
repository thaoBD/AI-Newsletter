'use client'
import {useState} from 'react';
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
// use api routes

export default function OutlinedCard() {
  const [keyInput, setKeyInput] = useState('');
  const [domainInput, setDomainInput] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [domains, setDomains] = useState([]);
  const [emailToggle, setEmailToggle] = useState(false);
  const [textToggle, setTextToggle] = useState(false);
  const [results, setResults] = useState([]);

  const handleEmailToggleChange = () => {
    setEmailToggle(prevState => !prevState);
  };

  const handleTextToggleChange = () => {
    setTextToggle(prevState => !prevState);
  };

  // Handle Keywords
  const handleKeyInputChange = (e) => {
    setKeyInput(e.target.value);
  };

  const handleAddKeyword = (e) => {
    var input = keyInput.trim()
    if (e.key === 'Enter' && input.trim() !== '') {
      setKeywords((prevKeywords) => prevKeywords.includes(input) ? prevKeywords : [...prevKeywords, input]);
      setKeyInput('');
    }
  };

  const handleRemoveKeyword = (keyword) => {
    setKeywords((prevKeywords) =>
      prevKeywords.filter((item) => item !== keyword)
    );
  };

  // Handle Domains
  const handleDomainInputChange = (e) => {
    setDomainInput(e.target.value);
  };

  const handleAddDomain = (e) => {
    var input = domainInput.trim()
    if (e.key === 'Enter' && input !== '') {
      setDomains((prevDomains) => prevDomains.includes(input) ? prevDomains : [...prevDomains, input]);
      setDomainInput('');
    }
  };

  const handleRemoveDomain = (domain) => {
    setDomains((prevDomains) =>
      prevDomains.filter((item) => item !== domain)
    );
  };

  // Handle Form Submission
  const handleSubmit = (event) => {
    // Prevent default form submission
    event.preventDefault();
    console.log('Tags:', keywords);
    console.log('Domains:', domains);
    console.log('Email:', emailToggle);
    console.log('text:', textToggle);
  };

  // const handleSearch = async () => {
  //   try {
  //     const response = await fetch('https://your-api-endpoint.com/search', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ keywords }),
  //     });
  //     const data = await response.json();
  //     console.log('API response:', data); // Handle the API response as needed
  //   } catch (error) {
  //     console.error('Error sending data to API:', error);
  //   }
  // };


  return (
    <Box sx={{ minWidth: 275, backgroundColor: '#6573C3'}}>
      <Card variant="outlined"><React.Fragment><FormGroup>
      
      <CardContent>

      <Typography gutterBottom variant="h6" component="div">FILTERS</Typography>

      {/* Tags Section */}
      <Box>
        <Typography gutterBottom variant="h6" component="div">Tags</Typography>

        <Box sx={{ width: 500, maxWidth: '100%' }}>
          <TextField 
          label="search tags"
          type="text"
          value={keyInput}
          onChange={handleKeyInputChange}
          onKeyDown={handleAddKeyword}
          placeholder="Enter Keywords Here"/>
        </Box>

        <Stack direction="row" spacing={2}>
          {keywords.map((keyword, index) => (
            <Button 
            variant="contained"
            key={index}
            onClick={() => handleRemoveKeyword(keyword)}
            >{keyword}
            </Button>
          ))}
        </Stack>

      </Box>
      
      {/* Domains Section */}
      <Box>
        <Typography gutterBottom variant="h6" component="div">Domains</Typography>

        <Box sx={{ width: 500, maxWidth: '100%' }}>
          <TextField 
          label="search domains"
          type="text"
          value={domainInput}
          onChange={handleDomainInputChange}
          onKeyDown={handleAddDomain}
          placeholder="Enter Domains Here"/>
        </Box>

        <Stack direction="row" spacing={2}>
          {domains.map((domain, index) => (
            <Button 
            variant="contained"
            key={index}
            onClick={() => handleRemoveDomain(domain)}
            >{domain}
            </Button>
          ))}
        </Stack>

      </Box>
      
      {/* Subscription Section */}
      <Box>
        <Typography gutterBottom variant="h6" component="div">Subscription</Typography>
          <FormControlLabel
          control={<Switch/>}
          label="Email"
          onChange={handleEmailToggleChange}
          />
          <FormControlLabel
          control={<Switch/>}
          label="Text"
          onChange={handleTextToggleChange}
          />
      </Box>
      
      </CardContent>
      
      {/* Submission Section */}
      <CardActions>
        <Button size="small" onClick={handleSubmit} >Apply Filter</Button>
        <Button size="small" disabled>Save</Button>
      </CardActions>
      
      </FormGroup></React.Fragment></Card>
    </Box>
  );
}