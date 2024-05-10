import { randomBytes, createCipheriv, createDecipheriv, scryptSync } from 'crypto';

const key = scryptSync(process.env.SECRET_KEY!, 'salt', 24);  // Ensure the key is 192 bits for aes-192
const iv = randomBytes(16);  // Initialization vector

export function encrypt(text: string) {
    const cipher = createCipheriv('aes-192-cbc', key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${iv.toString('hex')}:${encrypted}`;
}

export function decrypt(text: string) {
    const textParts = text.split(':');
    const iv = Buffer.from(textParts.shift()!, 'hex');
    const encryptedText = textParts.join(':');
    const decipher = createDecipheriv('aes-192-cbc', key, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}
