const chai = require('chai'),
    chaiHttp = require('chai-http'),
    should = chai.should(),
    cheerio = require('cheerio'),
    get_data = require('../lib/get_data'),
    request = require('request'),
    loaders = require('../loaders/index.js');
global.schedule = require('../services/timers');
chai.use(chaiHttp);


describe('Test Loaders', () => {
    context('Testing Loaders', () => {

        it("Testing dor_env Loader", (done)=>{
           loaders.dot_env().then(()=>done())
        })

        it("Testing express_init Loader", (done) => {
           loaders.express_init().then(() => done())
        })

        it("Testing mongoConnection Loader", (done) => {
           loaders.mongoConnection().then(() => done())
        })

        it("Testing logger_start Loader", (done) => {
           loaders.logger_start().then(() => done())
        })
    })
})
