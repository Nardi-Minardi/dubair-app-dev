import { NextResponse } from "next/server";
import { store } from '@/store/store'

export function middleware(req) {
  const { pathname, origin } = req.nextUrl

  //get token from locastorage redux persist
  const state = store.getState();
  const token = state.rootSlice?.auth.token;
  console.log('token', token)
  // const tokenLogin = JSON.parse(token).rootSlice.auth.token
  // console.log('tokenLogin', tokenLogin)
  
  if(token) {
    if(pathname == '/') {
      return NextResponse.redirect('/dubbing')
    }

    return NextResponse.next()
  } else {
    if(pathname == '/login') {
      return NextResponse.next()
    }

    return NextResponse.rewrite(`${origin}/`)
  }
  
  
}

export const config = {
  matcher: ['/dubbing/:path*'],
}