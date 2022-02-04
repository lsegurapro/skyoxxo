class Attributes{
    name:string
    code:string
}

class Data{
    id:string
    type:string
    attributes:Attributes
}

class ClassesWebServiceResponse{
    data:Data[]
}


export {Data,ClassesWebServiceResponse,Attributes}