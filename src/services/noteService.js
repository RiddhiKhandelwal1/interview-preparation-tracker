/**
 * Note Service
 * 
 * Handles CRUD operations for study notes using Appwrite Databases.
 * Notes can optionally be linked to a specific problem via problemId.
 */

import { databases, DATABASE_ID, NOTES_COLLECTION_ID, ID, Query } from '../appwrite/config';

const noteService = {
  /**
   * Fetch all notes for the current user.
   * @param {string} userId - Current user's ID
   * @returns {Array} Array of note documents
   */
  async getNotes(userId) {
    const response = await databases.listDocuments(
      DATABASE_ID,
      NOTES_COLLECTION_ID,
      [
        Query.equal('userId', userId),
        Query.orderDesc('$createdAt'),
        Query.limit(1000),
      ]
    );
    return response.documents;
  },

  /**
   * Create a new note document.
   * @param {Object} data - Note data { userId, title, content, problemId? }
   * @returns {Object} Created document
   */
  async createNote(data) {
    return await databases.createDocument(
      DATABASE_ID,
      NOTES_COLLECTION_ID,
      ID.unique(),
      data
    );
  },

  /**
   * Update an existing note document.
   * @param {string} noteId - Document ID
   * @param {Object} data - Fields to update
   * @returns {Object} Updated document
   */
  async updateNote(noteId, data) {
    return await databases.updateDocument(
      DATABASE_ID,
      NOTES_COLLECTION_ID,
      noteId,
      data
    );
  },

  /**
   * Delete a note document by its ID.
   * @param {string} noteId - Document ID to delete
   */
  async deleteNote(noteId) {
    await databases.deleteDocument(
      DATABASE_ID,
      NOTES_COLLECTION_ID,
      noteId
    );
    return noteId;
  },
};

export default noteService;
