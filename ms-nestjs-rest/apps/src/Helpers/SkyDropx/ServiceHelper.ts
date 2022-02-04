import { ServiceCourierConstants } from "apps/src/Constants/ServiceCourierConstants"
import { ServiceEnum } from "apps/src/Enums/ServiceEnum"

export class ServiceHelper{
    public static verifyServiceLevelCourier(service:ServiceEnum,serviceLevelName:string):boolean{
        if(service==ServiceEnum.STANDARD){
            return ServiceCourierConstants.service_courier_standard.includes(serviceLevelName)
        }
        else if(service==ServiceEnum.EXPRESS){
            return ServiceCourierConstants.service_courier_express.includes(serviceLevelName)
        }
        return false
    }
}