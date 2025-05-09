import jwt from "jsonwebtoken";

const JWT_SECRET: jwt.Secret = process.env.JWT_SECRET!;

const EXPIRES_IN: jwt.SignOptions["expiresIn"] = process.env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"] || "7d";

export function signJwt(payload: object) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRES_IN });
}

export function verifyJwt<T>(token: string): T | null {
    try {
        return jwt.verify(token, JWT_SECRET) as T;
    } catch (error) {
        return null;
    }
}
