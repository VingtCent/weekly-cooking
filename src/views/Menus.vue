<template>
    <h1>Menus</h1>
    <v-card density="compact">
        <v-card-title></v-card-title>
        <v-card-item>
            <v-card-title>
                <v-text-field name="name" label="Nom" id="currentMenuName" v-model="currentMenu.name"></v-text-field>
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
                        <v-autocomplete v-model="recipy.recipyId"
                            :items="recipies"
                            item-title="name" item-value="id" density="compact" hide-details>
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
                    <v-icon icon="mdi-book-plus" color="primary" @click="addRecipies()"></v-icon>
                </v-row>
            </v-container>
        </v-card-text>
    </v-card>

    <v-btn flat icon color="primary" @click="add()">
        <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-list>
        <v-list-item v-for="menu, index in menus.filter(m => m != currentMenu)" :key="index">
            <v-btn color="success" @click="open(menu)">{{ menu.name }}</v-btn>
        </v-list-item>
    </v-list>

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
        addRecipies() {
            this.currentMenu.recipies.unshift({ recipyId: 1, portions: 4 })
        },
        removeRecipy(index: number) {
            this.currentMenu.recipies.splice(index, 1);
        },
        open(menu: Menu) {
            this.currentMenu = menu;
        },
        add() {
            this.currentMenu = menuRepository.create();
            this.menus.unshift(this.currentMenu);
        }
    },
    mounted() {
        recipyRepository.getAll()
            .then(values => this.recipies = values);
        this.currentMenu = menuRepository.getCurrent();
        this.menus = menuRepository.getAll();
    }
})
</script>