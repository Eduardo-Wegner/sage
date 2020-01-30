const chai = require('chai'),
    chaiHttp = require('chai-http'),
    should = chai.should(),
    cheerio = require('cheerio'),
    get_data = require('../lib/get_data'),
    request = require('request'),
    loaders = require('../loaders/index.js');
global.schedule = require('../services/timers');
chai.use(chaiHttp);

describe('Request data from API', () => {
    context('request localhost trendings', () => {

        it("Testing retrieve data from localhost trending route", (done)=>{
            chai.request('http://localhost:5000')
                .get('/trending')
                .end((err, res)=>{
                    res.should.have.status(200);
                    res.body.should.have.keys('daily', 'history')
                    done()
                })
        })

        it("Testing retrieve data from localhost / route, must not found", (done)=>{
            chai.request('http://localhost:5000')
                .get('/')
                .end((err, res)=>{
                    res.should.have.status(404);
                    done()
                })
        })
    })
})
