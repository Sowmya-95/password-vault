import CryptoJS from "crypto-js";

const secretKey = process.env.NEXT_PUBLIC_ENCRYPTION_KEY!;

export function encrypt(text: string): string {
    if (!text) return "";
    return CryptoJS.AES.encrypt(text, secretKey).toString();
}

export function decrypt(ciphertext: string | null | undefined): string {
    if (!ciphertext) return "";

    try {
        const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);
        return decrypted || "";
    } catch (err) {
        console.error("❌ Decryption error:", err);
        return "";
    }
}
