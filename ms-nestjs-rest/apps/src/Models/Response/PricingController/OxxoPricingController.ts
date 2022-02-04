export class PricingOxxoController{
    delivery:number;
    parcelReception:number;
    
    public static instance:PricingOxxoController
    private constructor(delivery:number,parcelReception:number){
        this.delivery=delivery;
        this.parcelReception=parcelReception;
    }

    public static getInstance():PricingOxxoController{
        if(PricingOxxoController.instance==null)
            PricingOxxoController.instance=new PricingOxxoController(parseInt(process.env.OXXO_DELIVERY_PRICE) ,parseInt(process.env.OXXO_PARCEL_RECEPTION_PRICE))
        return PricingOxxoController.instance
    }
}