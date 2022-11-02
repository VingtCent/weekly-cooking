<template>
    <v-text-field label="Rechercher" prepend-inner-icon="mdi-magnify" v-model="search"></v-text-field>
    <v-container class="d-flex flex-row flex-wrap">
        <v-card dense class="d-flex justify-center align-center ma-2" min-width="250">
            <v-btn flat icon color="primary" @click="addRecipy()">
                <v-icon>mdi-plus</v-icon>
            </v-btn>
        </v-card>
        <MyRecipy v-for="item in getRecipies()" v-bind:recipy="item" :key="item.id" @remove="removeRecipy(item)">
        </MyRecipy>
    </v-container>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import MyRecipy from "../components/Recipy.vue"
import recipyRepository from "../repositories/recipyRepository";
import type { Recipy } from "../repositories/recipyRepository";

export default defineComponent({
    name: "RecipiesView",
    components: {
        MyRecipy
    },
    data: () => ({
        dialog: false,
        search: '',
        recipies: [] as Recipy[],
    }),
    methods: {
        add() {
            this.dialog = true;
        },
        getRecipies() {
            return this.search == '' ? this.recipies : this.recipies.filter(e => e.name.toLowerCase().includes(this.search.toLowerCase()))
        },
        removeRecipy(recipy: Recipy) {
            this.recipies.splice(this.recipies.indexOf(recipy), 1)
        },
        addRecipy() {
            this.recipies.unshift({
                name: '',
                portions: 4,
                ingredients: [],
            })
        }
    },
    mounted() {
        recipyRepository.getAll().then(values => this.recipies = values.sort((a, b) => (b.id ?? 0) - (a.id ?? 0)));
    }
})
</script>