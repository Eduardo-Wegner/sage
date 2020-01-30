exports.init = async () => {
    let connection = ''
    mongoose.Promise = global.Promise;
    return new Promise((resolve, reject)=>{
        try {
            console.log(process.env.MONGODB_URL + process.env.DB_NAME)
            connection = await mongoose.connect(process.env.MONGODB_URL + process.env.DB_NAME, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            });
            resolve(connection.connection.db)
        } catch (error) {
            console.log(error)
            reject({'status':'FAILURE',
                      'message':error})
        }
    })
}   