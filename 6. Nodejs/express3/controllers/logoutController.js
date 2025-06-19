const path = require('path');
const User = require(path.join(__dirname, '..', 'model', 'User'));



const handleLogout = async (req, res) => {

    //on front end delete acces tolen on clicl
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204); // no content to send back and succefull

    const refreshToken = cookies.jwt;
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
        res.clearCookie('jwt', 
            {
                httpOnly : true, 
                sameSite: 'None',
           // secure: true, //with chrome en production this is important, in a production testing with thunderclietn commetn it out
          
            }
        );
       
        return res.sendStatus(204);
    }

    //delete refreshtoken
    foundUser.refreshToken = '';
    const result = await foundUser.save();

 

    res.clearCookie('jwt', 
        {
            httpOnly : true, 
            sameSite: 'None',
           // secure: true, //with chrome en production this is important, in a production testing with thunderclietn commetn it out
          
        }
    );

    //secure true = only serve https

    res.sendStatus(204);

}

module.exports = { handleLogout }
