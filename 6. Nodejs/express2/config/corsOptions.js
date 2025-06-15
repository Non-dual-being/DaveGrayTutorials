const allowedOrigins = ('./allowedOrigins.js')
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin){
            callback(null, true)
            /**no orgin is during development time, and refers to your own localhost */
        } else {
            callback(new Error('not allowed by cors'));
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions
