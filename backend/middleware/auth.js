export function adminOnly(req, res, next) {
  // This is a placeholder for your actual authentication logic.
  // You should replace this with a proper JWT validation that checks
  // if the user has an 'admin' role.
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ error: "Forbidden" });
  }
  next();
}
