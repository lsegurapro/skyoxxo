import axios from 'axios';
import { Logger, Origin } from '../../Config/LoggerConfig';

let InterceptedAxios = axios.create();

InterceptedAxios.interceptors.request.use(
    function(config) {
        config.headers["X-Procontacto-Trace-Id"] = Logger.message.getTraceId();
        
        let origin: string = Origin.external;
        let method: string = config.method;
        let domain: string = config.baseURL;
        let endpoint: string = config.url;
        let body: string = JSON.stringify(config.data);
        let header: string = JSON.stringify(config.headers);
        
        Logger.request.info(origin, method, domain, endpoint, body, header)
        return config;
    }
);

InterceptedAxios.interceptors.response.use(
    function (config) {
        let origin: string = Origin.external;
        let statusCode: number = config.status;
        let body: string = JSON.stringify(config.data);
        let header: string = JSON.stringify(config.headers);

        Logger.response.info(origin, statusCode, body, header)
        return config;
    }, 
    function (error) {
        if (error.response){
            let origin: string = Origin.external;
            let statusCode: number = error.response.status;
            let body: string = JSON.stringify(error.response.data);
            let header: string = null;
            
            Logger.response.error(origin, statusCode, body, header);
        }
        return Promise.reject(error);
    }
);

export default InterceptedAxios;