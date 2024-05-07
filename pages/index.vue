<template>
  <div class="p-8 flex flex-col w-full gap-y-8 h-full">
    <div class="text-lg font-semibold text-left">
      Cashier
      <p class="mt-1 text-sm font-normal text-gray-500">
        {{ quote }}
      </p>
    </div>
    <div class="flex flex-row gap-x-2 max-h-[87%]">
      <div
        class="overflow-y-auto p-6 flex flex-col gap-y-6 bg-gray-50 rounded-l-xl"
      >
        <div class="flex flex-col gap-y-4">
          <h1 class="font-bold text-xl">Smoothies</h1>
          <div class="flex flex-wrap gap-x-4 gap-y-4">
            <div
              class="rounded-xl border-gray-300 border-2 w-40 flex-auto hover:border-indigo-400"
              v-for="item in menuItems"
              :key="item.id"
            >
              <img
                :src="`${config.public.databaseUrl}/storage/v1/object/public/menu/${item.image}`"
                class="rounded-t-xl h-40 w-full object-cover aspect-square"
              />
              <div class="p-4 flex flex-col gap-y-2">
                <p class="text-lg font-semibold">{{ item.name }}</p>
                <p class="opacity-75 mb-4">
                  {{ String(item.ingredients.join(", ")) }}
                </p>
                <p class="">Rp {{ item.price.toLocaleString("id-id") }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="h-full overflow-y-auto p-6 flex flex-col gap-y-6 bg-gray-50 rounded-r-xl w-2/5"
      >
        <h1 class="font-bold text-xl">Smoothies</h1>
        <div class="flex flex-col gap-y-4"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { createClient } from "@supabase/supabase-js";

const config = useRuntimeConfig();

const supabase = createClient(
  config.public.databaseUrl,
  config.public.anonymousApikey
);

const quote = ref("");
const menuItems = ref([]);

async function getResults() {
  const quotes = (await supabase.from("quotes").select()).data;
  quote.value = quotes[Math.floor(Math.random() * quotes.length)].text;

  const items = (await supabase.from("menu").select()).data;
  menuItems.value = items;
}

onMounted(() => {
  getResults();
});
</script>
