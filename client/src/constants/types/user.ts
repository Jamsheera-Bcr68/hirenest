export type LoginRole = "admin" | "user";

export type AuthState={
    user:any|null,
    accessToken:string|null,
    isAuthenticated:boolean
}