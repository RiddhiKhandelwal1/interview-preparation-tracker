/**
 * Note Service — CRUD for study notes with optional problem linking.
 */
import { databases, DATABASE_ID, NOTES_COLLECTION_ID, ID, Query } from '../appwrite/config';

const noteService = {
  async getNotes(userId) {
    const response = await databases.listDocuments(DATABASE_ID, NOTES_COLLECTION_ID, [
      Query.equal('userId', userId), Query.orderDesc('$createdAt'), Query.limit(1000),
    ]);
    return response.documents;
  },
  async createNote(data) {
    return await databases.createDocument(DATABASE_ID, NOTES_COLLECTION_ID, ID.unique(), data);
  },
  async updateNote(noteId, data) {
    return await databases.updateDocument(DATABASE_ID, NOTES_COLLECTION_ID, noteId, data);
  },
  async deleteNote(noteId) {
    await databases.deleteDocument(DATABASE_ID, NOTES_COLLECTION_ID, noteId);
    return noteId;
  },
};

export default noteService;
