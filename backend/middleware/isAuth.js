import jwt from 'jsonwebtoken'


const isAuth = async (req, res, next) => {
    try {
        let { token } = req.cookies

        if (!token) {
            return res.status(401).json({ message: "user does not have token" })
        }
        let verifyToken = jwt.verify(token, process.env.JWT_SECRET)

        if (!verifyToken || !verifyToken.userId) {
            return res.status(401).json({ message: "user does not have a valid token" })
        }
        req.userId = verifyToken.userId
        next()

    } catch (error) {
        console.log("isAuth error", error.message)
        return res.status(401).json({ message: "Invalid or expired token" })

    }
}

export default isAuth