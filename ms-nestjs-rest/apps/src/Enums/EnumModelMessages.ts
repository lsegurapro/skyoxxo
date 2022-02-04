enum EnumModelMessages {
    IS_EMPTY = 'The $property attribute is required',
    IS_EMAIL_OPTIONS = 'The $property attribute must be have a format of email',
    IS_STRING = 'The $property attribute must be String',
    IS_BOOLEAN = 'The $property attribute must be Boolean',
    IS_NUMBER = 'The $property attribute must be int',
    IS_NUMBER_POSITIVE = 'The $property attribute must be int positive',
    INT_MAX = 'The $property attribute must have a maximum of 2147483647',
    STRING_MAX = 'The $property attribute must be lower than $constraint1',
    IS_VALID_RANGE = '$property must be between $constraint1 and $constraint2.',
    IS_LATITUDE = 'The $property attribute must be a valid latitude coordinate',
    IS_LONGITUDE = 'The $property attribute must be a valid longitude coordinate',
    IS_ARRAY = 'The $property attribute must be an Array',
}
export default EnumModelMessages;
