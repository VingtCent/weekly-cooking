<template>

    <v-dialog v-model="dialog">
        <v-sheet class="pa-2">
            <v-form>
                <v-text-field v-model="recipy.name" label="Nom" type="text"></v-text-field>
                <v-text-field v-model="recipy.url" label="Lien" type="text"></v-text-field>
                <v-text-field name="portions" label="Portions" id="portions" v-model="recipy.portions" type="number">
                </v-text-field>
                <v-spacer></v-spacer>
                Ingrédients:
                <v-list>
                    <v-list-item v-for="(ingredient, index) in recipy.ingredients" v-bind:key="index">
                        <v-text-field :model-value="ingredient"
                            @update:model-value="(value: string) => recipy.ingredients[index] = value"
                            label="Ingredient" type="text" append-icon="mdi-trash-can"
                            @click:append="removeIngredient(index)"></v-text-field>
                    </v-list-item>
                    <v-list-item>
                        <v-icon icon="mdi-plus" @click="addIngredient()"></v-icon>
                    </v-list-item>
                </v-list>
            </v-form>
        </v-sheet>
    </v-dialog>

    <v-card dense class="ma-2" min-width="250">
        <v-card-item>
            <v-card-title>
                {{ recipy.name }}
            </v-card-title>
            <v-card-subtitle>
                {{ recipy.portions }} portion(s)
            </v-card-subtitle>
        </v-card-item>
        <v-card-actions>
            <v-btn color="secondary" variant="text">
                Ingrédients
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="show = !show"></v-btn>
        </v-card-actions>
        <v-card-text v-show="show">
            <v-list dense v-if="recipy.ingredients.length > 0">
                <v-list-item v-for="(ingredient, i) in recipy.ingredients" v-bind:key="i" v-text="ingredient">
                </v-list-item>
            </v-list>
        </v-card-text>
        <v-card-actions>
            <v-icon class="ma-1" v-if="recipy.url != null" icon="mdi-earth" :href="recipy.url" label="Link" />
            <v-spacer></v-spacer>
            <v-icon class="ma-1" icon="mdi-pencil" color="primary" @click="edit()" label="Edit" />
            <v-icon class="ma-1" icon="mdi-trash-can" @click="$emit('remove')" label="Remove" />
        </v-card-actions>
    </v-card>
</template>
<script lang="ts">
import { defineComponent, type PropType } from "vue";
import type { Recipy } from "../repositories/recipyRepository";
import recipyRepository from "../repositories/recipyRepository";

export default defineComponent({
    props: {
        recipy: { type: Object as PropType<Recipy>, required: true },
    },
    emits: ["remove", "update"],
    data: () => ({
        dialog: false,
        show: false
    }),
    watch: {
        dialog(newValue, oldValue) {
            if (this != undefined && !newValue) {
                if (this.recipy.name != '') {
                    recipyRepository.save(this.recipy);
                }
                else {
                    this.$emit('remove');
                }
            }
        }
    },
    mounted() {
        this.dialog = this.recipy.id == undefined;
    },
    methods: {
        edit() {
            this.dialog = true;
        },
        removeIngredient(index: number) {
            this.recipy.ingredients.splice(index, 1);
        },
        addIngredient() {
            this.recipy.ingredients.push("");
        }
    }
})
</script>