class start{
    constructor(){
        
            global.schedule = require('./services/timers');
            this.loaders = require('./loaders');
            this.routes = require('./routes');
            this.get = require('./services/get_data');
            this.data_control = require('./controllers/data_controller');
            this.control = new this.data_control();
            // setInterval(() => this.log.info(new Date), 1000);
            // setInterval(()=>this.log = logger.createSimpleFileLogger({logFilePath:'logger'+new Date+'.log',timeStampFormat:"MM-DD-YYY HH:mm:ss.SSS"}),10000)
        
    }

    static factory(){
        return new start();
    }

    load_modules(){
        this.loaders.load_modules().then(()=>this.load_routes()).then(()=>this.load_schedule())
    }
    load_routes(){
        this.routes(this.control).then(() => {
            
            app.listen(process.env.PORT_HTTP,  ()=>{
                logger.info(`Listening on PORT: ${process.env.PORT_HTTP}`);
                console.log(`Listening on PORT: ${process.env.PORT_HTTP}`);
                logger.info('####  SERVER INITIALIZED   ####');
                console.log('####  SERVER INITIALIZED   ####');
            });
        })
    }
    load_schedule(){
        const get_data = ()=>{
            this.get.request_url_data('/trending?since=daily').then((result) => {
                this.get.extract_data(result).then((result) => {
                    this.control.data_persistence(result).then((aux) => {logger.info("GET_DATA ACCOMPLISHED")})

                })

            })
        }

        schedule.schedule_event('get_data', get_data, 'Europe/Warsaw','0 5 * * *').then(name=>{schedule.start_event(name)
            logger.info(`#### ( ${name} ) Event Scheduled  ####\n`)
        })

        
    }
}

const start_app = start.factory();
start_app.load_modules();