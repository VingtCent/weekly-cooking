<template>
    <v-container>
        <v-row no-gutters>
            <v-col col="2">Jour</v-col>
            <v-col v-for="day in days" class="text-center">
                {{day}}
            </v-col>
        </v-row>
        <v-row no-gutters align="center">
            <v-col cols="2">Midi</v-col>
            <v-col v-for="day in days" >
                <v-checkbox hide-details density="compact"></v-checkbox>
            </v-col>
        </v-row>
        <v-row no-gutters align="center">
            <v-col cols="2" >Soir</v-col>
            <v-col v-for="day in days">
                <v-checkbox hide-details density="compact"></v-checkbox>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { DayMeal } from '../repositories/weekMenuRepository'
export default defineComponent({
    data() {
        return {
          days : ['L', 'M', 'M', 'J', 'V', 'S', 'D'] 
        };
    }
})
</script>