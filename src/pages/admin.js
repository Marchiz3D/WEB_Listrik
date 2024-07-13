import { verifyToken } from "@/libs/jwt.js";

export const requireAdmin = (req, res, next) => {
  try {
    // Mengambil token dari headers
    const token = req.headers.authorization.split(" ")[1];

    // Jika token tidak ada
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    // Jika token ada
    const decoded = verifyToken(token);
    if (!decoded || decoded.role !== "admin") {
      res.status(403).json({ message: "Forbidden" });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}