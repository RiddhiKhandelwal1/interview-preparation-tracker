/**
 * Authentication Service — wraps Appwrite Account SDK.
 */
import { account, ID } from '../appwrite/config';

const authService = {
  async signup({ email, password, name }) {
    await account.create(ID.unique(), email, password, name);
    await account.createEmailPasswordSession(email, password);
    return await account.get();
  },
  async login({ email, password }) {
    await account.createEmailPasswordSession(email, password);
    return await account.get();
  },
  async logout() {
    await account.deleteSession('current');
  },
  async getCurrentUser() {
    try { return await account.get(); }
    catch { return null; }
  },
};

export default authService;
