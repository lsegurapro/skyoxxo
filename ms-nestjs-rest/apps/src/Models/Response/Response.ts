export default class Response<T> {
    result:T

    public constructor(response: any)
    public constructor(response: T) {
        this.result = response;
    }

    public static create<T>(response:T): Response<T> {
        return new Response<T>(response);
    }

    public static createEmpty(): Response<any> {
        return new Response({});
    }
}

