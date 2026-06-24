/**
 * Appwrite Client Configuration
 * 
 * Initializes the Appwrite SDK client and exports service instances.
 * Only ONE Client instance should exist per app to avoid session conflicts.
 * All IDs are loaded from environment variables (VITE_ prefix required by Vite).
 */

import { Client, Account, Databases, Storage, ID, Query } from 'appwrite';

const client = new Client();

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

// Service instances for auth, database, and file storage
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export { ID, Query };

// Environment variable constants
export const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
export const PROBLEMS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_PROBLEMS_COLLECTION_ID;
export const NOTES_COLLECTION_ID = import.meta.env.VITE_APPWRITE_NOTES_COLLECTION_ID;
export const INTERVIEWS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_INTERVIEWS_COLLECTION_ID;
export const RESUMES_COLLECTION_ID = import.meta.env.VITE_APPWRITE_RESUMES_COLLECTION_ID;
export const RESUMES_BUCKET_ID = import.meta.env.VITE_APPWRITE_RESUMES_BUCKET_ID;

export default client;
