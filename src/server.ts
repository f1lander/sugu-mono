import * as errorHandler from "errorhandler";

import app from "./app";

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
const server = app.listen(process.env.PORT, () => {
  console.log(("  App is running at http://localhost:%d in %s mode"), process.env.PORT, app.get("env"));
  console.log(`connected on database ${process.env.MONGO_LOCAL || process.env.MONGOLAB_URI}`);
  console.log(`real database connection ` + process.env[`MONGO_${process.env.CHEKKU_STAGE}`]);
});

process.on("uncaughtException", (err: any) => {
  console.error(err);
});

export default server;