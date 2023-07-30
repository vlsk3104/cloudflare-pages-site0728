import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ]
}

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('Authorization');

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];

    const [user, password] = Buffer.from(authValue, 'base64').toString('utf8').split(':')

    if (
      user === process.env.BASIC_AUTH_NAME &&
      password === process.env.BASIC_AUTH_PASSWORD
    ) {
      return NextResponse.next();
    }

    return NextResponse.json(
      { error: 'Invalid credentials' },
      { headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' }, status: 401 }
    );
  } else {
    return NextResponse.json(
      { error: 'Please enter credentials' },
      { headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' }, status: 401 }
    );
  }
}
