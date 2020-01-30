'use strict';
const data_control = require('../controllers/data_controller');
module.exports = function (control) {
    // auth Routes
    // const control = new data_control()
    // app.route('/')
    //     .get((req, res) => {
    //         let url = 'url' in req.query ? req.query.url:'/trending';
    //         get_data.request_url_data(url).then((result)=>{
    //             get_data.extract_data(result).then((result)=>{
    //                 // res.send(result)
    //                 control.data_persistence(result).then((aux) => res.send(aux))
                    
    //             })
                
    //         })

    //         // res.status(200).json({
    //         //     name: 'xhimbalaue'
    //         // })
    //     })
    app.route('/trending')
        .get((req, res) => {
            control.data_retrieve().then(async (resp)=>{
                let history = [];
                await resp.forEach((element,index) => {
                    if (index>0) history.push(element)
                });
                res.status(200).json({daily:resp[0], history:history})
            })
            
        })

    //Not Found
    app.use((req, res, next) => {
        res.status(404).send(req.url+" - NOT FOUND")
    })
    //Any ERROR
    app.use((err, req, res, next) => {
        res.status(500).json({message:"OPS!!!! Something went wrong!!!", error:err})
    })
};