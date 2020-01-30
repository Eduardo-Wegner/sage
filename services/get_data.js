'use strict'
const cheerio = require('cheerio'),
    request = require('request'),
    moment = require('moment'),
    moment_tz = require('moment-timezone');
    
class get_data{
    constructor(){
        this._github = 'https://github.com'
    }

    static factory(){
        return new get_data();
    }

    request_url_data(url){
        console.log(this._github + '/trending')
        return new Promise((resolve, reject)=>{
            request(this._github+url, (error, response, data)=>{
                // console.log(data)
                let html = cheerio.load(data);
                
                
                resolve(html)
            })           
        })
    }

    extract_data($){
        return new Promise((resolve, reject) => {
            let array = [];
            let count = 0;
            moment.locale('pl')
            let date = moment().format('L'),
                req_time = moment().tz('Europe/warsaw').format(),
                timezone = moment().tz('Europe/warsaw').format('Z');
            console.log(req_time)
            $('.Box article.Box-row')
                .get()
                // eslint-disable-next-line complexity
                .map((repo, index) => {
                    const $repo = $(repo);
                    const title = $repo
                        .find('.h3')
                        .text()
                        .trim();
                    const [username, repoName] = title.split('/').map(v => v.trim());

                    const relativeUrl = this._github + $repo
                        .find('.h3')
                        .find('a')
                        .attr('href');
                    const currentPeriodStarsString =
                        $repo
                        .find('.float-sm-right')
                        .text()
                        .trim() || '';
                    const language = $repo.find('[itemprop=programmingLanguage]').text().trim(),
                    forks = parseInt($repo.find("svg[aria-label='repo-forked']").first().parent().text().replace(',',''),10),
                    stars = parseInt($repo.find(".mr-3 svg[aria-label='star']").first().parent().text().replace(',', ''), 10);

                    if (index < 10) {
                        array.push({
                            username: username,
                            repoName: repoName,
                            relativeUrl: relativeUrl,
                            description:'FALTA',
                            language: language,
                            stars:stars,
                            forks: forks,
                            currentPeriodStars: currentPeriodStarsString
                        })
                    }


                    if (index === 9) {
                        // console.log(array)
                        let count_array = array.length;
                        resolve({
                            date: date,
                            request_time: req_time,
                            timezone: timezone,
                            trendRepo: array
                        })
                    }
                    count++
                })
            })
    }
}
module.exports = get_data.factory();