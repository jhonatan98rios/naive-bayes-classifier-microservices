import { STATUS } from "../domain/entity/Classifier"
import { AbstractClassifierRepository } from "../domain/repositories/AbstractClassifierRepository"

export class ReadClassifierStatusService {

    constructor(private classifierRepository: AbstractClassifierRepository) {}

    public async execute(id: string) {
        try {
            const classifier = await this.classifierRepository.readOneById(id)
            return { status: classifier?.status ?? STATUS.FAILED }

        } catch (err) {
            return err
        }
    }
}