import { type NextRequest } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';
import { applySecurityHeaders } from '@/utils/security/headers';

export async function middleware(request: NextRequest) {
  const response = await updateSession(request);

  // Apply security headers to all responses
  return applySecurityHeaders(response);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
