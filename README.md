# TaskManager V2 — Full-Stack Distributed Task Management System

A robust, full-stack web application designed to manage, track, and optimize task workflows. Built with a decoupled architecture featuring an ASP.NET Core Web API backend and a responsive single-page application (SPA) frontend. Developed as part of the Advanced Multifarious Systems curriculum at Florida Tech.

## 🚀 Core Features & Engineering Solutions

* **Secure JWT Authentication System:** Implements a custom cryptographic utility using `SymmetricSecurityKey` and `HmacSha256Signature` to sign user data payloads into cryptographically secure, stateless JSON Web Tokens (JWT) with automatic 10-hour expirations.
* **Automated ORM Database Migrations:** Utilizing Entity Framework Core, the system programmatically intercepts application startup via an asynchronous migration-checking pipeline (`GetPendingMigrationsAsync`) to safely execute or flag necessary SQL structural updates before exposing application endpoints.
* **Multi-Environment Configuration Security:** Protects sensitive cryptographic keys by leveraging local environment secret managers (`dotnet secrets`) during development, preventing accidental credential leaks to public version control.
* **Asynchronous Subprocess Notifications:** Integrates a zero-overhead native OS desktop toast helper by safely spawning non-blocking system background processes (`System.Diagnostics.Process`) without obstructing core API thread pools.
* **Local Network Bridging Support:** Dynamically overrides default Web Host configuration parameters to conditionally expose the backend service API across an encrypted local area network environment (`http://*:5000`).

## 🛠️ Tech Stack
* **Backend:** C# / .NET Core Web API / Entity Framework Core
* **Frontend:** JavaScript/TypeScript (React/Angular framework inside `ClientApp`)
* **Security & Auth:** System.IdentityModel.Tokens.Jwt, HMAC-SHA256 Encryption
* **Database:** SQL-based storage provisioned through EF Core migrations
* **Development Tools:** VS Code, .NET CLI, Dotnet Secrets Management

## 📂 Repository Anatomy
* `/Controllers`: Handles incoming HTTP REST requests, routes payload data, and orchestrates business logic.
* `/Models`: Defines data schemas, structures, and business entity validation rules.
* `/ClientApp`: The complete standalone front-end application interface.
* `/Utils`: Houses core system engineering utilities including:
  * `TokenGenerator.cs`: Manages runtime claim serialization and secure token generation workflows.
  * `Utils.cs`: Configures startup web host environments, database readiness verifications, and external process triggering.

## ⚙️ Setup & Installation

### Prerequisites
* [.NET SDK (6.0 or higher)](https://dotnet.microsoft.com/download)
* [Node.js](https://nodejs.org/) (for client-side dependencies)

### Local Development
Clone the repository:
   ```bash
   git clone [https://github.com/liamprogulske/TaskManagerV2.git](https://github.com/liamprogulske/TaskManagerV2.git)
   cd TaskManagerV2
   
   dotnet user-secrets set "JWT_KEY" "YourSuperSecretDevelopmentKeyHere123!"

   dotnet restore
   dotnet ef database update
   dotnet run

   cd ClientApp
   npm install
   npm start
