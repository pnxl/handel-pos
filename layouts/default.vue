<template>
  <div
    class="min-h-screen min-w-screen max-h-screen max-w-screen flex flex-row bg-gray-100 text-gray-800"
  >
    <div class="bg-gray-200 p-4 flex flex-col justify-between gap-y-4">
      <div class="flex flex-col gap-y-6">
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
      <nuxt-link to="/settings" class="flex flex-col w-full group">
        <div
          :class="
            (route.path === '/settings' ? 'bg-indigo-300' : '') +
            ' rounded-full bg-opacity-50 mx-auto p-3 w-fit group group-hover:bg-indigo-200 group-hover:bg-opacity-50'
          "
        >
          <Icon
            name="mdi:gear"
            class="text-2xl text-indigo-900 group-hover:scale-110 group-hover:text-indigo-800"
            v-if="route.path === '/settings'"
          />
          <Icon
            name="mdi:gear-outline"
            class="text-2xl text-gray-800 group-hover:scale-110 group-hover:text-indigo-700"
            v-else
          />
        </div>
      </nuxt-link>
    </div>
    <div class="w-full">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const config = useRuntimeConfig();
</script>
