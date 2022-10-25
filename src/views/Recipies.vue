<template>
    <v-container>
        <v-row>
            <v-col cols="2">
                <v-card>
                    <v-card-title>Ajouter une recette</v-card-title>
                    <v-card-text></v-card-text>
                    <v-card-actions><v-btn icon="mdi-book-plus"></v-btn></v-card-actions>
                </v-card>
            </v-col>
            <v-col v-for="item in recipies" cols="2">
                <v-card>
                    <v-card-title>
                        {{ item.name }}
                    </v-card-title>
                    <v-card-text>                        
                        <v-list v-if="item.ingredients.length > 0">
                            <v-list-item v-for="ingredient in item.ingredients">{{ingredient.name}}</v-list-item>
                        </v-list>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn v-if="item.url != null" icon="mdi-earth" :href="item.url"></v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import recipyRepository from "../repositories/recipyRepository";
import type { Recipy } from "../repositories/recipyRepository";

export default defineComponent({
    name: "RecipiesView",
    data: () => ({
        recipies: [] as Recipy[],
    }),
    mounted() {
        this.recipies = recipyRepository.get();
    }
})
</script>