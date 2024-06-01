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
    const username = req.user
    if (!username) return res.status(401).json({ 'message': 'cookie is not found' });

    const foundUser = await User.findOne({ username }).exec();

    if (!foundUser?.randnum) return res.status(403).json({'message' : 'either u dont have generated number yet or u some how get in to this page'});
    const result = foundUser.randnum;
    res.json(result);
}
const setrand = async(req, res) => {
    const username = req.user;
    if (!username) return res.status(401).json({ 'message': 'cookie is not found ' });

    const foundUser = await User.findOne({ username }).exec();

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
    console.log(req)
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
    res.json(userAll + "     " + "duplicate: " + dull);
}
const giveBy = async (req,res)=>{
    const User = require('../model/User');
    const username = req.user;
    if(!username) return res.status(403).send('No cookie');
    const found = await User.findOne({username : username}).exec();
    if(!found) return res.status(401).send('Unauthorized');
    const foundNo = found.no;
    const match = await User.findOne({randnum : foundNo}).exec();
    if(!match) return res.status(404).send('Not found contract me');
    res.json(match);
    }
module.exports = { getrand, setrand, getAll, checkDupilcate ,giveBy};