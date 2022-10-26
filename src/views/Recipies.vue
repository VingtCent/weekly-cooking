<template>
    <v-text-field label="Rechercher" prepend-inner-icon="mdi-magnify" v-model="search"></v-text-field>
    <v-container class="d-flex flex-row flex-wrap">
        <MyRecipy v-bind:recipy="item" v-for="item in getRecipies()"></MyRecipy>
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
        getRecipies(){
            return this.search == '' ? this.recipies : this.recipies.filter(e => e.name.toLowerCase().includes(this.search.toLowerCase()))
        }
    },
    mounted() {
        this.recipies = recipyRepository.get();
    }
})
</script>