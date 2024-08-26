<template>
    <div>
      <HelloWorld :msg="msg">
      </HelloWorld>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import HelloWorld from "@components/HelloWorld.vue";

const msg = ref("Alias");
</script>

<style scoped>

</style>
