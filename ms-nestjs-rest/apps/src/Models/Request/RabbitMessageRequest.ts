export default class RabbitMessageRequest<T>{
    xProcontactoTraceId: string;
    data: T
    app: string
    createdAt: Date
    retry: number | null

    public constructor(xProcontactoTraceId: string, data: T, app: string, createdAt: Date, retry: number | null) {
        this.xProcontactoTraceId = xProcontactoTraceId;
        this.data = data;
        this.app = app;
        this.createdAt = createdAt;
        this.retry = retry;
    }

    public static create<T>(xProcontactoTraceId: string, data: T, app: string, createdAt: Date, retry: number | null): RabbitMessageRequest<T> {
        return new RabbitMessageRequest(xProcontactoTraceId, data, app, createdAt, retry);
    }
}