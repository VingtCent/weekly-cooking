export interface Recipy {
    name: string
}

interface IRecipyRepository {
    get(): Recipy[];
}

export class RecipyRepository implements IRecipyRepository {
    public get(): Recipy[] {
        return [{
            name: 'Paëlla'
        },
        {
            name: 'Pizza'
        }]
    }
}
