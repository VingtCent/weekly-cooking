export interface Recipy {
    id: number,
    name: string
}

interface IRecipyRepository {
    get(): Recipy[];
}

export class RecipyRepository implements IRecipyRepository {
    public get(): Recipy[] {
        return [{
            id: 1,
            name: 'Paëlla',
        },
        {
            id: 2,
            name: 'Pizza'
        }]
    }
}
