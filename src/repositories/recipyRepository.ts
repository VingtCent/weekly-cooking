export interface Recipy {
    id: number,
    name: string,
    portions: number,
    ingredients: Ingredient[]
}

export interface Ingredient {
    name: string,
    quantity: number,
    unit: string
}

interface IRecipyRepository {
    get(): Recipy[];
}

class RecipyRepository implements IRecipyRepository {
    public get(): Recipy[] {
        return [{
            id: 1,
            name: 'Paëlla',
            portions: 4,
            ingredients: [{ name: 'riz', quantity: 250, unit: 'g' }]
        },
        {
            id: 2,
            name: 'Pizza',
            portions: 3,
            ingredients: [{ name: 'pate pizza', quantity: 1, unit: '' }]
        }]
    }
}

const recipyRepository: IRecipyRepository = new RecipyRepository();

export default recipyRepository;