<template>
  <div
    class="min-h-screen min-w-screen max-h-screen max-w-screen flex flex-row bg-gray-100 text-gray-800"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const config = useRuntimeConfig();
</script>
