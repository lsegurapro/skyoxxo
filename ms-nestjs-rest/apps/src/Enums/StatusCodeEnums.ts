type EnumDictionary<T extends string | symbol | number, U> = {
    [K in T]: U;
};

enum StatusCodeEnums {
    INVALID_POSTAL_CODE = 10001,
    INVALID_POSTAL_CODE_FROM = 10002,
    INVALID_POSTAL_CODE_TO = 10003,
    CLASS_NOT_FOUND=10004,
    RATE_NOT_FOUND=10005,
    ERROR_CREATING_LABEL=10006
}

const StatusCodeExceptionText: EnumDictionary<StatusCodeEnums, string> = {
    [StatusCodeEnums.INVALID_POSTAL_CODE]: 'INVALID_POSTAL_CODE',
    [StatusCodeEnums.INVALID_POSTAL_CODE_FROM]: 'INVALID_POSTAL_CODE_FROM',
    [StatusCodeEnums.INVALID_POSTAL_CODE_TO]: 'INVALID_POSTAL_CODE_TO',
    [StatusCodeEnums.CLASS_NOT_FOUND]: 'CLASS_NOT_FOUND_IN_SKYDROPX',
    [StatusCodeEnums.RATE_NOT_FOUND]: 'RATE_NOT_FOUND',
    [StatusCodeEnums.ERROR_CREATING_LABEL]: 'ERROR_CREATING_LABEL',
};

export { StatusCodeEnums, StatusCodeExceptionText };
