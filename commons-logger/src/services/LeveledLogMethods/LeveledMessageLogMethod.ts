import LeveledLogMethod from './LeveledLogMethod';
import LoggerType from "../../constants/LoggerType";
import LevelType from '../../constants/LevelType';
import Message from '../../models/Message';
import * as rTracer from "@procontacto/cls-rtracer";

class LeveledMessageLogMethod extends LeveledLogMethod {

    info(message: string) {
        let msg: Message = {
            nameApp : process.env.APP_NAME,
            originType : null,
            traceId : rTracer.id(),
            level : LevelType.info,
            type : LoggerType.MESSAGE,
            method : null,
            statusCode : null,
            domain : null,
            endpoint : null,
            url : null,
            content : message,
            tsLog: new Date()
        };
        console.error(this.formatMessageConsole(msg))
    }

    error(message: string) {
        let msg: Message = {
            nameApp : process.env.APP_NAME,
            originType : null,
            traceId : rTracer.id(),
            level : LevelType.error,
            type : LoggerType.MESSAGE,
            method : null,
            statusCode : null,
            domain : null,
            endpoint : null,
            url : null,
            content : message,
            tsLog: new Date()
        };
        console.error(this.formatMessageConsole(msg))
    }

    debug(message: string) {
        let msg: Message = {
            nameApp : process.env.APP_NAME,
            originType : null,
            traceId : rTracer.id(),
            level : LevelType.debug,
            type : LoggerType.MESSAGE,
            method : null,
            statusCode : null,
            domain : null,
            endpoint : null,
            url : null,
            content : message,
            tsLog: new Date()
        };
        if(process.env.PICKIT_DEBUG == 'true'){
            console.debug(this.formatMessageConsole(msg))
        };
        
    }

    warn(message: string) {
        let msg: Message = {
            nameApp : process.env.APP_NAME,
            originType : null,
            traceId : rTracer.id(),
            level : LevelType.warn,
            type : LoggerType.MESSAGE,
            method : null,
            statusCode : null,
            domain : null,
            endpoint : null,
            url : null,
            content : message,
            tsLog: new Date()
        };
        console.warn(this.formatMessageConsole(msg))
    }
}

export default LeveledMessageLogMethod;