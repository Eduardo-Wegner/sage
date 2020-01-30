const chai = require('chai'),
    chaiJsonEqual = require('chai-json-equal'),
    should = chai.should(),
    mongoose = require('mongoose'),
    trending_model = require('../models/trending_model'),
    deepEqualInAnyOrder = require('deep-equal-in-any-order');
chai.use(deepEqualInAnyOrder);

mongoose.Promise = global.Promise;
let connection,
data_test={
   date: '27.01.2020',
    request_time:'2020-01-27T05:13:17+01:00',
    timezone: "+01:00",
    trendRepo: [{
          "username": "oldboyxx",
          "repoName": "jira_clone",
          "relativeUrl": "https://github.com/oldboyxx/jira_clone",
          "description": "FALTA",
          "language": "JavaScript",
          "stars": 2434,
          "forks": 199,
          "currentPeriodStars": "879 stars today"
       },
       {
          "username": "sundowndev",
          "repoName": "hacker-roadmap",
          "relativeUrl": "https://github.com/sundowndev/hacker-roadmap",
          "description": "FALTA",
          "language": "",
          "stars": 1922,
          "forks": 258,
          "currentPeriodStars": "493 stars today"
       },
       {
          "username": "wuhan2020",
          "repoName": "wuhan2020",
          "relativeUrl": "https://github.com/wuhan2020/wuhan2020",
          "description": "FALTA",
          "language": "",
          "stars": 2598,
          "forks": 382,
          "currentPeriodStars": "1,033 stars today"
       },
       {
          "username": "meik97",
          "repoName": "XSpotify",
          "relativeUrl": "https://github.com/meik97/XSpotify",
          "description": "FALTA",
          "language": "C++",
          "stars": 890,
          "forks": 108,
          "currentPeriodStars": "246 stars today"
       },
       {
          "username": "binhnguyennus",
          "repoName": "awesome-scalability",
          "relativeUrl": "https://github.com/binhnguyennus/awesome-scalability",
          "description": "FALTA",
          "language": "",
          "stars": 23524,
          "forks": 2616,
          "currentPeriodStars": "198 stars today"
       },
       {
          "username": "gaul",
          "repoName": "awesome-ld-preload",
          "relativeUrl": "https://github.com/gaul/awesome-ld-preload",
          "description": "FALTA",
          "language": "",
          "stars": 373,
          "forks": 15,
          "currentPeriodStars": "87 stars today"
       },
       {
          "username": "sebastianruder",
          "repoName": "NLP-progress",
          "relativeUrl": "https://github.com/sebastianruder/NLP-progress",
          "description": "FALTA",
          "language": "Python",
          "stars": 14233,
          "forks": 2441,
          "currentPeriodStars": "50 stars today"
       },
       {
          "username": "wuhan2020",
          "repoName": "wuhan2020.github.io",
          "relativeUrl": "https://github.com/wuhan2020/wuhan2020.github.io",
          "description": "FALTA",
          "language": "TypeScript",
          "stars": 164,
          "forks": 66,
          "currentPeriodStars": "73 stars today"
       },
       {
          "username": "rstudio-conf-2020",
          "repoName": "dl-keras-tf",
          "relativeUrl": "https://github.com/rstudio-conf-2020/dl-keras-tf",
          "description": "FALTA",
          "language": "HTML",
          "stars": 57,
          "forks": 45,
          "currentPeriodStars": "32 stars today"
       },
       {
          "username": "rstudio-conf-2020",
          "repoName": "applied-ml",
          "relativeUrl": "https://github.com/rstudio-conf-2020/applied-ml",
          "description": "FALTA",
          "language": "HTML",
          "stars": 74,
          "forks": 46,
          "currentPeriodStars": "35 stars today"
       }
    ]
    }


describe('Test mongodb', () => {
    context('Mongoose', () => {

        it("Testing mongoose connection", (done)=>{
           mongoose.connect('mongodb://localhost/sage_test', {
              useNewUrlParser: true,
              useUnifiedTopology: true,
              useFindAndModify: false,
              useCreateIndex: true
           }).then((connect)=>{
               connection = connect.connection.db
               done()
           })
        })

        it("Testing trending_model SAVE", (done) => {
           let trendingData = new trending_model(data_test);
           trendingData.save().then(()=>done()).catch()
        })

         it("Testing trending_model FIND",(done) => {
            trending_model.find({},{_id:0, __v:0},(err, resp)=>{
               resp[0]._doc.should.to.be.deep.eql(data_test)
               done()
            })
         })
    })
})
