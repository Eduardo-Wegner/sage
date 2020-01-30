exports.init = ()=>{
    const logger = require('simple-node-logger'),
        moment = require('moment-timezone');
        let date = moment().format('MM_DD_YYYY')
        let log = logger.createSimpleFileLogger({logFilePath:'logger_'+date+'.log',timeStampFormat:"MM-DD-YYY HH:mm:ss.SSS"})
        return(log);
    
} 