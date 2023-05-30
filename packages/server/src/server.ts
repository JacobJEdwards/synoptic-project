// Purpose: Entry point for the application. Creates an instance of the application and starts it.
// import { middleware, errorHandler } from "./middleware";
// import APIRoutes from "./routes/api.router";
// import AuthRoutes from "./routes/auth.router";

import App, { type AppOptions } from "./application";

// port passed to the application. Defaults to 6060
const port: number | string = process.env.PORT || 6060;

const options = {
    port,
    // middleware,
    // apiRoutes: [APIRoutes],
    // authRoutes: [AuthRoutes],
    // otherRoutes: errorHandler,
};

// Create an instance of the application
const app = new App(options as AppOptions);

// Start the application
app.listen();
