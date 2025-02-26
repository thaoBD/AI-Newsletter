'use client'

import { SessionProvider } from "next-auth/react"
import Home from './home/page.js';

export default function App() {
    return(
    <SessionProvider>
        <Home/>
    </SessionProvider>
    )
}