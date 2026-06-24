/**
 * Resume Service — file operations via Appwrite Storage + metadata in Databases.
 */
import { databases, storage, DATABASE_ID, RESUMES_COLLECTION_ID, RESUMES_BUCKET_ID, ID, Query } from '../appwrite/config';

const resumeService = {
  async getResumes(userId) {
    const response = await databases.listDocuments(DATABASE_ID, RESUMES_COLLECTION_ID, [
      Query.equal('userId', userId), Query.orderDesc('$createdAt'), Query.limit(100),
    ]);
    return response.documents;
  },
  async uploadResume({ userId, file, description }) {
    const uploadedFile = await storage.createFile(RESUMES_BUCKET_ID, ID.unique(), file);
    const metadata = await databases.createDocument(DATABASE_ID, RESUMES_COLLECTION_ID, ID.unique(), {
      userId, fileId: uploadedFile.$id, fileName: file.name,
      description: description || '', uploadDate: new Date().toISOString(),
    });
    return metadata;
  },
  getDownloadUrl(fileId) {
    return storage.getFileDownload(RESUMES_BUCKET_ID, fileId);
  },
  async deleteResume(resumeId, fileId) {
    await storage.deleteFile(RESUMES_BUCKET_ID, fileId);
    await databases.deleteDocument(DATABASE_ID, RESUMES_COLLECTION_ID, resumeId);
    return resumeId;
  },
};

export default resumeService;
