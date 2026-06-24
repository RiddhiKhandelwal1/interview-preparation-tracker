/**
 * Authentication Service
 * 
 * Wraps Appwrite Account SDK methods for user authentication.
 * These functions are called by Redux async thunks — they handle
 * the actual API communication with Appwrite's auth service.
 * 
 * Appwrite Concepts:
 * - account.create(): Registers a new user
 * - account.createEmailPasswordSession(): Creates a login session (cookie-based)
 * - account.get(): Retrieves the currently logged-in user from session
 * - account.deleteSession('current'): Logs out by destroying the current session
 */

import { account, ID } from '../appwrite/config';

const authService = {
  /**
   * Register a new user with email, password, and name.
   * After creating the account, automatically log them in.
   * @param {Object} params - { email, password, name }
   * @returns {Object} User document
   */
  async signup({ email, password, name }) {
    // Step 1: Create the user account in Appwrite
    await account.create(ID.unique(), email, password, name);
    // Step 2: Immediately create a session so the user is logged in
    await account.createEmailPasswordSession(email, password);
    // Step 3: Return the full user object
    return await account.get();
  },

  /**
   * Log in an existing user with email and password.
   * Appwrite creates an HTTP-only cookie session for security.
   * @param {Object} params - { email, password }
   * @returns {Object} User document
   */
  async login({ email, password }) {
    await account.createEmailPasswordSession(email, password);
    return await account.get();
  },

  /**
   * Log out the current user by destroying their active session.
   * 'current' targets the session making this request.
   */
  async logout() {
    await account.deleteSession('current');
  },

  /**
   * Get the currently authenticated user.
   * Returns null if no session exists (user is not logged in).
   * This is used on app startup to restore the auth state.
   * @returns {Object|null} User document or null
   */
  async getCurrentUser() {
    try {
      return await account.get();
    } catch {
      // If no session exists, Appwrite throws a 401 — we return null
      return null;
    }
  },
};

export default authService;
