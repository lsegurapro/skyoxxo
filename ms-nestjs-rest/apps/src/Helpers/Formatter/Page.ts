interface IResultPage<T> {
    items: T[];
}

export default class Page<T> {
    limit: number;
    offset: number;
    hasMore: boolean;
    result: IResultPage<T>;
    quantity: number;

    public constructor(results: IResultPage<T>, limit?: number, offset?: number, hasMore?: boolean, quantity?: number) {
        this.result = results;
        this.limit = limit;
        this.offset = offset;
        this.hasMore = hasMore;
        this.quantity = quantity;
    }

    public static create<T>(result: T[], limit?: number, offset?: number, hasMore?: boolean, quantity?: number): Page<T> {
        return new Page({ items: result }, limit, offset, hasMore, quantity);
    }
}
