<template>    
    <v-container>
        <v-row>            
            <v-col v-for="item in recipies" cols="2">
                <MyRecipy v-bind:recipy="item"></MyRecipy>
            </v-col>
        </v-row>
    </v-container>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import MyRecipy from "../components/Recipy.vue"
import recipyRepository from "../repositories/recipyRepository";
import type { Recipy } from "../repositories/recipyRepository";

export default defineComponent({
    name: "RecipiesView",
    components:{
        MyRecipy
    },
    data: () => ({
        dialog: false,
        recipies: [] as Recipy[],
    }),
    methods: {
        add(){
            this.dialog = true
        }
    },
    mounted() {
        this.recipies = recipyRepository.get();
    }
})
</script>