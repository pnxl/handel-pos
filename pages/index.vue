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
        class="overflow-y-auto p-6 flex flex-col gap-y-6 w-full bg-gray-50 rounded-l-xl"
      >
        <div class="flex flex-col gap-y-4">
          <h1 class="font-bold text-xl">Smoothies</h1>
          <div
            class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-4"
          >
            <button
              class="rounded-xl border-gray-300 text-left border-2 w-40 flex-auto hover:border-indigo-400"
              v-for="item in menuItems"
              :key="item.id"
              @click="
                currentOrder.push({
                  id: orderId++,
                  name: item.name,
                  image: item.image,
                  price: item.price,
                });
                console.log(currentOrder);
              "
            >
              <div class="p-3 flex flex-col gap-y-2">
                <img
                  :src="`${config.public.databaseUrl}/storage/v1/object/public/menu/${item.image}`"
                  class="rounded-xl w-full object-cover aspect-square"
                />
                <p class="text-lg font-semibold">{{ item.name }}</p>
                <p class="opacity-75 mb-4">
                  {{ String(item.ingredients.join(", ")) }}
                </p>
                <p class="">Rp {{ item.price.toLocaleString("id-id") }}</p>
              </div>
            </button>
          </div>
        </div>
      </div>
      <div
        class="h-full p-6 flex flex-col gap-y-6 bg-gray-50 rounded-r-xl w-1/2"
      >
        <h1 class="font-bold text-xl">Current Order</h1>
        <div class="flex flex-col gap-y-4 overflow-y-auto">
          <div v-for="item in currentOrder" :key="item.id">
            <div class="flex flex-row justify-between gap-x-4 my-auto">
              <div class="flex flex-row gap-x-2">
                <img
                  :src="`${config.public.databaseUrl}/storage/v1/object/public/menu/${item.image}`"
                  class="rounded-xl object-cover aspect-square w-16 h-16"
                />
                <div class="my-auto">
                  <p class="text-lg font-semibold">{{ item.name }}</p>
                  <p class="">Rp {{ item.price.toLocaleString("id-id") }}</p>
                </div>
              </div>
              <button
                class="group"
                @click="
                  currentOrder.splice(
                    currentOrder.findIndex((i) => i.id === item.id),
                    1
                  )
                "
              >
                <Icon
                  name="mdi:close-circle"
                  class="text-2xl mx-auto my-auto text-red-800 group-hover:text-red-400"
                />
              </button>
            </div>
          </div>
        </div>
        <div class="z-10 w-full bg-gray-50 flex flex-col gap-y-4">
          <hr class="border-gray-300 rounded-full" />
          <div class="flex flex-row justify-between">
            <p class="opacity-75 my-auto">{{ currentOrder.length }} items</p>
            <p class="font-medium text-lg my-auto">
              Rp
              {{
                (totalPrice = currentOrder.reduce(
                  (acc, item) => acc + item.price,
                  0
                )).toLocaleString("id-id")
              }}
            </p>
          </div>
          <button
            class="w-full py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 font-semibold text-gray-50"
          >
            Add to database
          </button>
        </div>
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
const orderId = ref(1);
const currentOrder = reactive([]);
const totalPrice = reactive([]);

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
