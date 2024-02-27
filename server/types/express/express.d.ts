declare module Express {
    export interface Request {
        user: Record<string, any>
    }
}
