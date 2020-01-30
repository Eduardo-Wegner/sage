const mongoose = require('../services/mongoose'),
    trending_model = require('../models/trending_model');
class data_controller{
    constructor(url, model){
        this._url = url;
        this._mongoose = new mongoose(trending_model)
    }

    data_persistence(data){
        return new Promise((resolve, reject)=>{
            this._mongoose.save(data).then((result)=>{
                resolve(result)
            })
        })
        

    }

   data_retrieve(){
        return new Promise((resolve, reject) => {
            this._mongoose.find({},{sort:{request_time:-1}}).then((result) => {
                resolve(result)
            })
        })
    }
    
}

module.exports = data_controller