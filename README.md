### Document Processing and RAG Chatbot Service
This project implements a backend system that consists of two main components:

## Document Processing Service: Handles the ingestion of documents, creates embeddings, and stores them.
## RAG Chatbot Service: Allows users to interact with the stored embeddings via a chat interface.

## Table of Contents
- Installation
- Usage
- Setup Instructions
- Running the chat service
- Potential Improvements

### Installation
- Clone the repository:
  git clone <repository_link>


## Setup Instructions

- Ensure Node.js is installed:
  Download and install Node.js from nodejs.org.

- Install dependencies:
   Run npm install to install all necessary dependencies.

- Run the Main Server:
  Use node app.js to start the main server on http://localhost:3000.

- Run the Chat Service:
  In a separate terminal, navigate to the project directory and run:
  node chatService.js
  This will start the chat service on http://localhost:3001.

## Usage

- API Endpoints
1. Process Document
   - Endpoint: POST /api/documents/process
   - Description: Uploads a document, creates embeddings, and stores them.
   - Request:
   - Body: Multipart form data with a file field named document.
   - Response: JSON object containing a unique assetId for the document.

2. Start Chat Session
   - Endpoint: POST /api/chat/start
   - Description: Starts a chat session associated with a document's embeddings. 
   - Request:
   - Body: JSON object with the assetId of the document.
   - Response: JSON object containing a chatId for the session.

3. Send Chat Message
   - Endpoint: POST /api/chat/message
   - Description: Sends a message in a chat session and gets a response based on the document's embeddings.
   - Request:
   - Body: JSON object with chatId and message.
   - Response: JSON object with the response from the chatbot.

4. Get Chat History
   - Endpoint: GET /api/chat/history
   - Description: Retrieves the chat history for a specific session.
   - Request:
   - Query: chatId
   - Response: JSON object containing the chat history.

## Postman Collection
You can find the Postman collection for testing the APIs in the repository. (Document Processing  and RAG Chatbot service.postman_collection.json)

## Potential Improvements

1. Database Integration:
-  Replace the file-based storage system with a proper database like MongoDB for better scalability and data management.

2. Advanced Error Handling:
-  Implement more detailed error handling and logging, particularly for edge cases like large file uploads or unsupported file types.

3. Enhanced Security:
-  Add authentication and authorization mechanisms to secure the API endpoints.

4. Improved Embedding Model:
-  Experiment with different embedding models for better accuracy and performance.

5. Containerization:
-  Containerize the application using Docker for easier deployment and scalability.

6. Load Balancing:
-  Implement load balancing to handle multiple concurrent requests more effectively.

7. Frontend Integration:
-  Develop a frontend interface for users to upload documents and interact with the chatbot.
