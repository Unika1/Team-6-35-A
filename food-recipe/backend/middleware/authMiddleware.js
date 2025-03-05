import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }
    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET || "secret");
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ error: "Invalid or expired token." });
    }
};

const verifyAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ error: "Access denied. Admins only." });
    }
    next();
};

export default { verifyToken, verifyAdmin };
