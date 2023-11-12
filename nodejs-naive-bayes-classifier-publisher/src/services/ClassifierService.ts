import { EventPayload } from "../domain/entity/EventPayload"
import { AbstractClassifierRepository } from '../domain/repositories/AbstractClassifierRepository';
import { Classifier, STATUS } from '../domain/entity/Classifier';
import { SQSProvider } from '../infra/providers/SQSProvider';


export class ClassifierService {

    constructor(private classifierRepository: AbstractClassifierRepository, private sqsProvider: SQSProvider) {}

    public async execute(classifierDTO: Classifier) {

        try {
            const { id, name, format, isPublic, owners, path, status, type, size } = classifierDTO
            const eventPayload = new EventPayload({ id, name, format, isPublic, owners, path, status, type })
            
            const classifier = new Classifier({ 
                id, name, format, isPublic, owners, path, type, size, rating: 0, accuracy: 0, status: STATUS.INPROGRESS,
            })

            await this.sqsProvider.sendMessage(JSON.stringify(eventPayload))
            console.log('eventPayload: ', eventPayload)

            await this.classifierRepository.create(classifier)
            console.log('classifier: ', classifier)

            return classifier
            
        } catch (err) {
            throw new Error(err as any)
        }        
    }
}