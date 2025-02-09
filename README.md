# Getting Started with Cushon Tech Task

This is a front-end application built using **React, TypeScript, and Styled Components** to implement an **ISA investment selection interface** for Cushon.

## Staging Site

A staging site can be used for testing purposes [here](https://cozy-chaja-e76fe5.netlify.app/).

## Features

- **React + TypeScript**: Strongly typed components for better development experience.
- **Styled Components**: Modular CSS-in-JS styling approach.
- **Form Validation**: Client-side validation using a dedicated validation function.
- **Unit & Integration Tests**: Uses Jest and Cucumber for testing.
- **Reusable Components**: Separation of UI components and business logic (to be refined further)

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (Recommended: LTS version)
- [Yarn](https://yarnpkg.com/) (Run `npm install -g yarn` to install)
- [Cucumber.js](https://cucumber.io/) (Needed for running integration tests)

## Installation

Clone the repository and install dependencies:

```sh
# Clone the repository
git clone https://github.com/vertigojones/cushon-tech-task.git
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

## Using the App

### How to Use

1. **Start the application** by running:
   ```sh
   yarn start
   ```
2. **Select a fund** from the dropdown menu.
3. **Enter an investment amount** (minimum £25, maximum £25,000).
4. **Submit the form** by clicking "Invest Now."
5. If the submission is successful, a confirmation message will appear.
6. **Review past investments** displayed below the form.

### Example Usage

- To invest **£5000** in "Cushon Global Bonds":

  1. Select "Cushon Global Bonds."
  2. Enter `5000` in the amount field.
  3. Click "Invest Now."
  4. See the confirmation message and past investment log.

- To test the **£25,000 use case**:
  1. Select "Cushon Global Equity."
  2. Enter `25000` as the amount.
  3. Submit the form.
  4. Ensure validation allows the investment.

## Future Refinement Considerations

1. Refactor into smaller, more reusable components
2. Move type interfaces into a global TS file to be reused
3. Add test unit cases for all components
4. Consider using Storybook for a component library, especially if possibility of sharing with other repos
5. Add Context API provider for data retrieval if this data may be used in other areas of the codebase
6. Create data type for the investment data coming from the API
7. Add commas to denote the thousands of pounds in monetary values
