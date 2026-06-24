/**
 * Interview Service — CRUD for interview application tracking.
 */
import { databases, DATABASE_ID, INTERVIEWS_COLLECTION_ID, ID, Query } from '../appwrite/config';

const interviewService = {
  async getInterviews(userId) {
    const response = await databases.listDocuments(DATABASE_ID, INTERVIEWS_COLLECTION_ID, [
      Query.equal('userId', userId), Query.orderDesc('$createdAt'), Query.limit(500),
    ]);
    return response.documents;
  },
  async createInterview(data) {
    return await databases.createDocument(DATABASE_ID, INTERVIEWS_COLLECTION_ID, ID.unique(), data);
  },
  async updateInterview(interviewId, data) {
    return await databases.updateDocument(DATABASE_ID, INTERVIEWS_COLLECTION_ID, interviewId, data);
  },
  async deleteInterview(interviewId) {
    await databases.deleteDocument(DATABASE_ID, INTERVIEWS_COLLECTION_ID, interviewId);
    return interviewId;
  },
};

export default interviewService;
