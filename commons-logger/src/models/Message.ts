interface Message {
    nameApp : string;
    originType : string;
    traceId : string | unknown;
    level : string;
    type : string;
    method : string;
    statusCode : number;
    domain : string;
    endpoint : string;
    url : string;
    content : string;
    tsLog: Date;
}

export default Message;