# Getting Started with Cushon Tech Task

This is a front-end application built using **React, TypeScript, and Styled Components** to implement an **ISA investment selection interface** for Cushon.

## Features

- **React + TypeScript**: Strongly typed components for better development experience.
- **Styled Components**: Modular CSS-in-JS styling approach.
- **Form Validation**: Client-side validation using a dedicated validation function.
- **Unit & Integration Tests**: Uses Jest and Cucumber for testing.
- **Reusable Components**: Separation of UI components and business logic.

## Installation

Clone the repository and install dependencies:

```sh
# Clone the repository
git clone https://github.com/your-repo/cushon-tech-task.git
cd cushon-tech-task

# Install dependencies
yarn install
```

## Available Scripts

### `yarn start`

Runs the app.

```sh
yarn start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload when you make changes.

### `yarn test`

Runs Jest and Cucumber tests.

```sh
yarn test
```

Tests include:

- Unit tests for validation functions (`validateForm.ts`).
- Cucumber-based integration tests for form behavior.

### `yarn build`

Creates an optimized production build.

```sh
yarn build
```

The production-ready files are stored in the `build/` directory.

### `yarn eject`

If you need to customize configurations, you can eject the project:

```sh
yarn eject
```

**Warning:** This is a one-way operation and cannot be undone.

## Project Structure

```
├── src/
│   ├── components/        # React components
│   ├── features/          # Cucumber feature files and steps
│   ├── mock/              # Mock data for testing
│   ├── pages/             # Pages on the app as React components
│   ├── styles/            # Styled Components global styles
│   ├── tests/             # Unit and integration tests
│   ├── util/              # Utility functions (e.g., validation)
│   ├── types/             # @todo - add later
│   ├── index.js           # React entry point
│   └── ...
└── README.md
```

## Testing

### Running Jest Unit Tests

To run Jest-based unit tests:

```sh
yarn test
```

### Running Cucumber Tests

Ensure Cucumber is installed:

```sh
npx cucumber-js
```

## Deployment

To deploy the app:

```sh
yarn build
# Deploy the contents of the `build/` folder to your hosting provider
```

## Learn More

- [React Documentation](https://reactjs.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Styled Components](https://styled-components.com/)
- [Jest Testing](https://jestjs.io/)
- [Cucumber Testing](https://cucumber.io/)