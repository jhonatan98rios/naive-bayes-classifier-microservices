import { Consumer } from 'sqs-consumer';
import ClasssifierController from './controllers';
import * as dotenv from 'dotenv'
import Database from './infra/database/connection';

dotenv.config()
Database.connect()

const classsifierController = new ClasssifierController()

const app = Consumer.create({
    queueUrl: "https://sqs.us-east-1.amazonaws.com/757165215724/naive-bayes-classifier-model-queue",
    region: "us-east-1",
    handleMessage: classsifierController.handle
});

app.on('error', (err) => {
    console.error(err.message);
});

app.on('processing_error', (err) => {
    console.error(err.message);
});

app.on('timeout_error', (err) => {
    console.error(err.message);
});

app.start();
console.log("Start consuming")

