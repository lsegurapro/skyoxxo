import Formatter from "./Formatter";
import { IConfigFormatter } from './IConfigFormatter';


class FileFormatter extends Formatter {
  private _logMaxFile: number;
  private _logMaxSizeFile: number;
  private _logPath:string;
  private _logAppName:string;

  constructor(config:IConfigFormatter) {
    super();
    this._logAppName = config._logAppName ? config._logAppName : this.errorResponse('AppName');
    this._logMaxFile = config._logMaxFile;
    this._logMaxSizeFile = config._logMaxSizeFile;
    this._logPath = config._logPath ? config._logPath : this.errorResponse('path'); 
  }
  MessageFile = (info: any): string => {
    let traceId = this.getTraceId();
    return this.formatMessageFile(info, traceId);
  };

  errorResponse = (field: string) => {
    throw new Error(`El campo ${field} es obligatorio.`)
  }

  getMaxFiles = () =>{
    return Number(this._logMaxFile) | 7; 
  }

  formatMessageFile = (info: any, traceId: string) => {
    return JSON.stringify({
      ...info,
      traceId: traceId ? traceId : null,
    });
  };
 
  getFileMaxSize = (): number => {
    return Number(this._logMaxSizeFile) | 100000;
  };

  getPath = (): string => {
    return this._logPath;
  };

  getAppName = (): string => {
    return this._logAppName;
  };
}

export default FileFormatter;
