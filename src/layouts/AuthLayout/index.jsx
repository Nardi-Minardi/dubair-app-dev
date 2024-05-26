import React from 'react'
import Head from 'next/head'
import { ThemeProvider } from "next-themes"

const AuthLayout = ({ children, title }) => {
  return (
    <ThemeProvider attribute="class">
      <Head >
        <title>{title}</title>
      </Head>
      <main>
        {children}
      </main>
    </ThemeProvider>
  )
}

export default AuthLayout