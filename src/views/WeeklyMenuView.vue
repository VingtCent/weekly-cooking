<template>
    <h1>Recettes de la semaine</h1>
    <v-card>
        <v-card-item>
            <v-card-title>Ajouter une recette</v-card-title>
        </v-card-item>
        <v-card-text>
            <v-autocomplete v-model="selectedRecipy" :items="recipies" item-title="name" item-value="name"></v-autocomplete>
        </v-card-text>
        <v-card-actions><v-btn @click="add">Add</v-btn></v-card-actions>
    </v-card>    
    <v-list :items="weeklyRecipies" item-title="name">
    </v-list>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { RecipyRepository } from "../repositories/recipyRepository";
import type {Recipy} from "../repositories/recipyRepository";

export default defineComponent({
    name: 'RecipiesView',
    data: () => ({
        selectedRecipy: '' as string,
        recipies: [] as Recipy[],
        weeklyRecipies: [] as Recipy[]
    }),
    methods:{
        add(){          
            var addedRecipy = this.recipies.filter(r => r.name == this.selectedRecipy)[0];
            this.weeklyRecipies.push(addedRecipy);
        }
    },
    mounted(){
        this.recipies = new RecipyRepository().get();
    }
    
})
</script>