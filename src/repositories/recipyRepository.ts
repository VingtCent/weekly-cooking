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
    unit?: string
}

interface IRecipyRepository {
    get(): Recipy[];
}

class RecipyRepository implements IRecipyRepository {
    db!: IDBDatabase | undefined;
    recipies: Recipy[] = [{
        id: 1,
        name: 'Paëlla',
        portions: 4,
        ingredients: [{ name: 'riz', quantity: 250, unit: 'g' }]
    },
    {
        id: 2,
        name: 'Pizza',
        portions: 3,
        ingredients: [{ name: 'pate pizza', quantity: 1 }]
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
        ingredients: [{ name: 'Poireaux', quantity: 6 }, { name: 'Vinaigrette', quantity: 50, unit: 'ml' }]
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
    /**
     *
     */
    constructor() {
        const dbOpenRequest = indexedDB.open("weekly-cooking");
        dbOpenRequest.onsuccess = () => {
            console.log("Local database opened")
            this.db = dbOpenRequest.result;
        };
        dbOpenRequest.onerror = () => {
            console.log("failure while opening database: " + dbOpenRequest.error?.message)
        }
        dbOpenRequest.onupgradeneeded = () => {
            console.log("New database");
            if (this.db != undefined) {
                const objectStore = this.db.createObjectStore('recipies', { keyPath: "id" });
                objectStore.transaction.oncomplete = () => {
                    const recipiesObjectStore = this.db?.transaction('recipies', 'readwrite').objectStore('recipies');
                    this.recipies.forEach(r => recipiesObjectStore?.add(r))
                }
            }
            else{
                console.log("unable to update database");
            }
        };
    }

    public get(): Recipy[] {
        return this.recipies;
    }
}

const recipyRepository: IRecipyRepository = new RecipyRepository();

export default recipyRepository;