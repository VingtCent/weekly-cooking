export interface Menu {
    id:number,
    name: string,
    date?: Date,
    recipies: MenuRecipy[]
}

export interface MenuRecipy {
    recipyId: number,
    portions: number
}

interface IMenuRepository {
    get(): Menu;
}

const menu: Menu = {
    id: 1,
    name: '2022-11-14',
    date: new Date(2022,11,14),
    recipies: [{
        recipyId: 1,        
        portions: 2
    }]
}

class MenuRepository implements IMenuRepository {
    public get(): Menu {
        return menu;
    }
}

const menuRepository = new MenuRepository();

export default menuRepository;
