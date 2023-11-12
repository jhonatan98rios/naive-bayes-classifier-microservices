import { randomUUID } from 'crypto'
import { S3Provider } from "../infra/providers/S3Provider";
import { SQSProvider } from "../infra/providers/SQSProvider";
import { MongoDBClassifierRepository } from "../infra/repositories/MongoDBClassifierRepository";
import { ClassifierService } from "../services/ClassifierService";

export default class ClassifierPublisherController {

    public async publish({ body }: any) {
        console.time('benchmark');
        
        const classifierRepository = new MongoDBClassifierRepository()
        const sqsProvider = new SQSProvider()

        const classifierService = new ClassifierService(classifierRepository, sqsProvider)
        const result = await classifierService.execute(body)
        
        console.timeEnd('benchmark');

        return new Response(JSON.stringify(result), {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "http://localhost:3000"
            }
        })
    }

    public async upload({ body }: any) {

        const uuid = randomUUID()

        const { filename, file } = body
        const objectKey = `raw/${uuid}-${filename}`

        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer);
        
        const storageProvider = new S3Provider()
        storageProvider.uploadObject(objectKey, buffer)

        return new Response(JSON.stringify({ path: objectKey, id: uuid }), {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "http://localhost:3000"
            }
        })
    }
}