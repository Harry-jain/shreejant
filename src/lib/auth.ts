import { NextRequest } from 'next/server';

const ADMIN_SECRET = process.env.ADMIN_SECRET || process.env.ADMIN_API_SECRET || "shreejan_secure_admin_2026";

/**
 * Validates whether the incoming request is from an authenticated admin.
 * Checks:
 * 1. Authorization header: "Bearer <token>"
 * 2. Custom header: "x-admin-key: <token>"
 * 3. Cookie: "admin_token=<token>"
 */
export function isAuthorizedAdmin(request: NextRequest): boolean {
  // 1. Authorization header
  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7).trim();
    if (token === ADMIN_SECRET) return true;
  }

  // 2. Custom header
  const adminKey = request.headers.get('x-admin-key');
  if (adminKey && adminKey.trim() === ADMIN_SECRET) {
    return true;
  }

  // 3. Cookie check
  const cookie = request.cookies.get('admin_token')?.value;
  if (cookie && cookie.trim() === ADMIN_SECRET) {
    return true;
  }

  return false;
}
