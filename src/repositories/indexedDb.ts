import type { Menu } from "./menuRepository";
import type { Recipy } from "./recipyRepository";
import type { ShoppingList } from "./shoppingListRepository";

export interface IIndexedDb {
    getDb(): Promise<IDBDatabase>;
}

class IndexedDb implements IIndexedDb {
    _ready: Promise<any>;
    _db!: IDBDatabase;
    async getDb(): Promise<IDBDatabase> {
        await this._ready;
        return new Promise<IDBDatabase>((resolve, reject) => {
            resolve(this._db);
        })
    }

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
    }];

    menus: Menu[] = [{
        id: 1,
        name: '2022-11-14',
        date: new Date(2022, 11, 14),
        recipies: [{
            recipyId: 1,
            portions: 2
        }]
    }];

    shoppingLists: ShoppingList[] = [{
        id:1,
        items: [{
            text: 'fromage blanc',
            done:false
        },
        {
            text: 'fruits',
            done: true
        }
    ]
    }]

    /**
     *  https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB
     */
    constructor() {
        this._ready = new Promise((resolve, reject) => {
            const dbOpenRequest = indexedDB.open("weekly-cooking");
            dbOpenRequest.onsuccess = () => {
                console.log("Local database opened");
                this._db = dbOpenRequest.result;
                resolve(undefined);
            };
            dbOpenRequest.onerror = () => {
                console.log("failure while opening database: " + dbOpenRequest.error?.message);
                reject(dbOpenRequest.error?.message);
            };
            dbOpenRequest.onupgradeneeded = (ev) => {
                console.log("New database");
                const db = dbOpenRequest.result;

                const recipyStore = db.createObjectStore('recipies', { keyPath: "id", autoIncrement: true });
                this.recipies.forEach(r => recipyStore.add(r))
                
                const menuStore = db.createObjectStore('menus', { keyPath: "id", autoIncrement: true });
                this.menus.forEach(r => menuStore.add(r))              

                const shoppingListStore = db.createObjectStore('shoppingLists', { keyPath: "id", autoIncrement: true });
                this.shoppingLists.forEach(r => shoppingListStore.add(r))              
            };
        })
    }
}

const weeklyCookingIndexedDb: IIndexedDb = new IndexedDb();
export default weeklyCookingIndexedDb;