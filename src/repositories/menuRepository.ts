import { isProxy, toRaw, ref, watch } from "vue";
import weeklyCookingIndexedDb from "./indexedDb";

export interface Menu {
    id?: number,
    name: string,
    date?: Date,
    recipies: MenuRecipy[]
}

export interface MenuRecipy {
    recipyId: number,
    portions: number
}

interface IMenuRepository {
    getAll(): Promise<Menu[]>;
}
class MenuRepository implements IMenuRepository {

    constructor() {
        this.getCurrent().then(m => {
            current.value = m;
            watch(current,
                c => this.save(c),
                { deep: true })
        })
    }

    public async getCurrent(): Promise<Menu> {
        var menus = await this.getAll()
        return menus[0];
    }

    public async getAll(): Promise<Menu[]> {
        var db = await weeklyCookingIndexedDb.getDb();
        return new Promise<Menu[]>((resolve, reject) => {
            const request = db.transaction('menus', 'readonly').objectStore('menus').getAll();
            request.onsuccess = () => {
                console.log('get all succeed: ' + request.result)
                resolve(request.result);
            }
            request.onerror = ev => {
                console.log(request.error?.message);
                reject(request.error?.message);
            }
        });
    }

    public async save(menu: Menu): Promise<boolean> {
        var db = await weeklyCookingIndexedDb.getDb();
        return new Promise<boolean>((resolve, reject) => {
            const updateRequest = db.transaction('menus', 'readwrite').objectStore('menus')
                .put(isProxy(menu) ? toRaw(menu) : menu);
            updateRequest.onsuccess = () => {
                console.log(`Menu ${menu.name} has been updated`);
                menu.id = +updateRequest.result;
                resolve(true);
            };
            updateRequest.onerror = () => {
                console.log(`Error ${updateRequest.error?.message} while updating ${menu}`);
                reject(updateRequest.error?.message);
            }
        });
    }
}

const menuRepository: IMenuRepository = new MenuRepository();

export default menuRepository;
export const current = ref<Menu>({} as Menu); 
