const User = require('../model/User');
const { use } = require('../routes/auth');


let check_duplicate_in_array = (input_array) => {
    input_array = input_array.sort((a, b) => a - b);
    let duplicate_elements = []
    for (index in input_array) {
        if (input_array[index] ===
            input_array[index - 1]) {
            duplicate_elements.push(
                input_array[index]);
        }
    }
    return [...new Set(duplicate_elements)];
}
async function generateUniqueRandomNumber(foundUser) {
    const User = require('../model/User');
    let uniqueNumberFound = false;
    let randomNumber;
    let same = false;
    if (foundUser.no){
        same = await foundUser.no;
    }

    while (!uniqueNumberFound) {
        randomNumber = Math.floor(Math.random() * 36) + 1;
        //console.log(randomNumber)

        try {
            const match = await User.findOne({ randnum: randomNumber });
            
           
        
            if (!match && same !== randomNumber ) {
                uniqueNumberFound = true;
            }
        } catch (err) {
            console.error(err);
        }
    }

    console.log("Generated unique random number:", randomNumber);
    return randomNumber;
}

const getrand = async(req, res) => {
    const cookie = req.cookies;
    if (!cookie.jwt) return res.status(401).json({ 'message': 'cookie is not found ' });

    const refreshToken = cookie.jwt;
    const foundUser = await User.findOne({ refreshToken }).exec();

    if (!foundUser?.randnum) return res.status(403).json({'message' : 'either u dont have generated number yet or u some how get in to this page'});
    const result = foundUser.randnum;
    res.json(result);
}
const setrand = async(req, res) => {
    const cookie = req.cookies;
    if (!cookie.jwt) return res.status(401).json({ 'message': 'cookie is not found ' });

    const refreshToken = cookie.jwt;
    const foundUser = await User.findOne({ refreshToken }).exec();

    if (foundUser.randnum) {
        return res.status(403).json({ 'message': 'already have number' });
    } else {

        try {
            const randomNumber = await generateUniqueRandomNumber(foundUser);
            foundUser.randnum = randomNumber;
            await foundUser.save();
            console.log("User saved with unique random number:", randomNumber);
        } catch (err) {
            console.error("Error saving user:", err);
        }

        res.status(200).json({ 'message': 'new number has been generate and save' })

    }
}

const getAll = async(req, res) => {
    const userAll = await User.find();
    if (!userAll) return res.status(204).json({ 'message': 'User not found' });
    res.json(userAll);
}

const checkDupilcate = async(req, res) => {
    let userAll = [];
    for (i = 1; i <= 36; i++) {
        const user = await User.findOne({ randnum: i });
        //console.log(user);
        try {
            //console.log(user.randnum)
            userAll.push(user.randnum)
        } catch {

        }
    }
    let duplicates = check_duplicate_in_array(userAll);
    let dull = false
    if (userAll.length !== duplicates.length && duplicates.length !== 0) {
        dull = true
    }
    //res.json(userAll + dull)
    res.json(userAll + "     " + "duplicate: " + dull);
}

const getWho = async(req , res) =>{
    
    const cookie = req.cookies;
    if (!cookie.jwt) return res.status(401).json({ 'message': 'cookie is not found ' });

    const refreshToken = cookie.jwt;
    const foundUser = await User.findOne({ refreshToken }).exec();
    const userGivenBy = User.findOne({no : foundUser.randnum}).exec()

    if (!foundUser || !userGivenBy) return res.status(401).json({'message' : 'your cookie or there is no gift for you contract me now'})
    res.json(`U will be giving a gift from ${userGivenBy}`);
}
const giveBy = async (req,res)=>{
    const User = require('../model/User');
    const cookie = req.cookies;
    if(!cookie) return res.status(404).send('No cookie');
    const refresh = cookie.jwt;
    const found = await User.findOne({refreshToken : refresh}).exec();
    if(!found) return res.status(401).send('Unauthorized');
    const foundNo = found.no;
    const match = await User.findOne({randnum : foundNo}).exec();
    if(!match) return res.status(404).send('Not found contract me');
    res.status(404).json({'message' : 'number of your giver is ' + match.no + 'and his/her/its/them/our etc. username is ' +match.username });
    }
module.exports = { getrand, setrand, getAll, checkDupilcate , getWho ,giveBy};