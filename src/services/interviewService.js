/**
 * Interview Service
 * 
 * Handles CRUD operations for interview applications/tracking
 * using Appwrite Databases.
 */

import { databases, DATABASE_ID, INTERVIEWS_COLLECTION_ID, ID, Query } from '../appwrite/config';

const interviewService = {
  /**
   * Fetch all interviews for the current user, sorted by newest first.
   * @param {string} userId - Current user's ID
   * @returns {Array} Array of interview documents
   */
  async getInterviews(userId) {
    const response = await databases.listDocuments(
      DATABASE_ID,
      INTERVIEWS_COLLECTION_ID,
      [
        Query.equal('userId', userId),
        Query.orderDesc('$createdAt'),
        Query.limit(500),
      ]
    );
    return response.documents;
  },

  /**
   * Create a new interview tracking entry.
   * @param {Object} data - Interview data { userId, company, status, interviewDate, notes, role }
   * @returns {Object} Created document
   */
  async createInterview(data) {
    return await databases.createDocument(
      DATABASE_ID,
      INTERVIEWS_COLLECTION_ID,
      ID.unique(),
      data
    );
  },

  /**
   * Update an existing interview document.
   * @param {string} interviewId - Document ID
   * @param {Object} data - Fields to update
   * @returns {Object} Updated document
   */
  async updateInterview(interviewId, data) {
    return await databases.updateDocument(
      DATABASE_ID,
      INTERVIEWS_COLLECTION_ID,
      interviewId,
      data
    );
  },

  /**
   * Delete an interview document by its ID.
   * @param {string} interviewId - Document ID to delete
   */
  async deleteInterview(interviewId) {
    await databases.deleteDocument(
      DATABASE_ID,
      INTERVIEWS_COLLECTION_ID,
      interviewId
    );
    return interviewId;
  },
};

export default interviewService;
