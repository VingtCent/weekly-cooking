import { initCustomFormatter, ref } from "vue";
import weeklyCookingIndexedDb from "./indexedDb";

export interface ShoppingList {
    id?: number,
    items: Item[]
}

export interface Item {
    text: string,
    done: boolean
}

export interface IShoppingListRepository {
    init(): Promise<boolean>
}

class ShoppingListRepository implements IShoppingListRepository {
    public async init(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.getAll().then(values => 
                {
                    currentShoppingList.value = values[0]; 
                    resolve(true);
                })
                .catch(reason => reject(reason));
        })

    }

    public async getAll(): Promise<ShoppingList[]> {
        var db = await weeklyCookingIndexedDb.getDb();
        return new Promise<ShoppingList[]>((resolve, reject) => {
            const request = db.transaction('shoppingLists', 'readonly').objectStore('shoppingLists').getAll();
            request.onsuccess = () => {
                console.log('get all succeed: ' + request.result)
                resolve(request.result);
            }
            request.onerror = () => {
                console.log(request.error?.message);
                reject(request.error?.message);
            }
        }
        );
    }
}

const shoppingListRepository: IShoppingListRepository = new ShoppingListRepository();

export default shoppingListRepository;
export const currentShoppingList = ref<ShoppingList>({} as ShoppingList); 