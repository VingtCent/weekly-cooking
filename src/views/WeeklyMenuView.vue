<template>
    <h1>Recettes de la semaine</h1>
    <v-card class="w-33" density="compact">
        <v-card-item>
            <v-card-title>Ajouter une recette</v-card-title>
        </v-card-item>
        <v-card-text class="py-0">
            <v-autocomplete v-model="selectedRecipy" :items="recipies" item-title="name" item-value="id" hide-details>
            </v-autocomplete>
            <day-meals-component />
            <v-btn @click="add" icon="mdi-plus-circle" color="primary"></v-btn>
        </v-card-text>
    </v-card>
    <v-list :items="weekMenu.recipies" item-title="recipyName">
    </v-list>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { RecipyRepository } from "../repositories/recipyRepository";
import { Meal, WeekMenuRepository } from "../repositories/weekMenuRepository";
import type { Recipy } from "../repositories/recipyRepository";
import type { WeekMenu } from "../repositories/weekMenuRepository";
import DayMealsComponent from "../components/DayMealsComponent.vue";

export default defineComponent({
    name: "RecipiesView",
    data: () => ({
        selectedRecipy: "" as string,
        recipies: [] as Recipy[],
        weekMenu: {} as WeekMenu,
        days: [1, 2, 3, 4, 5, 6, 7]
    }),
    methods: {
        add() {
            var addedRecipy = this.recipies.filter(r => r.id == +this.selectedRecipy)[0];
            this.weekMenu.recipies.push({
                recipyId: addedRecipy.id,
                recipyName: addedRecipy.name,
                meals: [{ day: 1, meal: Meal.Dinner }, { day: 3, meal: Meal.Dinner }]
            });
        }
    },
    mounted() {
        this.recipies = new RecipyRepository().get();
        this.weekMenu = new WeekMenuRepository().get();
    },
    components: { DayMealsComponent }
})
</script>