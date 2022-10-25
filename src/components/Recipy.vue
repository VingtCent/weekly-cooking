<template>

    <v-dialog v-model="dialog" persistent max-width="290">
        <v-layout row justify-center>
            <v-card>
                <v-card-title class="headline">headline</v-card-title>
                <v-card-text>text</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" flat @click.native="dialog = false">Disagree</v-btn>
                    <v-btn color="primary" flat @click.native="dialog = false">Agree</v-btn>
                </v-card-actions>
            </v-card>
        </v-layout>
    </v-dialog>

    <v-card>
        <v-card-title>
            {{ recipy.name }}
        </v-card-title>
        <v-card-text>
            <v-list v-if="recipy.ingredients.length > 0">
                <v-list-item v-for="ingredient in recipy.ingredients">{{ ingredient.name }}
                    {{ ingredient.quantity }}{{ ingredient.unit }}</v-list-item>
            </v-list>
        </v-card-text>
        <v-card-actions>
            <v-btn v-if="recipy.url != null" icon="mdi-earth" :href="recipy.url"></v-btn>
            <v-btn icon="mdi-pencil" @click="edit" />
            <v-btn icon="mdi-delete" />
        </v-card-actions>
    </v-card>
</template>
<script lang="ts">
import { defineComponent, type PropType } from "vue";
import type { Recipy } from "../repositories/recipyRepository";

export default defineComponent({
    props: ["recipy"],
    data: () => ({
        dialog: false
    }),
    methods: {
        edit() {
            this.dialog = true
        }
    }
})
</script>