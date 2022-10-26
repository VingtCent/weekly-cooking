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
    getAll(callback: (a: Recipy[]) => void): void;
}

class RecipyRepository implements IRecipyRepository {

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
        const dbOpenRequest = indexedDB.open("weekly-cooking", 2);

        dbOpenRequest.onsuccess = () => {
            console.log("Local database opened")
        };

        dbOpenRequest.onerror = () => {
            console.log("failure while opening database: " + dbOpenRequest.error?.message)
        };

        dbOpenRequest.onupgradeneeded = () => {
            console.log("New database");
            const db = dbOpenRequest.result;
            const objectStore = db.createObjectStore('recipies', { keyPath: "id" });
            objectStore.createIndex('by_name', 'name', { unique: false })
            objectStore.transaction.oncomplete = () => {
                console.log("Fill database");
                const recipiesObjectStore = db.transaction('recipies', 'readwrite').objectStore('recipies');
                this.recipies.forEach(r => recipiesObjectStore?.add(r))
            }
        };
    }

    public getAll(callback: (a: Recipy[]) => void): void {
        const dbOpenRequest = indexedDB.open('weekly-cooking', 2);
        dbOpenRequest.onsuccess = () =>{
            const request = dbOpenRequest.result.transaction('recipies', 'readonly').objectStore('recipies').getAll();
            request.onsuccess = ev => {
                console.log('get all succeed: ' + request.result)
                callback(request.result);
            }
        }
    }
}

const recipyRepository: IRecipyRepository = new RecipyRepository();

export default recipyRepository;