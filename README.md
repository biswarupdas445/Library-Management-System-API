# Library-Management-System-API
A Library Management System Rest API Nodejs Express Server.
## Used Technologies
* Node.js
* Express.js
* PgSQL
* sequelize
* jsonwebtoken
* bcryptjs
## Database Schema

### Link to the Schema Design
> [https://app.dbdesigner.net/designer/schema/405314](https://app.dbdesigner.net/designer/schema/405314)


### Schema Simplified

**`user_roles`** table
- `createdAt` timestamp with timezone
- `updatedAt` timestamp with timezone
- `roleId` int (foreign key, refers to roles.id)
- `usersId` int (foreign key, refers to Users.id)

**`Users`** table
- `id` int unique AI PK
- `email` (P1, P2, ...) unique secondary string
- `name` varchar
- `dept` varchar
- `createdAt` timestamp with timezone
- `updatedAt` timestamp with timezone

**`records`** table
- `id` int unique AI PK
- `userId` int (foreign key, refers to Users.id)
- `userEmail` varchar
- `ISBN` string (foreign key, refers to books.id)
- `Operation` varchar
- `createdAt` timestamp with timezone
- `updatedAt` timestamp with timezone

**`payments`** table
- `id` int unique AI PK
- `userId` int (foreign key, refers to Users.id)
- `userEmail` varchar
- `payAmt` float
- `Status` varchar
- `createdAt` timestamp with timezone
- `updatedAt` timestamp with timezone

**`books`** table
- `id` int unique AI PK
- `ISBN` varchar (P1, P2, ...) unique secondary string
- `name` varchar
- `subject` varchar
- `auther` varchar
- `copyNo` integer
- `createdAt` timestamp with timezone
- `updatedAt` timestamp with timezone

#### Entity Relationships

Entities | Relationship
--- | ---
Users : roles | n : n | through user_roles
lot : gateway | 1 : 1
bay : sensor | 1 : 1
sensor : status | 1 : n





### Relation Between Tables


## Installation

### In Regular Environment

1. Configure Variables
2. Import MySQL Database
3. Import Dependencies
4. Starting the Server

### In Docker Environment

1. Configure Variables
2. Build and Run Docker Images
3. Manage Instances (Optional)
    3.1. Start Instances
    3.2. Stop Instances

## Application Routes
There are four different routes available in this application as follows.

## API Usage
