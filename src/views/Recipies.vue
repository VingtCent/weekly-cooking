<template>
    <v-container>
        <v-row>
            <v-col v-for="item in recipies" cols="2">
                <v-card>
                    <v-card-title>
                        {{ item.name }}
                    </v-card-title>
                    <v-card-text><a href="{{item.url}}">{{item.url}}</a></v-card-text>
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