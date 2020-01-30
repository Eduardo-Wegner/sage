class mongoose{
    constructor(model){
        this._model = model;
    }
    async find(query, sort,res){
       let resp = await this._model.find(query, null ,sort,async function(err,msg){
            return msg
        }).lean().then((result)=>{return(result)})
        return(resp)
    }

    async findOneAndUpdate(query, param,res,upsert=false){
        this._model.findOneAndUpdate(query,param, {
            upsert: upsert, returnNewDocument:true
        },async function (err, msg){
            return({err:err, msg:msg})
        }).lean().then((result)=>{
            return(result)})
    }

    async updateOne(query,param,res){
    let model = this._model
        let resp = model.findOneAndUpdate(query, param, {
            upsert: false,
            new: true
            },function (err, msg) {
            if (err) {
                return({
                    Status: "FAILURE",
                    message: 'TOKEN NOT UPDATED'
                });
            }
        }).lean().then((result)=>{return(result)})
        return resp
    }

    async save(data, res){
        // console.log(data)
        try {
            let new_model = new this._model(data);
            let resp = await new_model.save()
            return ({err: null,msg: resp})
        } catch (error) {
            return ({
                err: error,
                msg: null
            })
        }
        
    }
}
module.exports = mongoose;