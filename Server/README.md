# API Documentation

## User Routes

### Register User
- **Endpoint:** `/user/register`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "userName": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Responses:**
  - **201 Created:**
    ```json
    {
      "user": {
        "email": "string",
        "id": "string",
        "userName": "string"
      }
    }
    ```
  - **400 Bad Request:** "All fields Are Required"
  - **400 Bad Request:** "Please enter a valid email"
  - **409 Conflict:** "User with email Already exists Please login to continue or try using different email to signup."
  - **500 Internal Server Error:** "Internal Server Error"

### Login User
- **Endpoint:** `/user/login`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Responses:**
  - **201 Created:**
    ```json
    {
      "user": {
        "email": "string",
        "_id": "string",
        "userName": "string"
      }
    }
    ```
  - **400 Bad Request:** "All fields Are Required"
  - **400 Bad Request:** "Please enter a valid email"
  - **400 Bad Request:** "Invalid Credentials"
  - **500 Internal Server Error:** "Internal Server Error"

### Get User Info
- **Endpoint:** `/user/user-info`
- **Method:** `GET`
- **Headers:** `Authorization: Bearer <token>`
- **Responses:**
  - **200 OK:**
    ```json
    {
      "user": {
        "userName": "string",
        "email": "string",
        "password": "string"
      }
    }
    ```
  - **400 Bad Request:** "User not authenticated"
  - **401 Unauthorized:** "Access denied!, No token provided."
  - **400 Bad Request:** "Invalid token."

## Note Routes

### Create Note
- **Endpoint:** `/notes/create-note`
- **Method:** `POST`
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "title": "string",
    "content": "string",
    "image": "string"
  }
  ```
- **Responses:**
  - **201 Created:**
    ```json
    {
      "userId": "string",
      "title": "string",
      "content": "string",
      "image": "string",
      "createdAt": "date"
    }
    ```
  - **400 Bad Request:** "All fields are Required"
  - **409 Conflict:** "Error message"

### Get Notes
- **Endpoint:** `/notes/get-notes`
- **Method:** `GET`
- **Headers:** `Authorization: Bearer <token>`
- **Responses:**
  - **200 OK:**
    ```json
    [
      {
        "userId": "string",
        "title": "string",
        "content": "string",
        "image": "string",
        "createdAt": "date"
      }
    ]
    ```
  - **404 Not Found:** "Error message"

### Update Note
- **Endpoint:** `/notes/update-note`
- **Method:** `PATCH`
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "noteId": "string",
    "title": "string",
    "content": "string"
  }
  ```
- **Responses:**
  - **200 OK:**
    ```json
    {
      "title": "string",
      "content": "string",
      "image": "string"
    }
    ```
  - **400 Bad Request:** "NoteId is required"

### Delete Note
- **Endpoint:** `/notes/delete-note`
- **Method:** `DELETE`
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "noteId": "string"
  }
  ```
- **Responses:**
  - **200 OK:**
    ```json
    {
      "message": "Note deleted successfully."
    }
    ```
  - **400 Bad Request:** "Note Id required"
  - **400 Bad Request:** "No note Found with this userId"

### Search Note
- **Endpoint:** `/notes/get-note`
- **Method:** `GET`
- **Headers:** `Authorization: Bearer <token>`
- **Query Parameters:**
  - `query`: `string`
- **Responses:**
  - **200 OK:**
    ```json
    [
      {
        "userId": "string",
        "title": "string",
        "content": "string",
        "image": "string",
        "createdAt": "date"
      }
    ]
    ```
  - **400 Bad Request:** "query is required to search for note with similar title"
  - **400 Bad Request:** "No such Notes found"
