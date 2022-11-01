import { isProxy, toRaw } from "vue";

export interface Recipy {
    id: number,
    name: string,
    url?: string,
    portions: number,
    ingredients: string[]
}

interface IRecipyRepository {
    getAll(): Promise<Recipy[]>;
    save(recipy: Recipy): Promise<boolean>;
}

class RecipyRepository implements IRecipyRepository {

    recipies: Recipy[] = [{
        id: 1,
        name: 'Paëlla',
        portions: 4,
        ingredients: ['250g riz']
    },
    {
        id: 2,
        name: 'Pizza',
        portions: 3,
        ingredients: ['1 pate pizza']
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
        ingredients: ['6 Poireaux', '50ml Vinaigrette']
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

    public Ready: Promise<any>;
    db!: IDBDatabase;

    /**
     *  https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB
     */
    constructor() {
        this.Ready = new Promise((resolve, reject) => {
            const dbOpenRequest = indexedDB.open("weekly-cooking", 2);
            dbOpenRequest.onsuccess = () => {
                console.log("Local database opened");
                this.db = dbOpenRequest.result;
                resolve(undefined);
            };
            dbOpenRequest.onerror = () => {
                console.log("failure while opening database: " + dbOpenRequest.error?.message);
                reject(dbOpenRequest.error?.message);
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
        })
    }
    async save(recipy: Recipy): Promise<boolean> {
        await this.Ready;
        return new Promise<boolean>((resolve, reject) => {
            const updateRequest = this.db.transaction('recipies', 'readwrite').objectStore('recipies')
                .put(isProxy(recipy) ? toRaw(recipy) : recipy)
            updateRequest.onsuccess = () => {
                console.log(`Recipy ${recipy.name} has been updated`)
                resolve(true)
            };
            updateRequest.onerror = () => {
                console.log(`Error ${updateRequest.error?.message} while updating ${recipy}`)
                reject(updateRequest.error?.message);
            }
        });
    }

    public async getAll(): Promise<Recipy[]> {
        await this.Ready;
        return new Promise<Recipy[]>((resolve, reject) => {
            const request = this.db.transaction('recipies', 'readonly').objectStore('recipies').getAll();
            request.onsuccess = () => {
                console.log('get all succeed: ' + request.result)
                resolve(request.result);
            }
            request.onerror = ev => {
                console.log(request.error?.message);
                reject(request.error?.message);
            }
        }
        );
    }
}

const recipyRepository: IRecipyRepository = new RecipyRepository();
export default recipyRepository;