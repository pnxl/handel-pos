<template>
  <div class="p-8 w-full h-full">
    <div class="flex flex-row justify-between gap-x-8 h-full">
      <div class="w-1/2 flex flex-col gap-y-4 h-full">
        <p class="text-xl font-semibold text-left flex flex-col my-auto">
          Finished Orders
        </p>
        <TransitionGroup
          tag="div"
          key="itemsList"
          name="itemsList"
          class="gap-x-4 gap-y-4 grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5"
        >
          <div
            class="rounded-xl border-gray-300 text-left border-2 hover:border-indigo-400 group"
            v-for="item in finishedList"
            :key="item.id"
          >
            <div class="p-3 flex flex-col h-full justify-between gap-y-3">
              <div class="flex flex-col gap-y-1">
                <p class="font-medium">{{ item.assignment }}</p>
                <p class="text-lg font-semibold">{{ item.item }}</p>
                <p class="opacity-75 text-sm" v-for="addon in item.options">
                  + {{ JSON.parse(addon).name }}
                </p>
                <p
                  class="opacity-75 text-sm mb-4"
                  v-if="String(item.notes) !== ''"
                >
                  ({{ String(item.notes) }})
                </p>
              </div>
              <div class="flex flex-col gap-y-2">
                <p class="opacity-75 text-sm">
                  {{
                    new Date(item.timestamp).toLocaleString(
                      config.public.locale
                    )
                  }}
                </p>
              </div>
            </div>
          </div>
        </TransitionGroup>
      </div>

      <div class="w-1/2 flex flex-col gap-y-4 h-full">
        <p class="text-xl font-semibold text-left flex flex-col my-auto">
          In Queue
        </p>
        <TransitionGroup
          tag="div"
          key="itemsList"
          name="itemsList"
          class="gap-x-4 gap-y-4 grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5"
        >
          <div
            class="rounded-xl border-gray-300 text-left border-2 hover:border-indigo-400 group"
            v-for="item in unfinishedList"
            :key="item.id"
          >
            <div class="p-3 flex flex-col h-full justify-between gap-y-3">
              <div class="flex flex-col gap-y-1">
                <p class="font-medium">{{ item.assignment }}</p>
                <p class="text-lg font-semibold">{{ item.item }}</p>
                <p class="opacity-75 text-sm" v-for="addon in item.options">
                  + {{ JSON.parse(addon).name }}
                </p>
                <p
                  class="opacity-75 text-sm mb-4"
                  v-if="String(item.notes) !== ''"
                >
                  ({{ String(item.notes) }})
                </p>
              </div>
              <div class="flex flex-col gap-y-2">
                <p class="opacity-75 text-sm">
                  {{
                    new Date(item.timestamp).toLocaleString(
                      config.public.locale
                    )
                  }}
                </p>
              </div>
            </div>
          </div>
        </TransitionGroup>
      </div>
    </div>
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

const finishedList: Ref<Array<Tables<"menu">> | null> = ref(null);
const unfinishedList: Ref<Array<Tables<"menu">> | null> = ref(null);

async function getResults() {
  const finished = (
    await supabase.from(tableNames.realtime).select().eq("finished", true)
  ).data;
  finishedList.value = finished;

  const unfinished = (
    await supabase.from(tableNames.realtime).select().eq("finished", false)
  ).data;
  unfinishedList.value = unfinished;
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
    getResults()
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
