'use client'
import NewsTable from '../ui/table.js'
import OutlinedCard from '../ui/card.js'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import {useState} from 'react';
import { useSession, signIn, signOut } from "next-auth/react"


export default function Home() {
  const { sessionData: session, status } = useSession()
  const [data, setData] = useState([]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return(
      <>
      Not signed in <br/>
      <button onClick={() => signIn()}>Sign in</button>
      </>
    )
  }

  const updateData = (newData) => {
    let parsedData = []
    for (let i = 0; i < newData.data.length; i++) {
      parsedData[i] = {
        date: new Date(newData.data[i].published_at).toLocaleDateString(),
        title: newData.data[i].title,
        url: newData.data[i].url,
        domain: newData.data[i].source,
        keywords: newData.data[i].keywords.slice(0, 5),
        categories: newData.data[i].categories.join(', ')
      }
    }
    setData(parsedData);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={9}>
        <NewsTable data = {data}/>
        </Grid>
        <Grid size={3}>
        <OutlinedCard session = {session} data = {data} updateData = {updateData}/>
        </Grid>
      </Grid>
      <button onClick={() => signOut()}>Sign Out</button>
    </Box>
  );
}
