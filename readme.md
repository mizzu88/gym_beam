# Gym_beam server

Project is running simple http server implemented in Node.js using Typescript. Server is running on local computer using port 3000. Server includes one post endpoint: `http://localhost:3000/calculatPickingOrders`.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)

## Getting Started

Full project you can find on Github public repository: `https://github.com/mizzu88/gym_beam`.

### Prerequisites

List any software or tools that need to be installed before setting up the project.

- Node.js (version 16.14.0) or higher
- npm (version 8.3.1) or higher

### Installation

1. Clone the repository.
2. Navigate to the project directory: `cd GYM_BEAM`.
3. Install dependencies: `npm install`.

## Usage

For exeuting of this server run command `npx ts-node src/index.ts` from root directory.
After thsi command is endpoint `http://localhost:3000/calculatPickingOrders` accessible.

## API Documentation

For API documentation you can access the Swagger UI endpoint: `http://localhost:3000/api-docs`. There you can find standard input object and response objects. You can also try execute this endpoint with button `Execute` and defined request body.
