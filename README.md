🚀 GraphQL Posts App (React + TypeScript)

A small React application built using Create React App (CRA) and TypeScript, consuming the public GraphQL API from GraphQLZero.
This project demonstrates the use of GraphQL queries, mutations, routing, reusable components, and clean UI state management.

📌 Features
✔ 1. Posts List Page

Fetch a paginated list of posts via GraphQL query

Show:

Post title

Shortened post body (100 chars)

Author name

Pagination (Next / Previous buttons)

✔ 2. Post Detail Page

Show full:

Title

Body

Display author details:

Name

Email

Show all comments under the post:

Comment name

Comment email

Comment body

✔ 3. Create Post (Mutation)

Form with:

Title

Body

User ID

Submits GraphQL mutation to create post

Shows success message

Automatically refreshes and adds the new post to the list

🛠 Tech Stack
Area	Technology
Frontend	React + TypeScript (Create React App)
GraphQL Client	Native fetch + custom wrapper
Routing	React Router
Styling	CSS Modules / Plain CSS
API	https://graphqlzero.almansi.me/api

📁 Folder Structure
graphql-posts/
│── public/
│── src/
│   ├── api/               # GraphQL client & query/mutation functions
│   ├── components/        # UI components (PostCard, PostsList, etc)
│   ├── hooks/             # Custom hooks (useQuery, useMutation)
│   ├── types/             # TypeScript types
│   ├── App.tsx            # Routing setup
│   ├── index.tsx          # Entry point
│   └── styles/ (optional)
│
└── README.md

⚙️ Setup & Run Instructions
1. Clone repository
git clone https://github.com/yourusername/graphql-posts.git
cd graphql-posts

2. Install dependencies
npm install

3. Run development server
npm start


The app will run at:
👉 http://localhost:3000

🧪 API References
GraphQL Queries Used

posts(options: {paginate})

post(id)

comments(postId)

user(id)

GraphQL Mutations Used

createPost(input: {title, body, userId})

📌 Additional Notes

GraphQLZero does not persist data, so created posts exist only in the response

All components follow clean separation:

UI components

API logic

Reusable hooks

All commits follow descriptive messages (no “update”, “fix”)

🎯 Summary

This project demonstrates core frontend skills:

React component architecture

Pagination handling

State management with hooks

GraphQL queries & mutations

Routing in a multi-page app

Clean and reusable code patterns

It fulfills all requirements of the assessment.