import LeveledLogMethod from './LeveledLogMethod';
import LoggerType from "../../constants/LoggerType";
import Message from '../../models/Message';
import LevelType from '../../constants/LevelType';

class LeveledRequestLogMethod extends LeveledLogMethod {

    info(origin: string, method: string, domain: string, endpoint: string, body: string, header: string) {
        let message: Message = {
            nameApp : process.env.APP_NAME,
            originType : origin,
            traceId : this.getTraceId(),
            level : LevelType.info,
            type : LoggerType.REQUEST,
            method : method,
            statusCode : null,
            domain : domain,
            endpoint : endpoint,
            url : `${domain}${endpoint}`,
            content : `Headers: ${header} Body: ${body}`,
            tsLog: new Date()
        };
        console.info(this.formatMessageConsole(message))
    }

    error(origin: string, method: string, domain: string, endpoint: string, body: string, header: string) {
        let message: Message = {
            nameApp : process.env.APP_NAME,
            originType : origin,
            traceId : this.getTraceId(),
            level : LevelType.error,
            type : LoggerType.REQUEST,
            method : method,
            statusCode : null,
            domain : domain,
            endpoint : endpoint,
            url : `${domain}${endpoint}`,
            content : `Headers: ${header} Body: ${body}`,
            tsLog: new Date()
        };
        console.error(this.formatMessageConsole(message))
    }
}

export default LeveledRequestLogMethod;