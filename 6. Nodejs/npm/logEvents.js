const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const defaultLogPath = path.join(__dirname, 'logs', 'eventlog.txt');

const logEvents = async (message, location = defaultLogPath) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`

    if (path.extname(location) !== '.txt'){
        location = defaultLogPath;
    }


    try {
        if (!fs.existsSync(path.join(__dirname, 'logs'))){
            await fs.promises.mkdir(path.join(__dirname, 'logs'));
        }
        await fsPromises.appendFile(location, String(logItem));
        
    } catch (err) {
        console.log(err);
    }

}

module.exports = logEvents;