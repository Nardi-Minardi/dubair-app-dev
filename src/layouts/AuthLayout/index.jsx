import React from 'react'
import Head from 'next/head'
import { ThemeProvider } from "next-themes"

const AuthLayout = ({ children, title }) => {
  return (
    <React.Fragment>
      <Head >
        <title>{title}</title>
      </Head>
      <main>
        {children}
      </main>
    </React.Fragment>
  )
}

export default AuthLayout