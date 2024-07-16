import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'

const Logo = ({link}) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div>
      <Link className="h-auto w-auto" href={link}>
        <img src={`/assets/images/logo${theme === 'dark' ? '-dark' : ''}.png`}
          width="250"
          height="250"
          alt="logo"
        />
      </Link>
    </div>
  )
}

export default Logo