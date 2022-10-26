<template>

    <v-dialog v-model="dialog">
        <v-card min-width="250px">
            <v-card-text>
                <v-form>
                    <v-text-field v-model="recipy.name" label="Nom" type="text"></v-text-field>
                    <v-text-field v-model="recipy.url" label="Lien" type="text"></v-text-field>
                    <v-spacer></v-spacer>
                    Ingrédients:
                    <v-list >
                        <v-list-item v-for="ingredient in recipy.ingredients" >
                            <v-text-field v-model="ingredient.name" label="Nom" type="text" ></v-text-field> 
                            <v-text-field v-model="ingredient.quantity" label="Quantité" type="number"></v-text-field> 
                            <v-text-field v-model="ingredient.unit" label="Unité" type="text"></v-text-field>
                        </v-list-item>
                    </v-list>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>

    <v-card class="ma-2" min-width="250">
        <v-card-item>
            <v-card-title>
                {{ recipy.name }}
            </v-card-title>
        </v-card-item>
        <v-card-actions>
            <v-btn color="secondary" variant="text">
                Ingrédients
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="show = !show"></v-btn>
        </v-card-actions>
        <v-card-text v-show="show">
            <v-list v-if="recipy.ingredients.length > 0">
                <v-list-item v-for="ingredient in recipy.ingredients">{{ ingredient.name }}
                    {{ ingredient.quantity }}{{ ingredient.unit }}</v-list-item>
            </v-list>
        </v-card-text>
        <v-card-actions>
            <v-btn v-if="recipy.url != null" icon="mdi-earth" :href="recipy.url" label="Link"></v-btn>
            <v-btn icon="mdi-pencil" @click="edit()" label="Edit"></v-btn>
        </v-card-actions>
    </v-card>
</template>
<script lang="ts">
import { defineComponent, type PropType } from "vue";
import type { Recipy } from "../repositories/recipyRepository";

export default defineComponent({
    props: ["recipy"],
    data: () => ({
        dialog: false,
        show: false
    }),
    methods: {
        edit() {
            this.dialog = true
        }
    }
})
</script>