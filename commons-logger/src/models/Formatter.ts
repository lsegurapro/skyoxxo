const httpContext = require("express-http-context");
interface IFormatter {
  getTraceId(): string;
}
class Formatter implements IFormatter {
  getTraceId = (): string => {
    if (httpContext.get("traceId")) {
      return httpContext.get("traceId");
    } else {
      let result = new String();
      return Reflect.getMetadata("traceIDcron", result, "toString");
    }
  };
}

export default Formatter;
