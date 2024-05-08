<template>
  <div class="overflow-y-auto h-screen p-8">
    <table class="text-sm text-left w-full table-fixed">
      <caption class="text-lg font-semibold text-left mb-8">
        Items
        <p class="mt-1 text-sm font-normal text-gray-500 dark:gray-gray-400">
          Listing all current available items.
        </p>
      </caption>
      <thead class="text-sm font-medium border-b-2 border-gray-300">
        <tr>
          <th scope="col" class="px-6 py-3">Name</th>
          <th scope="col" class="px-6 py-3 w-1/4">Description</th>
          <th scope="col" class="px-6 py-3 w-1/4">Price</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in menuItems"
          :key="item.id"
          class="border-b border-gray-200 hover:bg-gray-200/50"
        >
          <th
            scope="row"
            class="px-6 w-20 py-4 font-normal text-gray-800 text-wrap whitespace-nowrap"
          >
            {{ item.name }}
          </th>
          <th
            scope="row"
            class="px-6 w-20 py-4 font-normal text-gray-800 text-wrap whitespace-nowrap"
          >
            {{ item.description }}
          </th>
          <th
            scope="row"
            class="px-6 py-4 font-normal text-gray-800 text-wrap whitespace-nowrap"
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

async function getResults() {
  const { data } = await supabase.from(config.public.itemsDatabase).select();
  itemsList.value = data;
}

onMounted(() => {
  getResults();
});
</script>
