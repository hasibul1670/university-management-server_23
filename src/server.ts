import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { errorLogger, logger } from './shared/logger';
let serverStatus: Server;
async function server() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info(`🛢 Database is connected successfully`);
    serverStatus = app.listen(config.port, () => {
      logger.info(`listening on port ${config.port}`);
    });
  } catch (err) {
    errorLogger.error('Failed to connect database', err);
  }

  process.on('unhandledRejection', err => {
    errorLogger.error(err);

    if (serverStatus) {
      serverStatus.close(() => {
        errorLogger.error('server closed due to Unhandled Rejection.... ', err);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

server();

process.on('uncaughtException', err => {
  errorLogger.error('server closed due to Unhandled Exception.... ', err);
  process.exit(1);
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM is received of server is shutting down........');
  if (serverStatus) {
    serverStatus.close();
  }
});
