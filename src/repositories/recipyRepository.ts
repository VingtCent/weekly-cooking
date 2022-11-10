import { isProxy, toRaw } from "vue";
import weeklyCookingIndexedDb from "./indexedDb";

export interface Recipy {
    id?: number,
    name: string,
    url?: string,
    portions: number,
    ingredients: string[]
}

interface IRecipyRepository {
    getAll(): Promise<Recipy[]>;
    save(recipy: Recipy): Promise<boolean>;
    remove(recipy: Recipy): Promise<boolean>;
}

class RecipyRepository implements IRecipyRepository {

    async remove(recipy: Recipy): Promise<boolean> {
        var db = await weeklyCookingIndexedDb.getDb();
        return new Promise<boolean>((resolve, reject) => {
            const deleteRequest = db.transaction('recipies', 'readwrite').objectStore('recipies')
                .delete(recipy.id!);
            deleteRequest.onsuccess = () => {
                console.log(`Recipy ${recipy.name} has been deleted`);
                resolve(true);
            }
            deleteRequest.onerror = () => {
                console.log(`Error ${deleteRequest.error?.message} while deleting ${recipy}`);
                reject(deleteRequest.error?.message);
            }
        })
    }

    async save(recipy: Recipy): Promise<boolean> {
        var db = await weeklyCookingIndexedDb.getDb();
        return new Promise<boolean>((resolve, reject) => {
            const updateRequest = db.transaction('recipies', 'readwrite').objectStore('recipies')
                .put(isProxy(recipy) ? toRaw(recipy) : recipy);
            updateRequest.onsuccess = () => {
                console.log(`Recipy ${recipy.name} has been updated`);
                recipy.id = +updateRequest.result;
                resolve(true);
            };
            updateRequest.onerror = () => {
                console.log(`Error ${updateRequest.error?.message} while updating ${recipy}`);
                reject(updateRequest.error?.message);
            }
        });
    }

    public async getAll(): Promise<Recipy[]> {
        var db = await weeklyCookingIndexedDb.getDb();
        return new Promise<Recipy[]>((resolve, reject) => {
            const request = db.transaction('recipies', 'readonly').objectStore('recipies').getAll();
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