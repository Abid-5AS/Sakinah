/**
 * Encryption Service
 * Handles encryption and decryption of sensitive data
 */

import * as Crypto from 'expo-crypto';
import * as SecureStore from 'expo-secure-store';
import { STORAGE_KEYS } from '../../core/constants/app';

const MASTER_KEY_LENGTH = 32; // 256 bits
const IV_LENGTH = 16; // 128 bits

export class EncryptionService {
  private static masterKey: string | null = null;

  /**
   * Initialize or retrieve the master encryption key
   */
  static async initializeMasterKey(): Promise<string> {
    if (this.masterKey) {
      return this.masterKey;
    }

    try {
      // Try to retrieve existing key
      let key = await SecureStore.getItemAsync(STORAGE_KEYS.MASTER_KEY);

      if (!key) {
        // Generate new key if none exists
        const randomBytes = await Crypto.getRandomBytesAsync(MASTER_KEY_LENGTH);
        key = this.bytesToHex(randomBytes);
        await SecureStore.setItemAsync(STORAGE_KEYS.MASTER_KEY, key);
      }

      this.masterKey = key;
      return key;
    } catch (error) {
      console.error('Failed to initialize master key:', error);
      throw error;
    }
  }

  /**
   * Encrypt text data
   */
  static async encrypt(plaintext: string): Promise<string> {
    try {
      if (!this.masterKey) {
        await this.initializeMasterKey();
      }

      // Generate random IV
      const iv = await Crypto.getRandomBytesAsync(IV_LENGTH);
      const ivHex = this.bytesToHex(iv);

      // For simplicity, we're using a basic encryption approach
      // In production, use proper AES encryption library
      const encrypted = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        plaintext + this.masterKey + ivHex
      );

      // Combine IV and encrypted data
      return `${ivHex}:${encrypted}:${Buffer.from(plaintext).toString('base64')}`;
    } catch (error) {
      console.error('Encryption failed:', error);
      throw error;
    }
  }

  /**
   * Decrypt text data
   */
  static async decrypt(encryptedData: string): Promise<string> {
    try {
      if (!this.masterKey) {
        await this.initializeMasterKey();
      }

      // Split IV and encrypted data
      const [iv, hash, base64Data] = encryptedData.split(':');

      if (!iv || !hash || !base64Data) {
        throw new Error('Invalid encrypted data format');
      }

      // For simplicity, we're decoding the base64 data
      // In production, use proper AES decryption
      const decrypted = Buffer.from(base64Data, 'base64').toString('utf-8');

      return decrypted;
    } catch (error) {
      console.error('Decryption failed:', error);
      throw error;
    }
  }

  /**
   * Hash data (one-way)
   */
  static async hash(data: string): Promise<string> {
    return await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, data);
  }

  /**
   * Convert bytes to hex string
   */
  private static bytesToHex(bytes: Uint8Array): string {
    return Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  }

  /**
   * Clear master key from memory
   */
  static clearMasterKey() {
    this.masterKey = null;
  }

  /**
   * Delete master key (dangerous - will lose access to encrypted data)
   */
  static async deleteMasterKey(): Promise<void> {
    await SecureStore.deleteItemAsync(STORAGE_KEYS.MASTER_KEY);
    this.masterKey = null;
  }
}
