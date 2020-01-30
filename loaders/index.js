'user strict'
const express = require('express'),
        dotenv = require('dotenv'),
        mongooseLoader = require('./mongoose'),
        logger_load = require('./log');

class loaders{
    constructor(){        
        this._mongoose
        this.logger_start().then(()=>{
            schedule.schedule_event('log_rotate', this.logger_start, 'America/Sao_Paulo', '50 0 * * *').then(name => {
                schedule.start_event(name)
                logger.info(`#### ( ${name} ) LOG ROTATE Scheduled  ####\n`)
            })
        })
        
    }

    static factory(){
        return new loaders();
    }

    load_modules(){
        return new Promise((resolve, reject)=>{
            console.log('####  SERVER INITIALIZING  ####');
            logger.info('####  SERVER INITIALIZING  ####');
            logger.info('####  LOADING MODULES  ####\n');
            logger.info('####  LOADING ENVIRONMENT VARIABLES  ####');
            this.dot_env().then(() => {
                logger.info('####  ENVIRONMENT VARIABLES LOADED  ####');
                logger.info('####  LOADING  EXPRESS ####');
                this.express_init().then(() => {
                    
                    logger.info('#### EXPRESS LOADED ####');
                    logger.info('####  LOADING  MONGOOSE ####');
                    mongooseLoader.init().then((connection) => {
                        this._mongoose = connection;
                        logger.info('#### MONGOOSE LOADED ####');
                        resolve()
                    }).catch((reason)=>{
                        console.log(reason)
                        logger.error(reason)
                        if (reason) {
                          
                        }
                    });
                });
            });
        });
    }

    dot_env() {
        return new Promise((resolve, reject) => {
            dotenv.config();
            resolve();
        });
    }

    express_init() {
        return new Promise((resolve, reject) => {
             global.app = express()
            resolve();
        });
    }

    mongoConnection() {
       return new Promise((resolve, reject)=> {
            mongooseLoader.init().then((connection) => resolve(connection)).catch((err) => logger.error(err));
        });
    }

    logger_start(){
        return new Promise((resolve, reject)=>{
            global.logger = logger_load.init();
            resolve()
        })
        
        
    }
}
module.exports = loaders.factory();