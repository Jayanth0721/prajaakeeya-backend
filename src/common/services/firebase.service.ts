import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
  private firebaseApp: admin.app.App;

  constructor() {
    try {
      // Initialize Firebase Admin with service account
      const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_PATH
        ? require(process.env.FIREBASE_SERVICE_ACCOUNT_PATH)
        : {
            projectId: process.env.FIREBASE_PROJECT_ID,
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          };

      this.firebaseApp = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
      });
    } catch (error) {
      console.error('Firebase initialization error:', error);
      throw new Error('Failed to initialize Firebase');
    }
  }

  /**
   * Verify Firebase ID token from client
   * @param idToken - Firebase ID token from client
   * @returns Decoded token with user info
   */
  async verifyIdToken(idToken: string) {
    try {
      const decodedToken = await this.firebaseApp.auth().verifyIdToken(idToken);
      return decodedToken;
    } catch (error) {
      console.error('Token verification error:', error);
      throw new UnauthorizedException('Invalid Firebase token');
    }
  }

  /**
   * Get user by email from Firebase
   * @param email - User email
   * @returns Firebase user record
   */
  async getUserByEmail(email: string) {
    try {
      return await this.firebaseApp.auth().getUserByEmail(email);
    } catch (error) {
      return null;
    }
  }

  /**
   * Get user by UID from Firebase
   * @param uid - Firebase UID
   * @returns Firebase user record
   */
  async getUserByUid(uid: string) {
    try {
      return await this.firebaseApp.auth().getUser(uid);
    } catch (error) {
      return null;
    }
  }

  /**
   * Create custom token for a user
   * @param uid - Firebase UID
   * @returns Custom token
   */
  async createCustomToken(uid: string, additionalClaims?: object) {
    try {
      return await this.firebaseApp.auth().createCustomToken(uid, additionalClaims);
    } catch (error) {
      console.error('Custom token creation error:', error);
      throw new Error('Failed to create custom token');
    }
  }
}
