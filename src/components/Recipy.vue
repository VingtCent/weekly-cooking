<template>

    <v-dialog v-model="dialog">
        <v-card min-width="250px">
            <v-card-text>
                <v-form>
                    <v-text-field v-model="recipy.name" label="Nom" type="text"></v-text-field>
                    <v-text-field v-model="recipy.url" label="Lien" type="text"></v-text-field>
                    <v-spacer></v-spacer>
                    Ingrédients:
                    <v-list>
                        <v-list-item v-for="(ingredient, index) in recipy.ingredients" v-bind:key="index">
                            <v-text-field :model-value="ingredient"
                                @update:model-value="(value: string) => recipy.ingredients[index] = value"
                                label="Ingredient" type="text"></v-text-field>
                            <v-btn icon="mdi-remove" @click="removeIngredient(index)" />
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
                <v-list-item v-for="(ingredient, i) in recipy.ingredients" v-bind:key="i">
                    {{ ingredient }}
                </v-list-item>
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
    props: {
        recipy: { type: Object as PropType<Recipy>, required: true },
    },
    data: () => ({
        dialog: false,
        show: false
    }),
    methods: {
        edit() {
            this.dialog = true
        },
        removeIngredient(index: number) {
            this.recipy.ingredients.splice(index)
        }
    }
})
</script>