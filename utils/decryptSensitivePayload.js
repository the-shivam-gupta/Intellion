const crypto = require("crypto");
const { readFileSync, existsSync } = require("fs");
const { join } = require("path");

let cachedPrivateKey = null;

function getPrivateKey() {
  if (cachedPrivateKey) {
    return cachedPrivateKey;
  }

  if (process.env.ENCRYPTION_PRIVATE_KEY) {
    cachedPrivateKey = process.env.ENCRYPTION_PRIVATE_KEY.replace(/\\n/g, "\n");
    return cachedPrivateKey;
  }

  const keyPath = join(process.cwd(), "encryption-private.pem");

  if (existsSync(keyPath)) {
    cachedPrivateKey = readFileSync(keyPath, "utf8");
    return cachedPrivateKey;
  }

  return null;
}

function isEncryptedPayload(payload) {
  return (
    payload &&
    payload.encryption === "RSA-OAEP-AES-256-GCM" &&
    payload.encrypted_payload &&
    payload.encrypted_key &&
    payload.iv
  );
}

function decryptSensitivePayload(payload) {
  if (!isEncryptedPayload(payload)) {
    return payload;
  }

  const privateKeyPem = getPrivateKey();

  if (!privateKeyPem) {
    throw new Error("Missing encryption private key on server");
  }

  const encryptedKey = Buffer.from(payload.encrypted_key, "base64");
  const iv = Buffer.from(payload.iv, "base64");
  const encryptedPayload = Buffer.from(payload.encrypted_payload, "base64");
  const aesKey = crypto.privateDecrypt(
    {
      key: privateKeyPem,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha1"
    },
    encryptedKey
  );
  const authTag = encryptedPayload.slice(-16);
  const ciphertext = encryptedPayload.slice(0, -16);
  const decipher = crypto.createDecipheriv("aes-256-gcm", aesKey, iv);

  decipher.setAuthTag(authTag);

  const plaintext = Buffer.concat([
    decipher.update(ciphertext),
    decipher.final()
  ]);

  return JSON.parse(plaintext.toString("utf8"));
}

module.exports = {
  decryptSensitivePayload,
  isEncryptedPayload
};
