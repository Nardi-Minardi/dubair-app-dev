import { APP_NAME } from "./config";
import Cookies from 'js-cookie';
import { NextResponse } from "next/server";

const token_cookie_name = APP_NAME + "-token";

export function middleware(req) {
  const { pathname, origin } = req.nextUrl

  const tokenLogin = req.cookies.get(token_cookie_name)?.value
  // console.log('tokenLogin', tokenLogin)
  
  if(tokenLogin) {
    if(pathname == '/') {
      return NextResponse.redirect('/dubbing')
    }

    return NextResponse.next()
  } else {
    if(pathname == '/') {
      return NextResponse.next()
    }

    return NextResponse.rewrite(`${origin}/login`)
  }
  
  
}

export const config = {
  matcher: [
    '/account',
    '/archive',
    '/dubbing',
    '/dubbing/:path*', 
    '/export',
    '/minutes-available',
    '/sendMail',
    '/settings',
  ],
}