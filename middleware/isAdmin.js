const isAdmin = (req, res, next) => {
  console.log('y')
  if ((req.user) && (req.user.role === "admin" || req.user.role === "Admin" || req.user.role === "ADMIN")) {
    next()
  } else {
    res.status(401).json({
      success: false,
      message: 'Not authorized as admin'
    })
  }
}

module.exports = isAdmin