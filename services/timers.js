const cron = require('node-cron')
class timers{
    constructor(){
        this.task={};
    }

    static factory(){
        return new timers();
    }

    schedule_event(name, event, timeZone='GMT',time='0 0 * * *'){
        return new Promise((resolve, reject)=>{
            this.task[name] = cron.schedule(time, () => {
                event();
            }, {
                scheduled: false,
                timezone: timeZone
            });
            resolve(name)
        })
        
    }
    
    unschedule_event(name){
        this.task[name].destroy()
    }
    
    start_event(name){
        this.task[name].start()
    }
    
    stop_event(name){
        this.task[name].stop()
    }
}

module.exports = timers.factory();