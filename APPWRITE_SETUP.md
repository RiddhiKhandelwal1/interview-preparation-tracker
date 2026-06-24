# Appwrite Setup Instructions

This guide walks you through setting up Appwrite for the Interview Prep Tracker application.

## 1. Create an Appwrite Account

1. Go to [Appwrite Cloud](https://cloud.appwrite.io/)
2. Sign up for a free account
3. Create a new **Project** (e.g., "Interview Prep Tracker")
4. Note your **Project ID** from the project settings

## 2. Add a Web Platform

1. In your Appwrite Console, go to **Overview** → **Add a Platform**
2. Select **Web App**
3. Set the name: `Interview Prep Tracker`
4. Set the hostname: `localhost` (for development)
5. Later, add your production domain (e.g., `your-app.vercel.app`)

## 3. Create a Database

1. Go to **Databases** in the sidebar
2. Click **Create Database**
3. Name: `interview_tracker_db`
4. Note the **Database ID**

## 4. Create Collections

### 4.1 Problems Collection

1. Click **Create Collection** → Name: `problems`
2. Note the **Collection ID**
3. Go to **Settings** → **Permissions**:
   - Add role: **Users** → Check: `Create`, `Read`, `Update`, `Delete`
4. Go to **Attributes** tab and create these attributes:

| Attribute Key | Type | Size | Required | Default |
|:---|:---|:---|:---|:---|
| `userId` | String | 255 | Yes | — |
| `title` | String | 500 | Yes | — |
| `difficulty` | String | 50 | Yes | — |
| `topic` | String | 100 | Yes | — |
| `platform` | String | 50 | Yes | — |
| `url` | String | 1000 | No | — |
| `notes` | String | 5000 | No | — |
| `solved` | Boolean | — | No | false |
| `dateSolved` | String | 100 | No | — |

5. Go to **Indexes** tab:
   - Create Index: Key = `userId_index`, Type = `Key`, Attribute = `userId`

### 4.2 Notes Collection

1. Click **Create Collection** → Name: `notes`
2. Note the **Collection ID**
3. **Permissions**: Same as above (Users: CRUD)
4. **Attributes**:

| Attribute Key | Type | Size | Required | Default |
|:---|:---|:---|:---|:---|
| `userId` | String | 255 | Yes | — |
| `title` | String | 500 | Yes | — |
| `content` | String | 10000 | Yes | — |
| `problemId` | String | 255 | No | — |

5. **Indexes**: `userId_index` on `userId`

### 4.3 Interviews Collection

1. Click **Create Collection** → Name: `interviews`
2. Note the **Collection ID**
3. **Permissions**: Same as above
4. **Attributes**:

| Attribute Key | Type | Size | Required | Default |
|:---|:---|:---|:---|:---|
| `userId` | String | 255 | Yes | — |
| `company` | String | 500 | Yes | — |
| `role` | String | 500 | No | — |
| `status` | String | 50 | Yes | — |
| `interviewDate` | String | 100 | No | — |
| `notes` | String | 5000 | No | — |

5. **Indexes**: `userId_index` on `userId`

### 4.4 Resumes Collection

1. Click **Create Collection** → Name: `resumes`
2. Note the **Collection ID**
3. **Permissions**: Same as above
4. **Attributes**:

| Attribute Key | Type | Size | Required | Default |
|:---|:---|:---|:---|:---|
| `userId` | String | 255 | Yes | — |
| `fileId` | String | 255 | Yes | — |
| `fileName` | String | 500 | Yes | — |
| `description` | String | 1000 | No | — |
| `uploadDate` | String | 100 | No | — |

5. **Indexes**: `userId_index` on `userId`

## 5. Create Storage Bucket

1. Go to **Storage** in the sidebar
2. Click **Create Bucket**
3. Name: `resumes`
4. Note the **Bucket ID**
5. Settings:
   - **Maximum File Size**: 10 MB (10000000 bytes)
   - **Allowed File Extensions**: `pdf`
   - **Permissions**: Users → `Create`, `Read`, `Delete`

## 6. Enable Authentication

1. Go to **Auth** → **Settings**
2. Ensure **Email/Password** authentication is enabled (it should be by default)

## 7. Configure Environment Variables

Copy `.env.example` to `.env` and fill in your IDs:

```bash
cp .env.example .env
```

Edit `.env` with your values:

```env
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=<your-project-id>
VITE_APPWRITE_DATABASE_ID=<your-database-id>
VITE_APPWRITE_PROBLEMS_COLLECTION_ID=<your-problems-collection-id>
VITE_APPWRITE_NOTES_COLLECTION_ID=<your-notes-collection-id>
VITE_APPWRITE_INTERVIEWS_COLLECTION_ID=<your-interviews-collection-id>
VITE_APPWRITE_RESUMES_COLLECTION_ID=<your-resumes-collection-id>
VITE_APPWRITE_RESUMES_BUCKET_ID=<your-resumes-bucket-id>
```

## 8. Start Development

```bash
npm install
npm run dev
```

Visit `http://localhost:5173` and create an account to start using the app!

## Security Notes

- **Collection Permissions**: The "Users" role ensures only authenticated users can perform CRUD operations
- **userId Filtering**: The app filters all queries by `userId` to ensure users only see their own data
- **Appwrite Sessions**: Authentication uses HTTP-only cookies, managed by Appwrite's SDK
- **No API Keys in Frontend**: The Appwrite Web SDK uses the Project ID (public) — never include API keys in frontend code
