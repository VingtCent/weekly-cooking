<template>
  <v-app>
    <v-navigation-drawer>
      <NavigationDrawer></NavigationDrawer>
    </v-navigation-drawer>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavigationDrawer from './components/NavigationDrawer.vue'

export default defineComponent({
    name: "App",
    data() {
        return {
        //
        };
    },
    components: { NavigationDrawer }
})
</script>
