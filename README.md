## ChatifyAPI

### Overview

ChatifyAPI is a backend API for a chat application. This project supports user authentication, real-time conversations, message handling, and user management. It is built using Node.js and MongoDB and is designed for scalability and ease of use.

---

### Features

- **Authentication**: User registration, login, logout, and token refresh.
- **Conversation Management**: Create conversations and fetch user conversations.
- **Messaging**: Send and receive messages, including file attachments.
- **User Management**: Search users and fetch the logged-in user's details.
- **Default User Configuration**: Automatically assigns default profile pictures and statuses to new users.

---

### Installation

#### Prerequisites

- Node.js (v14 or above)
- MongoDB

#### Steps

1. Clone the repository:

   ```bash
   git clone <REPO_URL>
   cd ChatifyAPI
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:

   ```bash
   touch .env
   ```

4. Populate the `.env` file with appropriate values (see the template below).

5. Start the server:
   - Development mode:
     ```bash
     npm run dev
     ```
   - Production mode:
     ```bash
     npm start
     ```

---

### Environment Variables

Use the following template for your `.env` file:

```plaintext
# PORT NUMBER
PORT=

# Environment
NODE_ENV=

# Database
DATABASE_BASE_URL=
DATABASE_PASSWORD=
DATABASE_NAME=

# User Default Configuration for New User
DEFAULT_PICTURE=
DEFAULT_STATUS=

# JWT
REFRESH_TOKEN_SECRET=
ACCESS_TOKEN_SECRET=

# Client Endpoint
CLIENT_ENDPOINT=
```

**Note**: Replace the placeholders with your actual values in production, but do not hard-code sensitive data like passwords or secrets into your codebase.

---

### API Endpoints

#### Authentication

- **Register**: `POST /api/v1/auth/register`
- **Login**: `POST /api/v1/auth/login`
- **Logout**: `POST /api/v1/auth/logout`
- **Refresh Token**: `POST /api/v1/auth/refreshtoken`

#### Conversation

- **Create Conversation**: `POST /api/v1/conversation`
- **Get User Conversations**: `GET /api/v1/conversation`

#### Messages

- **Send Message**: `POST /api/v1/message`
- **Get Messages**: `GET /api/v1/message/:convo_id`

#### User Management

- **Get Logged User**: `GET /api/v1/user/getme`
- **Search Users**: `GET /api/v1/user?keyword=<keyword>`

---

### Default User Settings

- **Default Picture**: A placeholder image will be assigned to new users if they do not upload a profile picture.
- **Default Status**: `"Hey There I'm using Chatify"`
