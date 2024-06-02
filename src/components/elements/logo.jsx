import React from 'react'
import Link from 'next/link'

const Logo = () => {
  return (
    <div>
      <Link className="h-auto w-auto" href="/login">
        <img src={'/assets/images/logo.svg'} alt="logo"
        />
      </Link>
    </div>
  )
}

export default Logo