import LeveledLogMethod from "./LeveledLogMethod";
import LoggerType from "../../constants/LoggerType";
import Message from '../../models/Message';
import LevelType from "../../constants/LevelType";

class LeveledResponseLogMethod extends LeveledLogMethod {
    
    info(origin: string, statusCode: number, body: string, header: string) {
        let message: Message = {
            nameApp : process.env.APP_NAME,
            originType : origin,
            traceId : this.getTraceId(),
            level : LevelType.info,
            type : LoggerType.RESPONSE,
            method : null,
            statusCode : statusCode,
            domain : null,
            endpoint : null,
            url : null,
            content : `Headers: ${header} Body: ${body}`,
            tsLog: new Date()
        };
        console.info(this.formatMessageConsole(message))
    }

    error(origin: string, statusCode: number, body: string, header: string) {
        let message: Message = {
            nameApp : process.env.APP_NAME,
            originType : origin,
            traceId : this.getTraceId(),
            level : LevelType.error,
            type : LoggerType.RESPONSE,
            method : null,
            statusCode : statusCode,
            domain : null,
            endpoint : null,
            url : null,
            content : `Headers: ${header} Body: ${body}`,
            tsLog: new Date()
        };
        console.error(this.formatMessageConsole(message))
    }
}

export default LeveledResponseLogMethod;