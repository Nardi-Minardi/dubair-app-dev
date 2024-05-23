import React from 'react'
import Head from 'next/head'

const AdminLayout = ({ children, title }) => {
  return (
    <React.Fragment>
      <Head >
        <title>{title}</title>
      </Head>
      <main>{children}</main>
    </React.Fragment>
  )
}

export default AdminLayout