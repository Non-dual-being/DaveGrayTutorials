const path = require('path');
const JWT = require('jsonwebtoken');


const usersDB = {
    users: require(path.join(__dirname, '..', 'model', 'users')),
    setUsers: function (data) { this.users = data }
}

const handleRefreshToken = (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(401); // unautherized

    const refreshToken = cookies.jwt;
    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);

    if (!foundUser) return res.sendStatus(403);
    JWT.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
            const roles = Object.values(foundUser.roles);
            const accesToken = JWT.sign(
                {
                    "UserInfo" : {
                        "username": decoded.username,
                        "roles" : roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s'}
            )
            res.json({ accesToken })
        }
    )

}

module.exports = { handleRefreshToken }
