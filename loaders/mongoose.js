const mongoose = require('mongoose');

exports.init = () => {
    mongoose.Promise = global.Promise;
    return new Promise((resolve, reject) => {
     
            // console.log(process.env.MONGODB_URL + process.env.DB_NAME)
            let connection =  mongoose.connect(process.env.MONGODB_URL + process.env.DB_NAME, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex:true
            }).then((connection) => {
                resolve(connection.connection.db)
            }).catch((err) => reject({
                'status':'FAILURE',
                'message':err
            }));
            
    })
}