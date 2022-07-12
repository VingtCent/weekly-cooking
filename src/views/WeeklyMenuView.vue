<template>
    <h1>Recettes de la semaine</h1>
    <v-card class="w-33" density="compact">
        <v-card-item>
            <v-card-title>Ajouter une recette</v-card-title>
        </v-card-item>
        <v-card-text class="py-0">
            <v-autocomplete v-model="recipy" :items="recipies" item-title="name" item-value="id" hide-details>
            </v-autocomplete>            
        </v-card-text>
        <v-card-actions>
            <v-text-field label="Portions" type="number" v-model="portions"></v-text-field>
            <v-btn @click="add" icon="mdi-plus-circle" color="primary"></v-btn>
        </v-card-actions>
    </v-card>
    <v-list :items="weekMenu.recipies">
        <v-list-item v-for="recipy in weekMenu.recipies">{{recipy.recipyName}} {{recipy.portions}}</v-list-item>
    </v-list>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import recipyRepository from "../repositories/recipyRepository";
import weekMenuRepository from "../repositories/weekMenuRepository";
import type { Recipy } from "../repositories/recipyRepository";
import type { WeekMenu } from "../repositories/weekMenuRepository";

export default defineComponent({
    name: "RecipiesView",
    data: () => ({
        recipy: "" as string,
        portions: undefined as number | undefined,
        recipies: [] as Recipy[],
        weekMenu: {} as WeekMenu
    }),
    watch:{
        recipy(newValue, oldValue){
            this.portions = this.recipies.find(p => p.id == +newValue)?.portions
        }
    },
    methods: {
        add() {
            var addedRecipy = this.recipies.filter(r => r.id == +this.recipy)[0];
            this.weekMenu.recipies.push({
                recipyId: addedRecipy.id,
                recipyName: addedRecipy.name,
                portions: addedRecipy.portions
            });
        }
    },
    mounted() {
        this.recipies = recipyRepository.get();
        this.weekMenu = weekMenuRepository.get();
    }
})
</script>