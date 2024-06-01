const User = require('../model/User.js');
const bcrypt = require('bcrypt');

const Hnewuser = async(req, res) => {
    const { user, pwd , no } = req.body;
    if (!user || !pwd || !no) return res.status(400).json({ 'message': 'Username , password and yours number are required ' });

    const duplicate = await User.findOne({ username: user }).exec();
    const duplicateNumber = await User.findOne({no : no}).exec();
    if (duplicate || duplicateNumber ) return res.sendStatus(409); //unauthorized
    try {
        const hashpwd = await bcrypt.hash(pwd, 10);

        const result = await User.create({
            "username": user,
            "password": hashpwd,
            "no" : no
        });

        res.status(200).json({ 'message': `${user}  has been created` })
    } catch (err) {
        res.status(500).json({
            'message': err.message
        })
    }
}

module.exports = { Hnewuser }