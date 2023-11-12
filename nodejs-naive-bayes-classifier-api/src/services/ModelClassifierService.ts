import natural from 'natural'
import { AbstractClassifierRepository } from '../domain/repositories/AbstractClassifierRepository'
import { AbstractStorageProvider } from '../domain/providers/AbstractStorageProvider'

export class ModelClassifierService {

    constructor(private classifierRepository: AbstractClassifierRepository, private storageProvider: AbstractStorageProvider) {}

    public async execute(body: any) {

        try {
            const { sample, id } = body

            const foundClassifier = await this.classifierRepository.readOneById(id)
            
            if (!foundClassifier) {
                throw new Error("Model does not exist")
            }

            console.log('foundClassifier: ', foundClassifier)

            const object = await this.storageProvider.getObject(foundClassifier.path)

            if (!object) {
                throw new Error("S3 object does not exist")
            }

            const stringifiedModel = Buffer.from(object).toString()
            const model = JSON.parse(stringifiedModel) as natural.BayesClassifier

            const classifier = natural.BayesClassifier.restore(model)
            const result = classifier.classify(sample)
            return { classification: result }

        } catch (err) {
            throw new Error(`Erro: ${err}`)
        }
    }
}