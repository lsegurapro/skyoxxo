import ParcelWebServiceRequest from "./ParcelWebServiceRequest";

export default class QuotationWebServiceRequest {
  zip_from: string;
  zip_to: string;
  parcel:ParcelWebServiceRequest;

  constructor(zip_from:string,zip_to:string,parcel:ParcelWebServiceRequest){
      this.zip_from=zip_from;
      this.zip_to=zip_to;
      this.parcel=parcel;
      
  }
}
