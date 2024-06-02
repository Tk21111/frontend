const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Hauth = async(req, res) => {
    const { user, pwd} = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required ' });
    const found = await User.findOne({ username: user }).exec();
    if (!found) return res.sendStatus(401); //unauthorized
    const match = await bcrypt.compare(pwd, found.password);
    if (match) {
        const roles = Object.values(found.roles).filter(Boolean);
        const stNumber = found.no;
        //jwts

        const accessToken = jwt.sign({
            "userinfo": {
                "username": found.username,
                "roles": roles,
            }
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        const refreshToken = jwt.sign({ "username": found.username }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
        found.no = stNumber;
        found.refreshToken = refreshToken;
        const result = await found.save();

        console.log(result);

        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(200).json({ accessToken });
    } else {
        console.log('!match')
        res.sendStatus(401);
    }
}

module.exports = { Hauth }