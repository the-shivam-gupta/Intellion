const ENCRYPTED_ENDPOINTS = ["/query", "/enquiry", "/subscribe"];
import { sanitizeFormPayload } from "./formInputSecurity";

function bufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";

  for (let i = 0; i < bytes.length; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }

  return btoa(binary);
}

function pemToArrayBuffer(pem) {
  const base64 = pem
    .replace(/-----BEGIN PUBLIC KEY-----/, "")
    .replace(/-----END PUBLIC KEY-----/, "")
    .replace(/\s+/g, "");

  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }

  return bytes.buffer;
}

async function importRsaPublicKey(publicKeyPem) {
  return window.crypto.subtle.importKey(
    "spki",
    pemToArrayBuffer(publicKeyPem),
    {
      name: "RSA-OAEP",
      hash: "SHA-1"
    },
    false,
    ["encrypt"]
  );
}

export function shouldEncryptRequest(url = "") {
  return ENCRYPTED_ENDPOINTS.some(
    (endpoint) => url === endpoint || url.endsWith(endpoint)
  );
}

export function toEncryptedApiPath(url = "") {
  const endpoint = ENCRYPTED_ENDPOINTS.find(
    (item) => url === item || url.endsWith(item)
  );

  return endpoint ? `/api${endpoint}` : url;
}

export async function encryptSensitivePayload(payload, publicKeyPem) {
  if (
    !payload ||
    typeof payload !== "object" ||
    !publicKeyPem ||
    typeof window === "undefined" ||
    !window.crypto ||
    !window.crypto.subtle
  ) {
    return payload;
  }

  const sanitizedPayload = sanitizeFormPayload(payload);
  const encodedPayload = new TextEncoder().encode(
    JSON.stringify(sanitizedPayload)
  );
  const aesKey = await window.crypto.subtle.generateKey(
    {
      name: "AES-GCM",
      length: 256
    },
    true,
    ["encrypt", "decrypt"]
  );
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const ciphertext = await window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv
    },
    aesKey,
    encodedPayload
  );
  const exportedAesKey = await window.crypto.subtle.exportKey("raw", aesKey);
  const rsaPublicKey = await importRsaPublicKey(publicKeyPem);
  const encryptedKey = await window.crypto.subtle.encrypt(
    {
      name: "RSA-OAEP"
    },
    rsaPublicKey,
    exportedAesKey
  );

  return {
    encrypted_payload: bufferToBase64(ciphertext),
    encrypted_key: bufferToBase64(encryptedKey),
    iv: bufferToBase64(iv),
    encryption: "RSA-OAEP-AES-256-GCM"
  };
}
