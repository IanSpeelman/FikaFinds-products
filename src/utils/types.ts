import { JwtPayload } from "jwt-decode"

export type Product = {
    id?: number,
    name: string,
    image: string,
    price: number,
    category: string,
    stock?: number,
    amount?: number
    description: string,
    specifications: string
}

export interface jwtToken extends JwtPayload {
    id: number,
    admin: boolean,
    email: string,
    firstName: string,
    iat: number
    exp: number
}
