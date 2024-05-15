# Social Network API

## Description

This is a social network API designed for a social media startup. The API uses a NoSQL database (MongoDB) to handle large amounts of unstructured data, providing efficient and scalable operations for a social network platform.

## User Story

AS a social media startup  
I WANT an API for my social network that uses a NoSQL database  
SO THAT my website can handle large amounts of unstructured data  

## Acceptance Criteria

GIVEN a social network API:
- WHEN I enter the command to invoke the application
  - THEN my server is started and the Mongoose models are synced to the MongoDB database
- WHEN I open API GET routes in Insomnia for users and thoughts
  - THEN the data for each of these routes is displayed in a formatted JSON
- WHEN I test API POST, PUT, and DELETE routes in Insomnia
  - THEN I am able to successfully create, update, and delete users and thoughts in my database
- WHEN I test API POST and DELETE routes in Insomnia
  - THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list

## Installation

1. Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2. Navigate to the project directory:
    ```bash
    cd social-network-api
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```

## Usage

1. Start the server:
    ```bash
    npm start
    ```
   The server will start and the Mongoose models will be synced to the MongoDB database.

2. Use Insomnia or a similar API client to test the API endpoints.

## API Endpoints

### Users

- **GET** `/api/users`
  - Retrieves all users

- **GET** `/api/users/:userId`
  - Retrieves a single user by ID

- **POST** `/api/users`
  - Creates a new user

- **PUT** `/api/users/:userId`
  - Updates a user by ID

- **DELETE** `/api/users/:userId`
  - Deletes a user by ID

- **POST** `/api/users/:userId/friends/:friendId`
  - Adds a friend to a user's friend list

- **DELETE** `/api/users/:userId/friends/:friendId`
  - Removes a friend from a user's friend list

### Thoughts

- **GET** `/api/thoughts`
  - Retrieves all thoughts

- **GET** `/api/thoughts/:thoughtId`
  - Retrieves a single thought by ID

- **POST** `/api/thoughts`
  - Creates a new thought

- **PUT** `/api/thoughts/:thoughtId`
  - Updates a thought by ID

- **DELETE** `/api/thoughts/:thoughtId`
  - Deletes a thought by ID

### Reactions

- **POST** `/api/thoughts/:thoughtId/reactions`
  - Creates a reaction for a thought

- **DELETE** `/api/thoughts/:thoughtId/reactions/:reactionId`
  - Deletes a reaction by ID

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Insomnia (for testing API endpoints)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## Questions

caiman49clm@gmail.com
