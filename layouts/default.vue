<template>
  <div
    class="flex flex-col min-h-screen min-w-screen max-h-screen max-w-screen overflow-y-hidden overflow-x-hidden relative"
  >
    <div class="bg-red-500 text-red-100 w-full py-4 px-8 lg:hidden">
      Handel is currently running on a window with less than 1024 pixels in
      width! Some features of Handel may not work or display properly.
    </div>
    <div
      class="bg-red-500 text-red-100 w-screen h-screen flex flex-col p-8 md:hidden absolute z-[999]"
    >
      <h1 class="text-3xl font-semibold text-gray-100 mb-4">Display issue!</h1>
      <p class="mb-4">
        Handel is currently running on a window with less than 768 pixels in
        width! Some features of Handel may not work or display properly.
      </p>
      <p>
        For the best experience, it is recommended to use a tablet with a
        resolution of 1280 pixels in width (scaled or not); although it can also
        work on desktops and laptops.
      </p>
    </div>
    <div
      class="min-h-screen min-w-screen max-h-screen max-w-screen flex flex-row bg-gray-100 text-gray-800"
    >
      <div class="bg-gray-200 p-4 flex flex-col gap-y-6">
        <nuxt-link to="/" class="flex flex-col w-full group">
          <div
            :class="
              (route.path === '/' ? 'bg-indigo-300' : '') +
              ' rounded-full bg-opacity-50 px-5 py-1 group group-hover:bg-indigo-200 group-hover:bg-opacity-50'
            "
          >
            <Icon
              name="mdi:cart"
              class="text-2xl text-indigo-900 group-hover:scale-110 group-hover:text-indigo-800"
              v-if="route.path === '/'"
            />
            <Icon
              name="mdi:cart-outline"
              class="text-2xl text-gray-800 group-hover:scale-110 group-hover:text-indigo-700"
              v-else
            />
          </div>
          <p
            :class="
              (route.path === '/' ? 'text-indigo-900' : 'text-gray-700') +
              ' text-center font-medium'
            "
          >
            Cashier
          </p>
        </nuxt-link>
        <nuxt-link to="/items" class="flex flex-col w-full group">
          <div
            :class="
              (route.path === '/items' ? 'bg-indigo-300' : '') +
              ' rounded-full bg-opacity-50 px-5 py-1 group group-hover:bg-indigo-200 group-hover:bg-opacity-50'
            "
          >
            <Icon
              name="mdi:list-box"
              class="text-2xl text-indigo-900 group-hover:scale-110 group-hover:text-indigo-800"
              v-if="route.path === '/items'"
            />
            <Icon
              name="mdi:list-box-outline"
              class="text-2xl text-gray-800 group-hover:scale-110 group-hover:text-indigo-700"
              v-else
            />
          </div>
          <p
            :class="
              (route.path === '/items' ? 'text-indigo-900' : 'text-gray-700') +
              ' text-center font-medium'
            "
          >
            Items
          </p>
        </nuxt-link>
        <nuxt-link
          to="/history"
          class="flex flex-col w-full group"
          v-if="config.public.historyDatabase !== ''"
        >
          <div
            :class="
              (route.path === '/history' ? 'bg-indigo-300' : '') +
              ' rounded-full bg-opacity-50 px-5 py-1 group group-hover:bg-indigo-200 group-hover:bg-opacity-50'
            "
          >
            <Icon
              name="mdi:history"
              class="text-2xl text-indigo-900 group-hover:scale-110 group-hover:text-indigo-800"
              v-if="route.path === '/history'"
            />
            <Icon
              name="mdi:history"
              class="text-2xl text-gray-800 group-hover:scale-110 group-hover:text-indigo-700"
              v-else
            />
          </div>
          <p
            :class="
              (route.path === '/history'
                ? 'text-indigo-900'
                : 'text-gray-700') + ' text-center font-medium'
            "
          >
            History
          </p>
        </nuxt-link>
      </div>
      <div class="w-full">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const config = useRuntimeConfig();
</script>
