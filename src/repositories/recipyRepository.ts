export interface Recipy {
    id: number,
    name: string,
    url?: string,
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
        },
        {
            id: 3,
            name: 'Dahl',
            portions: 3,
            ingredients: []
        },
        {
            id: 4,
            name: 'Poireaux vinaigrettes',
            url: 'https://cuisine.voozenoo.fr/2022/10/20/poireaux-vinaigrette/?utm_source=rss&utm_medium=rss&utm_campaign=poireaux-vinaigrette',
            portions: 3,
            ingredients: []
        },
        {
            id: 5,
            name: 'Roti boeuf',
            portions: 3,
            ingredients: []
        },
        {
            id: 6,
            name: 'Pancakes',
            portions: 3,
            ingredients: []
        },
        {
            id: 7,
            name: 'Galettes',
            portions: 3,
            ingredients: []
        },
        {
            id: 8,
            name: 'Pates aux betteraves',
            portions: 3,
            ingredients: []
        },
        {
            id: 9,
            name: 'Oeufs bacon',
            portions: 3,
            ingredients: []
        },
        {
            id: 10,
            name: 'Rougail',
            portions: 3,
            ingredients: []
        }]
    }
}

const recipyRepository: IRecipyRepository = new RecipyRepository();

export default recipyRepository;