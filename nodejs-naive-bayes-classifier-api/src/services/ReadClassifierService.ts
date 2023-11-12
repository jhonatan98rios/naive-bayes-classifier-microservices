import { AbstractClassifierRepository } from "../domain/repositories/AbstractClassifierRepository"

export class ReadClassifierService {

    constructor(private classifierRepository: AbstractClassifierRepository) {}

    public async execute(id: string) {
        try {
            const classifier = await this.classifierRepository.readOneById(id)
            return classifier

        } catch (err) {
            return err
        }
    }
}