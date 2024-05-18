<template>
  <div class="p-8 flex flex-col w-full gap-y-4 h-full">
    <div class="w-full flex justify-between flex-row gap-x-4">
      <p class="text-xl font-semibold text-left flex flex-col my-auto">
        Current Orders
      </p>
    </div>
    <TransitionGroup
      tag="div"
      key="itemsList"
      name="itemsList"
      class="gap-x-4 gap-y-4 grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
    >
      <div
        class="rounded-xl border-gray-300 text-left border-2 hover:border-indigo-400 group"
        v-for="item in itemsList"
        :key="item.id"
      >
        <div class="p-3 flex flex-col h-full justify-between gap-y-3">
          <div class="flex flex-col gap-y-1">
            <p class="font-medium">{{ item.assignment }}</p>
            <p class="text-lg font-semibold">{{ item.item }}</p>
            <p class="opacity-75 text-sm" v-for="addon in item.options">
              + {{ JSON.parse(addon).name }}
            </p>
            <p class="opacity-75 text-sm mb-4" v-if="String(item.notes) !== ''">
              ({{ String(item.notes) }})
            </p>
          </div>
          <div class="flex flex-col gap-y-2">
            <p class="opacity-75 text-sm">
              {{
                new Date(item.timestamp).toLocaleString(config.public.locale)
              }}
            </p>
            <div class="flex flex-row gap-x-1">
              <button
                class="w-full p-2 bg-lime-100 rounded-lg border border-lime-200 hover:bg-lime-200"
                @click="finishRow(item.id)"
              >
                Finish
              </button>
              <button
                class="w-full p-2 bg-red-100 rounded-lg border border-red-200 hover:bg-red-200"
                @click="deleteRow(item.id)"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { createClient } from "@supabase/supabase-js";
import type { Database, Json, MenuOption, Tables } from "~/types/supabase";
import { tableNames } from "~/utils/databaseNames";

const config = useRuntimeConfig();

const supabase = createClient<Database>(
  config.public.databaseUrl,
  config.public.anonymousApikey
);

const itemsList: Ref<Array<Tables<"menu">> | null> = ref(null);

async function getResults() {
  const items = (
    await supabase.from(tableNames.realtime).select().eq("finished", false)
  ).data;
  itemsList.value = items;
}

async function deleteRow(id: number) {
  await supabase
    .from(tableNames.realtime)
    .delete()
    .eq("id", id)
    .then((r: any) => console.log(r));
}

async function finishRow(id: number) {
  await supabase
    .from(tableNames.realtime)
    .update({ finished: true })
    .eq("id", id)
    .then((r: any) => console.log(r));
}

//@ts-ignore
onMounted(() => {
  getResults();
});

supabase
  .channel(tableNames.realtime)
  .on(
    "postgres_changes",
    { event: "*", schema: "public", table: tableNames.realtime },
    getResults
  )
  .subscribe();

definePageMeta({
  layout: "custom",
});
</script>

<style>
.itemsList-move {
  transition: all 0.5s;
}

.itemsList-leave-active,
.itemsList-enter-active {
  transition: all 0.25s;
}

.itemsList-enter-from {
  opacity: 0;
  transform: translateX(-1rem);
}
.itemsList-enter-to {
  opacity: 1;
  transform: translateX(0px);
}

.itemsList-leave-from {
  opacity: 1;
  transform: translateX(0px);
}
.itemsList-leave-to {
  opacity: 0;
  transform: translateX(-1rem);
}
.itemsList-leave-active {
  position: absolute;
}
</style>
