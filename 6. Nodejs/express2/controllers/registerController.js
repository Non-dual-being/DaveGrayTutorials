const path = require('path');
const fsPromises = require('fs').promises;
const bcrypt = require('bcrypt');
const ROLES = require(path.join(__dirname, '..', 'config', 'roles_list.js'));

const usersDB = {
    users: require(path.join(__dirname, '..', 'model', 'users')),
    setUsers: function (data) { this.users = data }
}

const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body

    if (!user || !pwd) return res.status(400).json({
        "message" : "username and password are required"
    })

    const duplicate = usersDB.users.find(person => person.username === user);

    if (duplicate) return res.status(409).json({'message' : 'user already taken'});

    try {
        const hashedPwd = await bcrypt.hash(pwd, 10);
        //store the new user
        const newUser = {
            "username": user,
            "roles" : { "User" : ROLES['User'] },
            "password": hashedPwd,
            
        }

       usersDB.setUsers([...usersDB.users, newUser]);
       await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(usersDB.users, null, 2)
            //stringfy om er een json string van te maken, je kan niet een in memory dat object schrijven naar een json file
       )
        res.status(201).json({
            'succes' : `New User ${newUser.username} is registrated`
        });

    } catch (err) {
        res.status(500).json({ "message" : err.message });
    }
}

module.exports = { handleNewUser };