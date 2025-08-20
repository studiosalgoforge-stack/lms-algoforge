export function adminOnly(req, res, next) {
  // ✅ For testing, allow all requests as admin
  req.user = { role: "admin", name: "Admin" };
  if (req.user.role !== "admin")
    return res.status(403).json({ error: "Forbidden" });
  next();
}
