const { required } = require("nodemon/lib/config");

const bcrypt = require('bcryptjs');
const helpers = {};

helpers.encryptPass = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const passEncrypt = await bcrypt.hash(password, salt);
    return passEncrypt;
}

helpers.matchPass = async (password, savedPass) => {
    try {
        return await bcrypt.compare(password, savedPass);
    } catch(e) {
        console.log(e);
    }
}

module.exports = helpers;