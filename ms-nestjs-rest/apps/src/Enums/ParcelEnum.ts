import ParcelWebServiceRequest from "../Models/Request/SkyDropx/ParcelWebServiceRequest";

type EnumDictionary<T extends string | symbol | number, U> = {
    [K in T]: U;
};

enum ParcelEnum {
    SMALL = "S",
    MEDIUM = "M",
    LARGE = "L"
    
}

const ParcelEnumsDictionary: EnumDictionary<string, ParcelWebServiceRequest> = {
    [ParcelEnum.SMALL]: new ParcelWebServiceRequest("1","30","5","21"),
    [ParcelEnum.MEDIUM]: new ParcelWebServiceRequest("5","30","5","21"),
    [ParcelEnum.LARGE]: new ParcelWebServiceRequest("10","30","5","21"),
};

export { ParcelEnum, ParcelEnumsDictionary };
