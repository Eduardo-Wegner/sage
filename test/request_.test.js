const chai = require('chai'),
    chaiHttp = require('chai-http'),
    should = chai.should(),
    cheerio = require('cheerio'),
    get_data = require('../lib/get_data'),
    request = require('request'),
    loaders = require('../loaders/index.js');
global.schedule = require('../services/timers');
chai.use(chaiHttp);

describe('Request trending from github', ()=>{

    context('request github', () => {

        it("Testing request from github", (done)=>{
            chai.request('https://github.com')
                .get('/trending')
                .end((err, res)=>{
                    res.should.have.status(200);
                    done()
                })
        })

        it("Testing 'get_data.request_url_data()'", (done) => {
            get_data.request_url_data('/trending?since=daily').then((result) => {
                request('https://github.com/trending?since=daily', async (error, response, data) => {
                    let html = await cheerio.load(data);
                    result('title').text().should.equal(html('title').text());
                    done();
                })
            })
        })
        it("Force Failed match request, request different pages, must be not EQUAL", (done)=>{
            get_data.request_url_data('/trending?since=daily').then((result) => {
                request('https://github.com', async (error, response, data) => {
                    let html = await cheerio.load(data);
                    result('title').text().should.not.equal(html('title').text())
                    done()
                    // if (result('title').text() !== html('title').text()) done()
                })
            })
        })
    })
})
