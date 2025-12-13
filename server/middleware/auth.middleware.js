import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
      try {
        const decode =jwt.verify(token ,process.env.JWT_SECRET );
          req.userId =decode.userId;
            next();
      } catch (error) { 
res.status(401).json({"message":"toekn is expired"})        
      }
    
};

export default auth;