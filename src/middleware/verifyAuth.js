import jwt from 'jsonwebtoken';

export const verifyAuth = (req, res, next) => {
  try {
    // Mengambil token dari headers
    const token = req.headers.authorization.split(" ")[1];

    // Jika token tidak ada kirim pesan error
    if (!token) return res.status(401).json({ message: "Tidak ada token" });

    // Jika token ada lakukan verifikasi
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) return res.status(401).json({ message: "Unauthorized" });
      decoded.username = decoded.username;
      next();
    })
  } catch (error) {
    res.status(505).json({ message: error.message });
  }
}