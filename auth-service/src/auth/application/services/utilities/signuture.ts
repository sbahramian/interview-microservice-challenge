// eslint-disable-next-line @typescript-eslint/no-var-requires
const crypto = require('crypto');

const ALGORITHM = 'aes-256-gcm';
const BLOCK_SIZE = 16;

export const decryptAes = (
  cipherText: string,
  aesKey: string | Buffer,
  initiateVector?: string | Buffer,
  format = 'base64',
): string => {
  let contents: Buffer;
  if (format.toLowerCase() === 'hex') {
    contents = Buffer.from(cipherText, 'hex');
  } else {
    contents = Buffer.from(cipherText, 'base64');
  }
  let iv: Buffer;
  if (initiateVector && typeof initiateVector === 'string') {
    iv = Buffer.from(initiateVector, 'hex'); // Initialize IV from hex
  } else if (initiateVector) {
    iv = initiateVector as Buffer;
  } else {
    iv = Buffer.alloc(BLOCK_SIZE);
  }

  let keyBuffer: Buffer;
  if (aesKey && typeof aesKey === 'string') {
    keyBuffer = Buffer.from(aesKey, 'hex'); // Initialize key from hex
  } else if (aesKey) {
    keyBuffer = aesKey as Buffer;
  } else {
    throw new Error('AES Key not provided');
  }

  const decipher = crypto.createDecipheriv(ALGORITHM, keyBuffer, iv);
  const authTagLength = 16; // GCM authentication tag length
  decipher.setAuthTag(contents.slice(-authTagLength)); // Set the authentication tag
  let decrypted = decipher.update(contents.slice(0, -authTagLength), null, 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

export const encryptAes = (
  plainText: string,
  aesKey: string | Buffer,
  initiateVector?: string | Buffer,
  format = 'base64',
): string => {
  let iv: Buffer;
  if (initiateVector && typeof initiateVector === 'string') {
    iv = Buffer.from(initiateVector, 'hex'); // Initialize IV from hex
  } else if (initiateVector) {
    iv = initiateVector as Buffer;
  } else {
    iv = crypto.randomBytes(BLOCK_SIZE); // Generate a random IV for GCM
  }

  let keyBuffer: Buffer;
  if (aesKey && typeof aesKey === 'string') {
    keyBuffer = Buffer.from(aesKey, 'hex'); // Initialize key from hex
  } else if (aesKey) {
    keyBuffer = aesKey as Buffer;
  } else {
    throw new Error('AES Key not provided');
  }

  const cipher = crypto.createCipheriv(ALGORITHM, keyBuffer, iv);
  let cipherText = cipher.update(plainText, 'utf8', 'base64');
  cipherText += cipher.final('base64');

  // Get the authentication tag and append it to the ciphertext
  const authTag = cipher.getAuthTag();
  cipherText += authTag.toString('base64');

  if (format.toLowerCase() === 'hex') return cipherText;

  return cipherText;
};
