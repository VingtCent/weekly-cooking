<template>
  <v-app>
    <v-navigation-drawer app>
      <NavigationDrawer></NavigationDrawer>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-title color="primary">{{ menu.name }}</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavigationDrawer from './components/NavigationDrawer.vue';
import { current } from './repositories/menuRepository';
import shoppingListRepository from './repositories/shoppingListRepository';

export default defineComponent({
  name: "App",
  data() {
    return {
      menu: current
    };
  },
  mounted() {
    shoppingListRepository.init();
  },
  components: { NavigationDrawer }
})
</script>
