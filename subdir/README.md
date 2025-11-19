# Extend Apps Directory

This project is a web application that displays a directory of "Extend Apps" which can be used to enhance games. Users can browse the directory, filter apps by creator, and view details about each app, including links to their repositories.

## Getting Started

### Prerequisites

- Node.js LTS
- yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/AccelByte/extend-apps-directory
    ```
2.  Navigate to the project directory:
    ```bash
    cd extend-apps-directory
    ```
3.  Install the dependencies:
    ```bash
    yarn install
    ```

### Development

Start the development server:

```bash
yarn dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

To create a production build, run:

```bash
yarn build
```

This will create a `build` directory with the optimized assets. To see production build, run:

```bash
yarn start
```

## Project Structure

-   `app/`: Contains the main application code.
    -   `assets/`: Static assets like images and logos.
    -   `components/`: Reusable React components.
    -   `data/`: JSON data for the Extend apps.
    -   `routes/`: Route components for different pages.
    -   `types/`: TypeScript type definitions.
    -   `app.css`: Global CSS styles.
    -   `root.tsx`: The root component of the application.
    -   `routes.ts`: Route configuration.
-   `public/`: Public assets that are not processed by Vite.
-   `vite.config.ts`: Vite configuration file.
-   `package.json`: Project dependencies and scripts.
-   `tsconfig.json`: TypeScript configuration.
