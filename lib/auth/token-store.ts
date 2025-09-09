// Simple in-memory store for reset tokens (in production, use Redis or database)
export const resetTokens = new Map<string, { email: string; expiresAt: number }>();

export function cleanupExpiredTokens() {
  const now = Date.now();
  for (const [token, data] of resetTokens.entries()) {
    if (data.expiresAt < now) {
      resetTokens.delete(token);
    }
  }
}