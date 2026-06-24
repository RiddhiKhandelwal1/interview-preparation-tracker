/**
 * Problem Service — CRUD operations for coding problems via Appwrite Databases.
 */
import { databases, DATABASE_ID, PROBLEMS_COLLECTION_ID, ID, Query } from '../appwrite/config';

const problemService = {
  async getProblems(userId) {
    const response = await databases.listDocuments(DATABASE_ID, PROBLEMS_COLLECTION_ID, [
      Query.equal('userId', userId), Query.orderDesc('$createdAt'), Query.limit(1000),
    ]);
    return response.documents;
  },
  async createProblem(data) {
    return await databases.createDocument(DATABASE_ID, PROBLEMS_COLLECTION_ID, ID.unique(), data);
  },
  async updateProblem(problemId, data) {
    return await databases.updateDocument(DATABASE_ID, PROBLEMS_COLLECTION_ID, problemId, data);
  },
  async deleteProblem(problemId) {
    await databases.deleteDocument(DATABASE_ID, PROBLEMS_COLLECTION_ID, problemId);
    return problemId;
  },
};

export default problemService;
