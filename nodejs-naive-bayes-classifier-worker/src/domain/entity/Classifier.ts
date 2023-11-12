export enum STATUS {
    READY = 'ready',
    INPROGRESS = 'inProgress',
    FAILED = 'failed'
}

export interface IClassifier {
    id: string
    name: string
    size: number
    format: string
    accuracy: number
    type: string
    status: STATUS
    rating: number
    path: string
    isPublic: boolean
    owners: string[]
}

export class Classifier {
    id: string
    name: string
    size: number
    format: string
    accuracy: number
    type: string
    status: STATUS
    rating: number
    path: string
    isPublic: boolean
    owners: string[]

    constructor({ id, name, size, format, accuracy, type, status, rating, path, isPublic, owners }: IClassifier) {
        this.id = id
        this.name = name
        this.size = size
        this.format = format
        this.accuracy = accuracy
        this.type = type
        this.status = status
        this.rating = rating
        this.path = path
        this.isPublic = isPublic
        this.owners = owners
    }
}