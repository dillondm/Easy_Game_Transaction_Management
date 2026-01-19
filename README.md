EasyGames Transaction Manager

A full-stack application for managing clients and transactions.
It consists of an ASP.NET Core Web API backend using Dapper and SQL Server, and a React frontend for managing clients and transactions.

Technologies:
Backend (API)
-ASP.NET Core 8.0
-Dapper ORM
-SQL Server
-RESTful API
-Swagger/OpenAPI

Frontend (React)
-React 18
-React Bootstrap
-Axios
-Vite

Backend Setup (ASP.NET Core API)

Open the project in Visual Studio or VS Code.

Update the connection string in appsettings.json to match your SQL Server.

Run the database script in SQL Server to create tables and seed data.

Start the API:

dotnet run


The API will be available at:

https://localhost:7144



Swagger UI

Swagger provides a web interface to view and test your API endpoints.

Open in your browser:

https://localhost:7144/swagger/index.html


You can see all endpoints, required parameters, and responses.


Frontend Setup (React)

Navigate to the React frontend folder (if separate).

Install dependencies:

npm install


Update the API base URL in src/config.js:

export const API_URL = "https://localhost:7144/api";


Start the development server:

npm run dev


Open the frontend in your browser:

http://localhost:5173

Features

Client management (view, search, filter)

Transaction tracking and types

Real-time balance updates

Comment editing for transactions

