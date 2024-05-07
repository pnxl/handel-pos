<template>
  <div class="p-8 flex flex-col w-full gap-y-8 h-full">
    <div class="text-lg font-semibold text-left">
      Cashier
      <p class="mt-1 text-sm font-normal text-gray-500">
        {{ quote }}
      </p>
    </div>
    <div class="flex flex-row gap-x-8 h-full">
      <div
        class="h-full overflow-y-auto p-6 flex flex-col gap-y-6 bg-gray-50 rounded-xl w-full"
      >
        <div class="flex flex-col gap-y-4">
          <h1 class="font-bold text-xl">Smoothies</h1>
          <div class="flex flex-row gap-x-4">
            <div class="rounded-xl border-gray-300 border-2 w-40">
              <div class="p-4">a</div>
            </div>
            <div class="rounded-xl border-gray-300 border-2 w-40">
              <div class="p-4">a</div>
            </div>
            <div class="rounded-xl border-gray-300 border-2 w-40">
              <div class="p-4">a</div>
            </div>
          </div>
        </div>
      </div>
      <div class="h-full overflow-y-auto p-6 bg-gray-50 rounded-xl w-1/2"></div>
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

async function getResults() {
  const quotes = (await supabase.from("quotes").select()).data;
  quote.value = quotes[Math.floor(Math.random() * quotes.length)].text;
  console.log(quotes.value);
}

onMounted(() => {
  getResults();
});
</script>
