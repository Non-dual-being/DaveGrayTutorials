const bcrypt = require('bcrypt');
const path = require('path');
const JWT = require('jsonwebtoken');
const fsPromises = require('fs').promises;


const usersDB = {
    users: require(path.join(__dirname, '..', 'model', 'users.json')),
    setUsers: function (data) { this.users = data }
}

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body

    if (!user || !pwd) return res.status(400).json({
        "message" : "username and password are required"
    })

    const userFound = usersDB.users.find(person => person.username === user);

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
            { expiresIn: '30s'}
        );

        const refreshToken = JWT.sign(
            {"username" : userFound.username},
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d'}
        )

        const otherUsers = usersDB.users.filter(person => person.username !== userFound.username);

        const currentUser = {...userFound, refreshToken}

        usersDB.setUsers([...otherUsers, currentUser]);

        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(usersDB.users, null, 2)
        );

        //http only cookie (not avalaible trough js)
        res.cookie('jwt', refreshToken, 
            {
            httpOnly : true, 
            sameSite: 'None',
            secure: true, //with chrome en production this is important, in a production testing with thunderclietn commetn it out
            maxAge: 24 * 60 * 60 * 1000
            }
        );

        res.json({ accesToken });

    } else {
        res.sendStatus(401);
    }


}

module.exports = { handleLogin };

