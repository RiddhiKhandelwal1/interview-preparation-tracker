/**
 * Appwrite Client Configuration
 * 
 * This file initializes the Appwrite SDK client and exports service instances.
 * IMPORTANT: Only ONE Client instance should exist per application to avoid
 * session conflicts and unnecessary connections.
 * 
 * All sensitive IDs are loaded from environment variables (VITE_ prefix
 * is required by Vite to expose env vars to the client bundle).
 */

import { Client, Account, Databases, Storage, ID, Query } from 'appwrite';

// Initialize the Appwrite client — this is the core connection object
const client = new Client();

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) // Appwrite API endpoint
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); // Your Appwrite project ID

// Service instances — each wraps the client for a specific Appwrite feature
// Account: handles user authentication (signup, login, logout, sessions)
export const account = new Account(client);

// Databases: handles CRUD operations on collections/documents
export const databases = new Databases(client);

// Storage: handles file uploads, downloads, and previews
export const storage = new Storage(client);

// Re-export utilities for convenience
export { ID, Query };

// Export environment variable constants for collection/bucket IDs
export const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
export const PROBLEMS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_PROBLEMS_COLLECTION_ID;
export const NOTES_COLLECTION_ID = import.meta.env.VITE_APPWRITE_NOTES_COLLECTION_ID;
export const INTERVIEWS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_INTERVIEWS_COLLECTION_ID;
export const RESUMES_COLLECTION_ID = import.meta.env.VITE_APPWRITE_RESUMES_COLLECTION_ID;
export const RESUMES_BUCKET_ID = import.meta.env.VITE_APPWRITE_RESUMES_BUCKET_ID;

export default client;
