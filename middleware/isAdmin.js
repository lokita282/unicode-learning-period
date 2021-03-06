const isAdmin = (req, res, next) => {
  if ((req.user) && (req.user.role === "admin" || req.user.role === "Admin" || req.user.role === "ADMIN")) {
    next()
  } else {
    res.status(401).json({
      success: false,
      message: 'Not authorized as admin'
    })
  }
}

export default isAdmin