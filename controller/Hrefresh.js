const User = require('../model/User');
const jwt = require('jsonwebtoken');

const Hrefresh = async(req, res) => {
    const cookie = req.cookies;
    if (!cookie.jwt) return res.sendStatus(401)
    const refreshToken = cookie.jwt;

    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) return res.sendStatus(403); //forbidden why i keep forgeting this

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {

        if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
        const roles = Object.values(foundUser.roles);
        const accessToken = jwt.sign({
                "userinfo": {
                    "username": decoded.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' }
        );
        res.json({ roles, accessToken })
    });
}

module.exports = { Hrefresh }