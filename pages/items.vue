<template>
  <div class="overflow-y-auto h-screen p-8">
    <table class="text-left w-full table-fixed">
      <caption class="text-xl font-semibold text-left mb-8">
        Items
        <p class="mt-1 text-base font-normal text-gray-500 dark:gray-gray-400">
          Listing all current available items.
        </p>
      </caption>
      <thead class="text-base font-medium border-b-2 border-gray-300">
        <tr>
          <th scope="col" class="px-6 py-3 w-1/4">Name</th>
          <th scope="col" class="px-6 py-3">Description</th>
          <th scope="col" class="px-6 py-3 w-1/4">Price</th>
        </tr>
      </thead>
      <tbody v-if="tableSkeleton === true" class="animate-pulse">
        <tr class="border-b border-gray-200 hover:bg-gray-200/50">
          <th
            scope="row"
            class="px-6 w-20 py-4 font-normal text-gray-800 text-wrap whitespace-nowrap"
          >
            <div class="h-2 bg-gray-300 rounded col-span-2"></div>
          </th>
          <th
            scope="row"
            class="px-6 w-20 py-4 font-normal text-gray-800 text-wrap whitespace-nowrap"
          >
            <div class="h-2 bg-gray-300 rounded col-span-2"></div>
          </th>
          <th
            scope="row"
            class="px-6 py-4 font-normal text-gray-800 text-wrap whitespace-nowrap"
          >
            <div class="h-2 bg-gray-300 rounded col-span-2"></div>
          </th>
        </tr>
        <tr class="border-b border-gray-200 hover:bg-gray-200/50">
          <th
            scope="row"
            class="px-6 w-20 py-4 font-normal text-gray-800 text-wrap whitespace-nowrap"
          >
            <div class="h-2 bg-gray-300 rounded col-span-2"></div>
          </th>
          <th
            scope="row"
            class="px-6 w-20 py-4 font-normal text-gray-800 text-wrap whitespace-nowrap"
          >
            <div class="h-2 bg-gray-300 rounded col-span-2"></div>
          </th>
          <th
            scope="row"
            class="px-6 py-4 font-normal text-gray-800 text-wrap whitespace-nowrap"
          >
            <div class="h-2 bg-gray-300 rounded col-span-2"></div>
          </th>
        </tr>
        <tr class="border-b border-gray-200 hover:bg-gray-200/50">
          <th
            scope="row"
            class="px-6 w-20 py-4 font-normal text-gray-800 text-wrap whitespace-nowrap"
          >
            <div class="h-2 bg-gray-300 rounded col-span-2"></div>
          </th>
          <th
            scope="row"
            class="px-6 w-20 py-4 font-normal text-gray-800 text-wrap whitespace-nowrap"
          >
            <div class="h-2 bg-gray-300 rounded col-span-2"></div>
          </th>
          <th
            scope="row"
            class="px-6 py-4 font-normal text-gray-800 text-wrap whitespace-nowrap"
          >
            <div class="h-2 bg-gray-300 rounded col-span-2"></div>
          </th>
        </tr>
        <tr class="border-b border-gray-200 hover:bg-gray-200/50">
          <th
            scope="row"
            class="px-6 w-20 py-4 font-normal text-gray-800 text-wrap whitespace-nowrap"
          >
            <div class="h-2 bg-gray-300 rounded col-span-2"></div>
          </th>
          <th
            scope="row"
            class="px-6 w-20 py-4 font-normal text-gray-800 text-wrap whitespace-nowrap"
          >
            <div class="h-2 bg-gray-300 rounded col-span-2"></div>
          </th>
          <th
            scope="row"
            class="px-6 py-4 font-normal text-gray-800 text-wrap whitespace-nowrap"
          >
            <div class="h-2 bg-gray-300 rounded col-span-2"></div>
          </th>
        </tr>
        <tr class="border-b border-gray-200 hover:bg-gray-200/50">
          <th
            scope="row"
            class="px-6 w-20 py-4 font-normal text-gray-800 text-wrap whitespace-nowrap"
          >
            <div class="h-2 bg-gray-300 rounded col-span-2"></div>
          </th>
          <th
            scope="row"
            class="px-6 w-20 py-4 font-normal text-gray-800 text-wrap whitespace-nowrap"
          >
            <div class="h-2 bg-gray-300 rounded col-span-2"></div>
          </th>
          <th
            scope="row"
            class="px-6 py-4 font-normal text-gray-800 text-wrap whitespace-nowrap"
          >
            <div class="h-2 bg-gray-300 rounded col-span-2"></div>
          </th>
        </tr>
        <tr class="border-b border-gray-200 hover:bg-gray-200/50">
          <th
            scope="row"
            class="px-6 w-20 py-4 font-normal text-gray-800 text-wrap whitespace-nowrap"
          >
            <div class="h-2 bg-gray-300 rounded col-span-2"></div>
          </th>
          <th
            scope="row"
            class="px-6 w-20 py-4 font-normal text-gray-800 text-wrap whitespace-nowrap"
          >
            <div class="h-2 bg-gray-300 rounded col-span-2"></div>
          </th>
          <th
            scope="row"
            class="px-6 py-4 font-normal text-gray-800 text-wrap whitespace-nowrap"
          >
            <div class="h-2 bg-gray-300 rounded col-span-2"></div>
          </th>
        </tr>
        <tr class="border-b border-gray-200 hover:bg-gray-200/50">
          <th
            scope="row"
            class="px-6 w-20 py-4 font-normal text-gray-800 text-wrap whitespace-nowrap"
          >
            <div class="h-2 bg-gray-300 rounded col-span-2"></div>
          </th>
          <th
            scope="row"
            class="px-6 w-20 py-4 font-normal text-gray-800 text-wrap whitespace-nowrap"
          >
            <div class="h-2 bg-gray-300 rounded col-span-2"></div>
          </th>
          <th
            scope="row"
            class="px-6 py-4 font-normal text-gray-800 text-wrap whitespace-nowrap"
          >
            <div class="h-2 bg-gray-300 rounded col-span-2"></div>
          </th>
        </tr>
        <tr class="border-b border-gray-200 hover:bg-gray-200/50">
          <th
            scope="row"
            class="px-6 w-20 py-4 font-normal text-gray-800 text-wrap whitespace-nowrap"
          >
            <div class="h-2 bg-gray-300 rounded col-span-2"></div>
          </th>
          <th
            scope="row"
            class="px-6 w-20 py-4 font-normal text-gray-800 text-wrap whitespace-nowrap"
          >
            <div class="h-2 bg-gray-300 rounded col-span-2"></div>
          </th>
          <th
            scope="row"
            class="px-6 py-4 font-normal text-gray-800 text-wrap whitespace-nowrap"
          >
            <div class="h-2 bg-gray-300 rounded col-span-2"></div>
          </th>
        </tr>
        <tr class="border-b border-gray-200 hover:bg-gray-200/50">
          <th
            scope="row"
            class="px-6 w-20 py-4 font-normal text-gray-800 text-wrap whitespace-nowrap"
          >
            <div class="h-2 bg-gray-300 rounded col-span-2"></div>
          </th>
          <th
            scope="row"
            class="px-6 w-20 py-4 font-normal text-gray-800 text-wrap whitespace-nowrap"
          >
            <div class="h-2 bg-gray-300 rounded col-span-2"></div>
          </th>
          <th
            scope="row"
            class="px-6 py-4 font-normal text-gray-800 text-wrap whitespace-nowrap"
          >
            <div class="h-2 bg-gray-300 rounded col-span-2"></div>
          </th>
        </tr>
        <tr class="border-b border-gray-200 hover:bg-gray-200/50">
          <th
            scope="row"
            class="px-6 w-20 py-4 font-normal text-gray-800 text-wrap whitespace-nowrap"
          >
            <div class="h-2 bg-gray-300 rounded col-span-2"></div>
          </th>
          <th
            scope="row"
            class="px-6 w-20 py-4 font-normal text-gray-800 text-wrap whitespace-nowrap"
          >
            <div class="h-2 bg-gray-300 rounded col-span-2"></div>
          </th>
          <th
            scope="row"
            class="px-6 py-4 font-normal text-gray-800 text-wrap whitespace-nowrap"
          >
            <div class="h-2 bg-gray-300 rounded col-span-2"></div>
          </th>
        </tr>
      </tbody>
      <tbody>
        <tr
          v-for="item in itemsList"
          :key="item.id"
          class="border-b border-gray-200 hover:bg-gray-200/50"
        >
          <th
            scope="row"
            class="px-6 w-20 py-4 font-normal text-gray-800 text-ellipsis overflow-hidden whitespace-nowrap"
          >
            {{ item.name }}
          </th>
          <th
            scope="row"
            class="px-6 w-20 py-4 font-normal text-gray-800 text-ellipsis overflow-hidden whitespace-nowrap"
          >
            {{ item.description }}
          </th>
          <th
            scope="row"
            class="px-6 py-4 font-normal text-gray-800 text-ellipsis overflow-hidden whitespace-nowrap"
          >
            {{ config.public.currency
            }}{{ item.price.toLocaleString(config.public.locale) }}
          </th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { createClient } from "@supabase/supabase-js";

const config = useRuntimeConfig();

const supabase = createClient(
  config.public.databaseUrl,
  config.public.anonymousApikey
);

const itemsList = ref([]);
const tableSkeleton = ref(true);

async function getResults() {
  const { data } = await supabase.from(config.public.itemsDatabase).select();
  itemsList.value = data;
  tableSkeleton.value = false;
}

onMounted(() => {
  getResults();
});
</script>
