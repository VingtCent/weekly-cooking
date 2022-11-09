<template>
    <h1>Menus</h1>
    <v-card density="compact">
        <v-card-title></v-card-title>
        <v-card-item>
            <v-card-title>
                <v-text-field name="name" label="Nom" id="currentMenuName" :model-value="currentMenu.name"></v-text-field>
            </v-card-title>
        </v-card-item>

        <v-card-text>

            <v-container>
                <v-row>
                    <v-col>
                        Recettes:
                    </v-col>
                </v-row>

                <v-row v-for="recipy, index in currentMenu.recipies">
                    <v-col cols="7">
                        <v-autocomplete v-model="recipy.recipyId" :items="recipies" item-title="name" item-value="id"
                            density="compact" hide-details>
                        </v-autocomplete>
                    </v-col>
                    <v-col cols="4">
                        <v-text-field name="portions" label="portions" density="compact" type="number"
                            :model-value="recipy.portions"></v-text-field>
                    </v-col>
                    <v-col cols="1">
                        <v-icon class="ma-1" icon="mdi-trash-can" color="warning" label="Retirer la recette du menu"
                            @click="removeRecipy(index)" />
                    </v-col>
                </v-row>
                <v-row>
                    <v-icon icon="mdi-book-plus" color="primary" @click="add()"></v-icon>
                </v-row>
            </v-container>
        </v-card-text>
    </v-card>

</template>

<script lang="ts">
import { defineComponent } from "vue";
import recipyRepository from "../repositories/recipyRepository";
import menuRepository from "../repositories/menuRepository";
import type { Recipy } from "../repositories/recipyRepository";
import type { Menu } from "../repositories/menuRepository";

export default defineComponent({
    name: "Menus",
    data: () => ({
        recipies: [] as Recipy[],
        currentMenu: {} as Menu,
        menus: [] as Menu[]
    }),
    methods: {
        add() {
            this.currentMenu.recipies.unshift({ recipyId: 1, portions: 4 })
        },
        removeRecipy(index: number) {
            this.currentMenu.recipies.splice(index, 1);
        }
    },
    mounted() {
        recipyRepository.getAll()
            .then(values => this.recipies = values);
        this.currentMenu = menuRepository.get();
    }
})
</script>