import jwt from "jsonwebtoken";
export const isAuthenticated = (req, res, next) => {
  const token = req.cookies?.token || req.headers?.Authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      error: true,
      message: "Token not found",
    });
  }
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  if (!decodedToken) {
    return res.status(401).json({
      success: false,
      error: true,
      message: "Invalid token",
    });
  }
  req.staffId = decodedToken.staffId;
  next();
  try {
  } catch (error) {
    console.log(`error in isAuthenticated middleware: ${error}`);
    return res.status(400).json({
      success: false,
      error: true,
      message: `Error in isAuthenticated middleware: ${error}`,
    });
  }
};