/**
 * Resume Service
 * 
 * Handles resume file operations using Appwrite Storage and Databases.
 * 
 * Appwrite Storage Concepts:
 * - storage.createFile(): Upload a file to a bucket
 * - storage.getFileDownload(): Get a download URL for a file
 * - storage.getFilePreview(): Get a preview/thumbnail URL
 * - storage.deleteFile(): Delete a file from storage
 * 
 * The resume metadata (description, date, etc.) is stored in a Databases
 * collection, while the actual PDF file is stored in a Storage bucket.
 */

import { databases, storage, DATABASE_ID, RESUMES_COLLECTION_ID, RESUMES_BUCKET_ID, ID, Query } from '../appwrite/config';

const resumeService = {
  /**
   * Fetch all resume metadata documents for the current user.
   * @param {string} userId - Current user's ID
   * @returns {Array} Array of resume metadata documents
   */
  async getResumes(userId) {
    const response = await databases.listDocuments(
      DATABASE_ID,
      RESUMES_COLLECTION_ID,
      [
        Query.equal('userId', userId),
        Query.orderDesc('$createdAt'),
        Query.limit(100),
      ]
    );
    return response.documents;
  },

  /**
   * Upload a resume PDF and create a metadata document.
   * Two-step process:
   * 1. Upload the file to Appwrite Storage
   * 2. Create a database document linking to the file
   * @param {Object} params - { userId, file, description }
   * @returns {Object} Created metadata document
   */
  async uploadResume({ userId, file, description }) {
    // Step 1: Upload the PDF file to the resumes storage bucket
    const uploadedFile = await storage.createFile(
      RESUMES_BUCKET_ID,
      ID.unique(),
      file
    );

    // Step 2: Store metadata in the database (linking to the file via fileId)
    const metadata = await databases.createDocument(
      DATABASE_ID,
      RESUMES_COLLECTION_ID,
      ID.unique(),
      {
        userId,
        fileId: uploadedFile.$id,
        fileName: file.name,
        description: description || '',
        uploadDate: new Date().toISOString(),
      }
    );

    return metadata;
  },

  /**
   * Get a download URL for a resume file.
   * Appwrite generates a signed URL that triggers a file download.
   * @param {string} fileId - Storage file ID
   * @returns {string} Download URL
   */
  getDownloadUrl(fileId) {
    return storage.getFileDownload(RESUMES_BUCKET_ID, fileId);
  },

  /**
   * Delete a resume: remove both the storage file and the metadata document.
   * @param {string} resumeId - Database document ID
   * @param {string} fileId - Storage file ID
   */
  async deleteResume(resumeId, fileId) {
    // Delete the file from storage first
    await storage.deleteFile(RESUMES_BUCKET_ID, fileId);
    // Then delete the metadata document
    await databases.deleteDocument(
      DATABASE_ID,
      RESUMES_COLLECTION_ID,
      resumeId
    );
    return resumeId;
  },
};

export default resumeService;
