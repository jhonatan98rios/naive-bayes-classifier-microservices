import { AbstractClassifierRepository } from "../domain/repositories/AbstractClassifierRepository"

export class ListClassifierService {

    constructor(private classifierRepository: AbstractClassifierRepository) {}

    public async execute() {
        try {
            const list = await this.classifierRepository.readAll()
            return list.reverse()

        } catch (err) {
            return err
        }
    }
}