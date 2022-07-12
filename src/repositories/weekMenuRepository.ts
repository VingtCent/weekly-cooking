export interface WeekMenu {
    recipies: WeekRecipies[]
}

export interface WeekRecipies {
    recipyId: number,
    recipyName: string,
    portions: number
}

interface IWeekMenuRepository {
    get(): WeekMenu;
}

const weekMenu: WeekMenu = {
    recipies: [{
        recipyId: 1,
        recipyName: "Paëlla",
        portions: 2
    }]
}

class WeekMenuRepository implements IWeekMenuRepository {
    public get(): WeekMenu {
        return weekMenu;
    }
}

const weekMenuRepository = new WeekMenuRepository();

export default weekMenuRepository;
