import * as rTracer from "@procontacto/cls-rtracer";
import Message from '../../models/Message';
import LoggerType from "../../constants/LoggerType";
import { Service } from 'typedi';

@Service()
abstract class LeveledLogMethod {

    constructor(
    ) { }

    public getTraceId() {
        return rTracer.id();
    }

    protected formatMessageConsole(message: Message) {
        let info = this.getInfo(message);
        let output = ``;
        output += message.traceId ? `${this.getAppName()} ${this.displayTimestamp(message.tsLog.toISOString())} ${this.displayTraceId(message.traceId)} | ${info}`
          : `${this.getAppName()} ${this.displayTimestamp(message.tsLog.toISOString())} | ${info}`;
        return output;
    }

    private getInfo = (message: Message): string => {
        switch (message.type) {
            case LoggerType.REQUEST:
                return `Type: ${LoggerType.REQUEST} | OriginType: ${message.originType} | Level: ${this.displayLevel(message.level)} | Method: ${message.method} | Domain: ${message.domain} | Endpoint: ${message.endpoint} | Content: ${message.content} `;
            case LoggerType.RESPONSE:
                return `Type: ${LoggerType.RESPONSE} | OriginType: ${message.originType} | Level: ${this.displayLevel(message.level)} | StatusCode: ${this.displayStatusCode(message.statusCode)} | Content: ${message.content}`;
            case LoggerType.MESSAGE:
            default:
                return `Type: ${LoggerType.MESSAGE} | Level: ${this.displayLevel(message.level)} | Content: ${message.content}`;
        }
    }

    private displayTimestamp = (timestamp: string): string => {
      return `[\u001b[36m${timestamp}\u001b[39m]`;
    }

    private displayTraceId = (traceId: string | unknown): string => {
        return traceId ? `[\u001b[36mtraceId:${traceId}\u001b[39m]` : "";
    }

    private getAppName = (): string => {
        return `[\u001b[35m${process.env.APP_NAME}\u001b[39m]`;
    }

    private displayStatusCode = (statusCode: number): string => {
        return `[\u001b[35m${statusCode.toString()}\u001b[39m]`;
    }

    private displayLevel = (level: string): string => {
        switch (level.toLowerCase()){
            //RED
            case "error":
                return `[\u001b[31m${level}\u001b[39m]`;
            //GREEN
            case "info":
                return `[\u001b[32m${level}\u001b[39m]`;
            //YELLOW
            case "warn":
                return `[\u001b[33m${level}\u001b[39m]`;
            //BLUE    
            case "debug":
                return `[\u001b[34m${level}\u001b[39m]`;
            //GREEN
            default:
                return `[\u001b[32m${level}\u001b[39m]`;     
        }
            
    }

}

export default LeveledLogMethod;