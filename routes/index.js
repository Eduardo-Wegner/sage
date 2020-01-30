'use strict';
module.exports = function (control) {
    return new Promise((resolve, reject)=>{
        const main_route = require('./main_route');
        
        main_route(control);
        resolve()
    })
  };