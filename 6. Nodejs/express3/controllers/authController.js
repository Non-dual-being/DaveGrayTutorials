const bcrypt = require('bcrypt');
const path = require('path');
const User = require(path.join(__dirname, '..', 'model', 'User'));
const JWT = require('jsonwebtoken');


const handleLogin = async (req, res) => {
    const { user, pwd } = req.body

    if (!user || !pwd) return res.status(400).json({
        "message" : "username and password are required"
    })

    const userFound = await User.findOne({ username: user }).exec();

    if (!userFound) return res.sendStatus(401);

    const match = await bcrypt.compare(pwd, userFound.password);

    if (match){
        //create JWT
        const roles = Object.values(userFound.roles);

        const accesToken = JWT.sign(
            {
                "UserInfo" : {
                    "username" : userFound.username,
                    "roles" : roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '260s'}
        );

        const refreshToken = JWT.sign(
            {"username" : userFound.username},
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d'}
        )

        userFound.refreshToken = refreshToken;
        const result = await  userFound.save();

        console.log(result);
        //http only cookie (not avalaible trough js)
        res.cookie('jwt', refreshToken, 
            {
            httpOnly : true, 
            sameSite: 'None',
           // secure: true, //with chrome en production this is important, in a production testing with thunderclietn commetn it out
            maxAge: 24 * 60 * 60 * 1000
            }
        );

        res.json({ accesToken });

    } else {
        res.sendStatus(401);
    }


}

module.exports = { handleLogin };

