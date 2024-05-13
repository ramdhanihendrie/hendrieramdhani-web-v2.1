import { auth } from '@/lib/auth';
import { AUTH_ROUTES, DASHBOARD_ROUTES, LOGIN_ROUTES, PUBLIC_ROUTES } from '@/lib/route';


export default auth((req) => {
  const { nextUrl } = req;

  const isAuthenticated = !!req.auth;
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);
  const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname);
  
  if (isAuthRoute && isAuthenticated)
		return Response.redirect(new URL(DASHBOARD_ROUTES, nextUrl));

  // if (isPublicRoute && isAuthenticated)
	// 	return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl));

	if (!isAuthenticated && !isPublicRoute)
		return Response.redirect(new URL(LOGIN_ROUTES, nextUrl));
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};