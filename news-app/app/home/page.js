'use client'
import NewsTable from '../ui/table.js'
import OutlinedCard from '../ui/card.js'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import {useState} from 'react';
import { useSession, signIn, signOut, SessionProvider } from "next-auth/react"


export default function Home() {
  const { sessionData: session, status } = useSession()
  const [data, setData] = useState([]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  
  if (!session) {
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
        domain: newData.data[i].source,
        keywords: newData.data[i].keywords.slice(0, 5),
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
        <OutlinedCard data = {data} updateData = {updateData}/>
        </Grid>
      </Grid>
    </Box>
  );
}
