# TaskManager V2 — Full-Stack Distributed Task Management System

A robust, full-stack web application designed to manage, track, and optimize task workflows. Built with a decoupled architecture featuring an ASP.NET Core Web API backend and a responsive single-page application (SPA) frontend. Developed as part of the Advanced Multifarious Systems curriculum at Florida Tech.

## 🚀 Core Features
* **Asynchronous Architecture:** Decoupled frontend and backend communications utilizing RESTful API design principles.
* **Structured Data Modeling:** Rigid backend data mapping and validation using strongly-typed C# models.
* **Modular Utility Layer:** Centrally managed background tasks, data parsing, and helper services housed in a dedicated helper subsystem.
* **Dynamic UI:** Component-driven user interface ensuring efficient client-side rendering and state management.

## 🛠️ Tech Stack
* **Backend:** C# / ASP.NET Core Web API
* **Frontend:** JavaScript/TypeScript (React/Angular framework inside `ClientApp`)
* **Architecture Pattern:** Model-View-Controller (MVC) / Single Page Application (SPA) Hybrid
* **Development Tools:** VS Code, .NET CLI

## 📂 Repository Anatomy
* `/Controllers`: Handles incoming HTTP REST requests, routes payload data, and orchestrates business logic.
* `/Models`: Defines data schemas, structures, and business entity validation rules.
* `/ClientApp`: The complete standalone front-end application interface.
* `/Utils`: Houses core system utilities, middleware, and helper modules supporting the main application pipeline.

## ⚙️ Setup & Installation

### Prerequisites
* [.NET SDK (6.0 or higher)](https://dotnet.microsoft.com/download)
* [Node.js](https://nodejs.org/) (for client-side dependencies)

### Local Development
1. Clone the repository:
   ```bash
   git clone [https://github.com/liamprogulske/TaskManagerV2.git](https://github.com/liamprogulske/TaskManagerV2.git)
   cd TaskManagerV2
   dotnet restore
   dotnet run
   cd ClientApp
   npm install
   npm start
