export async function requireAdmin() {
  return { user: { name: "Admin", email: "admin@toheedglass.com", role: "ADMIN" } };
}

