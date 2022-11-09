export interface Menu {
    id: number,
    name: string,
    date?: Date,
    recipies: MenuRecipy[]
}

export interface MenuRecipy {
    recipyId: number,
    portions: number
}

interface IMenuRepository {
    getCurrent(): Menu;
    getAll(): Menu[];
    create(): Menu;
}
class MenuRepository implements IMenuRepository {
    menus: Menu[] = [{
        id: 1,
        name: '2022-11-14',
        date: new Date(2022, 11, 14),
        recipies: [{
            recipyId: 1,
            portions: 2
        }]
    }];
    public getCurrent(): Menu {
        return this.menus[0];
    }

    public getAll(): Menu[] {
        return this.menus;
    }

    public create(): Menu {
        var newMenu: Menu = {
            id: this.menus.length + 1,
            name: '',
            recipies: []
        };
        return newMenu;
    }
}

const menuRepository = new MenuRepository();

export default menuRepository;
