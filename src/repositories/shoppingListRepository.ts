export interface ShoppingList {
    items: Item[]
}

export interface Item {
    name: string,
    quantity?: number,
    unit?: string,
    done: boolean
}

interface IShoppingListRepository {
    get(): ShoppingList;
}

const shoppingList: ShoppingList = {
    items: [{
        name: 'savon',
        done: false
    },
    {
        name: 'liquide vaiselle',
        done: false
    }
    ]
}

class ShoppingListRepository implements IShoppingListRepository {
    public get(): ShoppingList {
        return shoppingList;
    }
}

const recipyRepository: IShoppingListRepository = new ShoppingListRepository();

export default recipyRepository;