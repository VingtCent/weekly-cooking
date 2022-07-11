export interface WeekMenu {
    recipies: WeekRecipies[]
}

export interface WeekRecipies {
    recipyId: number,
    recipyName: string,
    meals: DayMeal[]
}

export interface DayMeal {
    day: number,
    meal: Meal
}

export enum Meal {
    Lunch,
    Dinner
}

interface IWeekMenuRepository {
    get(): WeekMenu;
}

export class WeekMenuRepository implements IWeekMenuRepository {
    public get(): WeekMenu {
        return {
            recipies: [{
                recipyId: 1,
                recipyName: "Paëlla",
                meals: [{ day: 1, meal: Meal.Dinner }, { day: 3, meal: Meal.Dinner }]
            }]
        }
    }
}
