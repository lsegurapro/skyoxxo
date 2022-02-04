export default class PostalCodeHelper{
    public static listCPs:any={};

    public static initCpsFromFile():void{
    var lineReader = require('readline').createInterface({
        input: require('fs').createReadStream(`${process.env.CP_FILE}/cps.txt`)
      });
      
      lineReader.on('line', function (line:string) {
          let cols=line.split("|")
          PostalCodeHelper.listCPs[cols[0].toString()]=`${cols[4]}, ${cols[5]}}`
      });
    }

    public static validatePostalCode(cp:string){
        return PostalCodeHelper.listCPs[cp]!=null
    }

    public static getCityAndState(cp:string):string{
        return PostalCodeHelper.listCPs[cp]
    }
}