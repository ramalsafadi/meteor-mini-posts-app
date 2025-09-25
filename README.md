# Mini Posts App

This is a take-home assignment to build a small but complete posts application using Meteor, React, and TypeScript. The goal is to assess real-world skills in publication/subscription, method security, optimistic UI, and modern development practices.

---

## Tech Stack

*   **Framework**: Meteor 3.0 (Node.js 20+)
*   **UI Library**: React 18
*   **Language**: TypeScript
*   **Database**: MongoDB
*   **Validation**: Zod
*   **Routing**: React Router v5
*   **Testing**: Meteor's integrated test runner with Mocha & Chai

---

## Features

*   **User Authentication**: Secure user sign-up, sign-in, and sign-out.
*   **Post Management (CRUD)**: Users can create, read, update, and delete their own posts.
*   **Secure Data Layer**:
    *   Publications ensure users can only access data they own.
    *   Methods validate all incoming data and authorize every action.
*   **Optimistic UI**: Interface updates instantly on data mutations for a smooth user experience.
*   **Performance**:
    *   Limited fields are published to the post list to minimize data transfer.
    *   Database indexes are defined for common queries.
*   **Abuse Prevention**: Server-side rate limiting is applied to all write operations.
*   **Quality Assurance**: The project includes unit tests for methods and integration tests for publications.

---

## Setup and Running the Application

### Prerequisites

*   [WSL2](https://learn.microsoft.com/en-us/windows/wsl/install) (for Windows users) to ensure a Linux-based development environment.
*   [Node.js](https://nodejs.org/) (v20.x recommended, via `nvm`).
*   [Meteor](https://www.meteor.com/install) (`npm install -g meteor`).

### Installation & Execution

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd mini-posts-app
    ```

2.  **Install dependencies:**
    ```bash
    meteor npm install
    ```

3.  **Run the application:**
    ```bash
    meteor run
    ```
    The application will be available at `http://localhost:3000`.

### Running Tests

To run the unit and integration tests, use the following command:

```bash
meteor test --driver-package meteortesting:mocha
```

---

## Design Decisions & Trade-offs

### Architecture

The project follows a standard Meteor application structure with a clear separation of concerns:
*   `imports/api/`: Contains all backend logic (collections, methods, publications).
*   `imports/ui/`: Contains all frontend React components, pages, and layouts.
*   `imports/startup/`: Contains initialization code for both the client and server.

### Security Model

Security is a primary concern. The default `insecure` and `autopublish` packages were removed. All data access is governed by a "deny by default" principle:
*   **Publications** are the only way data is sent to the client. Each publication has strict checks to ensure users can only access documents they own (`{ userId: this.userId }`).
*   **Methods** are the only way data is mutated. Each method performs validation with Zod and authorizes the action by checking `this.userId` against the document's owner. `allow/deny` rules were intentionally not used, as method-based security is more explicit and robust.

### Asynchronous Operations (Meteor 3.0)

This project was built using Meteor 3.0, which enforces asynchronous database operations on the server. All database calls within Meteor Methods (`.insertAsync`, `.findOneAsync`, etc.) use `async/await`. This adheres to modern Node.js best practices and improves server performance by preventing I/O blocking.

### Dependency Choices

*   **React Router v5**: During initial setup, React Router v6 presented a module resolution issue with Meteor's build bundler. To ensure stability and focus on the core assignment requirements, I opted for React Router v5, which is a mature and fully compatible choice for this stack.
*   **Custom React Auth Components**: Instead of using a legacy Blaze-based accounts UI, I built a lightweight set of React components for sign-in, sign-up, and user state. This maintains a pure React stack, avoids dependency conflicts (e.g., jQuery), and demonstrates the ability to integrate directly with Meteor's accounts system.

### Design:
please view the design documentation and UX files under ./design-UI

### Roles:
defult admin role:
username: admin
password: password