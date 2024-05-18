<template>
  <div class="p-8 flex flex-col w-full gap-y-8 h-full">
    <div class="w-full flex justify-between flex-row gap-x-4">
      <p class="text-xl font-semibold text-left flex flex-col my-auto">
        Order Management
        <span class="mt-1 text-base font-normal text-gray-500">
          Viewing all current orders.
        </span>
      </p>
      <div class="flex flex-row gap-x-2">
        <button
          @click="openQueueDisplay()"
          class="rounded-xl bg-gray-50 border flex flex-row gap-x-2 border-gray-200 hover:bg-indigo-100 hover:border-indigo-300 hover:text-indigo-700 py-3 px-6 h-fit my-auto"
        >
          <p class="my-auto">Open Queue Display</p>
          <Icon name="mdi:open-in-new" class="text-lg my-auto" />
        </button>
        <button
          @click="openKitchenDisplay()"
          class="rounded-xl bg-gray-50 border flex flex-row gap-x-2 border-gray-200 hover:bg-indigo-100 hover:border-indigo-300 hover:text-indigo-700 py-3 px-6 h-fit my-auto"
        >
          <p class="my-auto">Open Kitchen Display</p>
          <Icon name="mdi:open-in-new" class="text-lg my-auto" />
        </button>
      </div>
    </div>
    <div
      class="max-h-[69%] md:max-h-[77.5%] lg:max-h-[85%] 2xl:max-h-[89%] flex flex-row gap-x-8"
    >
      <div class="flex flex-col gap-y-4 w-1/2 h-full">
        <p class="font-medium text-lg flex flex-col my-auto">
          Orders ready to be picked up
        </p>

        <TransitionGroup
          tag="div"
          key="itemsList"
          name="itemsList"
          class="gap-x-4 gap-y-4 grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 h-full overflow-y-auto -mr-2 pr-2"
        >
          <div
            class="rounded-xl border-gray-300 text-left border-2 flex p-3 flex-col gap-y-3 h-full hover:border-indigo-400 group"
            v-for="item in finishedList"
            :key="item.id"
          >
            <div class="flex flex-col h-full justify-between gap-y-3">
              <div class="flex flex-col gap-y-1">
                <div class="flex flex-row justify-between">
                  <p class="font-medium">{{ item.assignment }}</p>
                </div>
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
            <div class="flex flex-col gap-y-2">
              <button
                class="w-full p-2 bg-indigo-100 rounded-lg border flex flex-row justify-center gap-x-1 border-indigo-200 hover:bg-indigo-200"
                @click="deleteRow(item.id)"
              >
                <Icon
                  name="mdi:check"
                  class="my-auto text-xl text-indigo-800"
                />
                <p class="my-auto text-indigo-900">Picked up</p>
              </button>
              <button
                class="w-full p-2 bg-red-100 rounded-lg border flex flex-row justify-center gap-x-1 border-red-200 hover:bg-red-200"
                @click="deleteRow(item.id)"
              >
                <Icon name="mdi:bin" class="my-auto text-xl text-red-800" />
                <p class="my-auto text-red-900">Delete order</p>
              </button>
            </div>
          </div>
        </TransitionGroup>
      </div>
      <div class="flex flex-col gap-y-4 w-1/2 h-full">
        <p class="font-medium text-lg flex flex-col my-auto">
          Orders waiting in queue
        </p>

        <TransitionGroup
          tag="div"
          key="itemsList"
          name="itemsList"
          class="gap-x-4 gap-y-4 grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 h-full overflow-y-auto -mr-2 pr-2"
        >
          <div
            class="rounded-xl border-gray-300 text-left border-2 flex p-3 flex-col gap-y-3 h-full hover:border-indigo-400 group"
            v-for="item in unfinishedList"
            :key="item.id"
          >
            <div class="flex flex-col h-full justify-between gap-y-3">
              <div class="flex flex-col gap-y-1">
                <div class="flex flex-row justify-between">
                  <p class="font-medium">{{ item.assignment || "No Name" }}</p>
                </div>
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
            <div class="flex flex-row gap-x-2">
              <button
                class="w-full p-2 bg-red-100 rounded-lg border flex flex-row justify-center gap-x-1 border-red-200 hover:bg-red-200"
                @click="deleteRow(item.id)"
              >
                <Icon name="mdi:close" class="my-auto text-xl text-red-800" />
                <p class="my-auto text-red-900">Cancel order</p>
              </button>
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

async function deleteRow(id: number) {
  await supabase
    .from(tableNames.realtime)
    .delete()
    .eq("id", id)
    .then((r: any) => console.log(r));

  getResults();
}

async function finishRow(id: number) {
  await supabase
    .from(tableNames.realtime)
    .update({ finished: true })
    .eq("id", id)
    .then((r: any) => console.log(r));

  getResults();
}

function openKitchenDisplay() {
  if (process.client) {
    window.open(
      "/kitchen",
      "Handel Kitchen Display",
      "status=no,location=no,toolbar=no,menubar=no,width=0,height=0"
    );
  }
}

function openQueueDisplay() {
  if (process.client) {
    window.open(
      "/queue",
      "Handel Kitchen Display",
      "status=no,location=no,toolbar=no,menubar=no,width=0,height=0"
    );
  }
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
