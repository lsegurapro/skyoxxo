import LeveledRequestLogMethod from './LeveledLogMethods/LeveledRequestLogMethod';
import LeveledResponseLogMethod from './LeveledLogMethods/LeveledResponseLogMethod';
import LeveledMessageLogMethod from './LeveledLogMethods/LeveledMessageLogMethod';
import { Service, Container } from 'typedi';

@Service()
class LoggerV2 {

    request: LeveledRequestLogMethod = Container.get<LeveledRequestLogMethod>(LeveledRequestLogMethod);
    response: LeveledResponseLogMethod = Container.get<LeveledResponseLogMethod>(LeveledResponseLogMethod);
    message: LeveledMessageLogMethod = Container.get<LeveledMessageLogMethod>(LeveledMessageLogMethod);

    constructor() {
        this.validateEnvironments();
    }

    getTraceId() {
        return this.message.getTraceId();
    }

    validateEnvironments() {
        if (!process.env.APP_NAME) {
            console.warn("Error Logger: The environment 'APP_NAME' is required");
        }
    }
}

export default LoggerV2;