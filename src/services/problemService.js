/**
 * Problem Service
 * 
 * Handles CRUD operations for coding problems using Appwrite Databases.
 * 
 * Appwrite Concepts:
 * - databases.listDocuments(): Fetch documents with optional Query filters
 * - databases.createDocument(): Create a new document with auto-generated or custom ID
 * - databases.updateDocument(): Update specific fields of an existing document
 * - databases.deleteDocument(): Remove a document by its ID
 * - Query.equal(): Filter documents where a field equals a value
 * - Query.orderDesc(): Sort documents in descending order
 */

import { databases, DATABASE_ID, PROBLEMS_COLLECTION_ID, ID, Query } from '../appwrite/config';

const problemService = {
  /**
   * Fetch all problems for the current user.
   * Uses Query.equal to scope data to the authenticated user's ID.
   * Limits to 1000 documents and sorts by newest first.
   * @param {string} userId - Current user's ID
   * @returns {Array} Array of problem documents
   */
  async getProblems(userId) {
    const response = await databases.listDocuments(
      DATABASE_ID,
      PROBLEMS_COLLECTION_ID,
      [
        Query.equal('userId', userId),
        Query.orderDesc('$createdAt'),
        Query.limit(1000),
      ]
    );
    return response.documents;
  },

  /**
   * Create a new problem document.
   * ID.unique() generates a unique document ID on the server side.
   * @param {Object} data - Problem data including userId
   * @returns {Object} Created document
   */
  async createProblem(data) {
    return await databases.createDocument(
      DATABASE_ID,
      PROBLEMS_COLLECTION_ID,
      ID.unique(),
      data
    );
  },

  /**
   * Update an existing problem document.
   * Only the fields provided in `data` will be updated.
   * @param {string} problemId - Document ID to update
   * @param {Object} data - Fields to update
   * @returns {Object} Updated document
   */
  async updateProblem(problemId, data) {
    return await databases.updateDocument(
      DATABASE_ID,
      PROBLEMS_COLLECTION_ID,
      problemId,
      data
    );
  },

  /**
   * Delete a problem document by its ID.
   * @param {string} problemId - Document ID to delete
   */
  async deleteProblem(problemId) {
    await databases.deleteDocument(
      DATABASE_ID,
      PROBLEMS_COLLECTION_ID,
      problemId
    );
    return problemId;
  },
};

export default problemService;
