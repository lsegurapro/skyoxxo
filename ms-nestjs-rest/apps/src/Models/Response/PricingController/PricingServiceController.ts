export class PricingServiceRequestController{
    standardService:number;
    expressService:number;
    
    public static instance:PricingServiceRequestController
    private constructor(standardService:number,expressService:number){
        this.standardService=standardService;
        this.expressService=expressService;
    }

    public static getInstance():PricingServiceRequestController{
        if(PricingServiceRequestController.instance==null)
            PricingServiceRequestController.instance=new PricingServiceRequestController(parseInt(process.env.STANDARD_SERVICE_PRICE) ,parseInt(process.env.EXPRESS_SERVICE_PRICE))
        return PricingServiceRequestController.instance
    }


}