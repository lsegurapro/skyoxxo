import Formatter from "./Formatter";
import * as rTracer from "@procontacto/cls-rtracer";

class ConsoleFormat extends Formatter {
  formatMessageConsole = (info: any) => {
    const ERROR = "\u001b[31merror\u001b[39m";
    //let traceId = this.getTraceId();
    let traceId = rTracer.id();
    let message =  traceId
      ? `${this.displayTimestamp(info.timestamp)} ${this.displayTraceId(traceId)} ${info.level} : ${info.message}` 
      : `${this.displayTimestamp(info.timestamp)} ${this.displayTraceId(this.getTraceId())} ${info.level} : ${info.message}`;

    if (info.level === ERROR) {
      message += `${this.displayName(info.name)} ${this.displayHttpStatus(info.displayHttpStatus)} ${this.displayCode(info.code)} ${this.displayStack(info.stack)}`;
    } else {
      message += this.displayData(info.data);
    }
    return message;
  };

  private displayTimestamp = (timestamp: string): string => {
    return `[\u001b[36m${timestamp}\u001b[39m]`;
  };

  private displayTraceId = (traceId: string | unknown): string => {
    return traceId ? "[\u001b[36mtraceId:" + traceId + "\u001b[39m]" : "";
  };

  private displayName = (name: string): string => {
    return name ? `[\u001b[35mtypeError:${name}\u001b[39m]` : "";
  };

  private displayCode = (code: string): string => {
    return code ? `[\u001b[35mcode:${code}\u001b[39m]` : "";
  };

  private displayStack = (stack: string): string => {
    return stack ? ` - [stack-trace ---> ${stack}]` : "";
  };

  private displayHttpStatus = (httpStatus: string): string => {
    return httpStatus ? `[\u001b[35mhttpStatus:${httpStatus}\u001b[39m]` : "";
  };

  private displayData = (data: string): string => {
    return data ? JSON.stringify(data) : "";
  };
}

export default ConsoleFormat;
