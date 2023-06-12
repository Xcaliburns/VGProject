const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
    
  const accessToken = req.header("accessToken");

  if (!accessToken) return res.json({ error: "User not logged in!" });
                      
  try { 
    
    const validToken = verify(accessToken, process.env.VITE_TOKEN_SECRET);
  
    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.json({ error: err });
  }
  
};


module.exports = { validateToken };