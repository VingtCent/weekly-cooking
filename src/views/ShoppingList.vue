<template>
    Shopping List
    <v-list lines="one">
        <v-list-item v-for="item, index in shoppingList.items" :key="index">
            <v-list-item-action start>
                <v-checkbox-btn :model-value="item.done" :label="item.text"></v-checkbox-btn>
            </v-list-item-action>
        </v-list-item>
    </v-list>
</template>
<script lang="ts">
import { currentShoppingList } from '@/repositories/shoppingListRepository';
import { defineComponent } from 'vue';

export default defineComponent({
    name: "ShoppingList",
    data: () => ({
        shoppingList: currentShoppingList
    })
})
</script>