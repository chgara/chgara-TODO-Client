export interface Icall {
    get(url: string, token?: string): Promise<Response>;
    post(url: string, body: object, token?: string): Promise<Response>;
    put(url: string, body: object, token?: string): Promise<Response>;
    delete(url: string, body: object, token?: string): Promise<Response>;
}
