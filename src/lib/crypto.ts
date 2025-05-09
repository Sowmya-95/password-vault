import { hash, compare } from "bcryptjs";

export async function hashPassword(password: string): Promise<string> {
    return await hash(password, 10);
}

export async function comparePasswords(input: string, hashed: string): Promise<boolean> {
    return await compare(input, hashed);
}
