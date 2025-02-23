# Yuno IT frontend

## Introduction

This is the frontend of the Yuno IT project. It is a Next.js application that uses the HeroUI library for the UI components.

## Environment

The project is built using Node.js and npm. It requires a recent version of Node.js to run.

Environment variables are used to configure the application. The following envirnment are available:

- Development (default)
- Test
- Production

Following NODE_ENV environment variable is used to set the environment:

- NODE_ENV=development `next dev`
- NODE_ENV=test, when running tests with Jest for example
- NODE_ENV=production `next build && next start`

## Prerequisites

Before you can start using the project, you need to have the following installed:

- Node.js (version 22 or higher)
- npm (version 10 or higher)

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/twentycent/yuno-it.git
```

2. Navigate to the frontend directory:

```bash
cd frontend
```

3. Install the dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:3000`.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request on the GitHub repository.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
