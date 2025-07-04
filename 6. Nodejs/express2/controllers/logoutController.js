const fsPromises = require('fs').promises;
const path = require('path');

const usersDB = {
    users: require(path.join(__dirname, '..', 'model', 'users')),
    setUsers: function (data) { this.users = data }
}

const handleLogout = async (req, res) => {

    //on front end delete acces tolen on clicl
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204); // no content to send back and succefull

    const refreshToken = cookies.jwt;
    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);

    if (!foundUser) {
        res.clearCookie('jwt', 
            {
                httpOnly: true, 
                sameSite: 'None',
                secure: true
            }
        );
        return res.sendStatus(204);
    }

    //delete refreshtoken
    const otherUsers = usersDB.users.filter(person => person.refreshToken !== foundUser.refreshToken);
    const currentUser = { ...foundUser, refreshToken: ''};
    usersDB.setUsers([...otherUsers, currentUser]);

    await fsPromises.writeFile(
        path.join(__dirname, '..', 'model', 'users.json' ),
        JSON.stringify(usersDB.users)
    );

    res.clearCookie('jwt', 
        {
            httpOnly: true, 
            sameSite: 'None',
            secure: true
        }
    );

    //secure true = only serve https

    res.sendStatus(204);

}

module.exports = { handleLogout }
