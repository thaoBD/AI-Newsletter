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

async function newsPOST(req) {
  try {const response = await fetch('/api/news', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req),
    })
    return await response.json()
  } catch (error) {console.error('Error fetching data:', error);}
}

async function databasePOST(req) {
  try {const response = await fetch('/api/database', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req),
    })
    return await response.json()
  } catch (error) {console.error('Error fetching data:', error);}
}

export default function OutlinedCard({data, updateData}) {
  const [keyInput, setKeyInput] = useState('');
  const [domainInput, setDomainInput] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [domains, setDomains] = useState([]);
  const [emailToggle, setEmailToggle] = useState(false);
  const [textToggle, setTextToggle] = useState(false);

  // Handle Toggles
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
    if (e.key === 'Enter' && input !== '') {
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
  const handleFilter = async (event) => {
    // Prevent default form submission
    event.preventDefault();
    const res = await newsPOST({
      keywords: keywords,
      domains: domains,
    })
    updateData(res)
  };

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
        <Button size="small" onClick={handleFilter} >Apply Filter</Button>
        <Button size="small" disabled>Save</Button>
      </CardActions>
      
      </FormGroup></React.Fragment></Card>
    </Box>
  );
}