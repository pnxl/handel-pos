<template>
  <div class="p-8 flex flex-col w-full gap-y-8 h-full">
    <div class="w-full flex justify-between flex-row gap-x-4">
      <p class="text-lg font-semibold text-left flex flex-col my-auto">
        Cashier
        <span class="mt-1 text-sm font-normal text-gray-500">
          {{ quote }}
        </span>
      </p>
      <HeadlessMenu as="div" class="my-auto">
        <div
          :class="
            (!useCookie('cashier').value ? 'animate-pulse-bg' : '') +
            ' p-1 rounded-2xl'
          "
        >
          <HeadlessMenuButton
            v-if="config.public.usersDatabase !== ''"
            class="my-auto flex relative z-10 flex-row group w-56 md:w-72 justify-between gap-x-2 bg-gray-50 py-3 px-6 rounded-xl border border-gray-200 hover:border-indigo-500 hover:bg-indigo-100"
          >
            <div
              class="my-auto flex-row flex gap-x-3 group text-left"
              v-if="useCookie('cashier').value"
            >
              <img
                :src="useCookie('cashierImage').value"
                class="md:block hidden rounded-full my-auto h-8 object-cover aspect-square border border-transparent group-hover:border-indigo-500"
              />
              <p
                class="md:flex flex-row gap-x-1 hidden text-ellipsis line-clamp-1 my-auto"
              >
                Hi,
                <span class="font-semibold text-ellipsis line-clamp-1">{{
                  useCookie("cashier").value.split(" ").slice(0, 2).join(" ")
                }}</span>
              </p>
              <p class="md:hidden text-gray-500 my-auto">
                <span class="font-semibold">{{
                  useCookie("cashier").value.split(" ").slice(0, 2).join(" ")
                }}</span>
              </p>
            </div>
            <p class="my-auto flex-row flex text-right" v-else>
              Select a user...
            </p>
            <Icon name="mdi:menu-down" class="text-lg my-auto" />
          </HeadlessMenuButton>
        </div>
        <transition
          enter-active-class="transition duration-[250ms] ease-out"
          enter-from-class="transform -translate-y-4 opacity-0"
          enter-to-class="transform translate-y-0 opacity-100"
          leave-active-class="transition duration-[250ms]"
          leave-from-class="transform translate-y-0 opacity-100"
          leave-to-class="transform -translate-y-4 opacity-0"
        >
          <HeadlessMenuItems
            class="absolute right-0 mr-8 mt-2 w-56 md:w-72 rounded-xl bg-gray-50 shadow-lg ring-1 ring-black/5 focus:outline-none"
          >
            <div class="px-1 py-1 flex-col gap-y-1 flex">
              <HeadlessMenuItem v-for="user in usersList" :key="user.id">
                <button
                  v-if="useCookie('cashier').value === user.fullName"
                  class="bg-indigo-200/75 group flex gap-x-3 w-full rounded-lg px-5 py-2"
                  @click="
                    useCookie('cashier').value = user.fullName;
                    useCookie(
                      'cashierImage'
                    ).value = `${config.public.databaseUrl}/storage/v1/object/public/${config.public.usersBucket}/${user.image}`;
                  "
                >
                  <img
                    :src="`${config.public.databaseUrl}/storage/v1/object/public/${config.public.usersBucket}/${user.image}`"
                    class="md:block hidden rounded-full my-auto h-8 object-cover aspect-square border border-transparent group-hover:border-indigo-500"
                  />
                  <p class="my-auto line-clamp-1 text-ellipsis text-left">
                    {{ user.fullName }}
                  </p>
                </button>
                <button
                  v-else
                  class="hover:bg-indigo-100 group flex gap-x-3 w-full rounded-lg px-5 py-2"
                  @click="
                    useCookie('cashier').value = user.fullName;
                    useCookie(
                      'cashierImage'
                    ).value = `${config.public.databaseUrl}/storage/v1/object/public/${config.public.usersBucket}/${user.image}`;
                  "
                >
                  <img
                    :src="`${config.public.databaseUrl}/storage/v1/object/public/${config.public.usersBucket}/${user.image}`"
                    class="md:block hidden rounded-full my-auto h-8 object-cover aspect-square border border-transparent group-hover:border-indigo-500"
                  />
                  <p class="my-auto line-clamp-1 text-ellipsis text-left">
                    {{ user.fullName }}
                  </p>
                </button>
              </HeadlessMenuItem>
            </div>
          </HeadlessMenuItems></transition
        >
      </HeadlessMenu>
    </div>
    <div class="flex flex-row gap-x-2 max-h-[87%] h-full">
      <div
        class="overflow-y-auto p-6 border border-gray-200 flex h-full flex-col gap-y-6 w-full bg-gray-50 rounded-l-xl"
      >
        <div class="flex flex-col h-full gap-y-4">
          <div
            v-if="itemsSkeleton === true"
            class="grid md:grid-cols-2 animate-pulse lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-4"
          >
            <div
              class="rounded-xl border-gray-300 text-left border-2 w-40 flex-auto hover:border-indigo-400"
            >
              <div class="p-3 flex flex-col gap-y-2">
                <div class="rounded-xl w-full aspect-square bg-gray-300" />
                <div class="h-4 bg-gray-300 rounded col-span-2"></div>
                <div
                  class="h-2 bg-gray-300 rounded col-span-2 opacity-75 mb-4"
                ></div>
                <div class="h-2 bg-gray-300 rounded col-span-2"></div>
              </div>
            </div>
            <div
              class="rounded-xl border-gray-300 text-left border-2 w-40 flex-auto hover:border-indigo-400"
            >
              <div class="p-3 flex flex-col gap-y-2">
                <div class="rounded-xl w-full aspect-square bg-gray-300" />
                <div class="h-4 bg-gray-300 rounded col-span-2"></div>
                <div
                  class="h-2 bg-gray-300 rounded col-span-2 opacity-75 mb-4"
                ></div>
                <div class="h-2 bg-gray-300 rounded col-span-2"></div>
              </div>
            </div>
            <div
              class="rounded-xl border-gray-300 text-left border-2 w-40 flex-auto hover:border-indigo-400"
            >
              <div class="p-3 flex flex-col gap-y-2">
                <div class="rounded-xl w-full aspect-square bg-gray-300" />
                <div class="h-4 bg-gray-300 rounded col-span-2"></div>
                <div
                  class="h-2 bg-gray-300 rounded col-span-2 opacity-75 mb-4"
                ></div>
                <div class="h-2 bg-gray-300 rounded col-span-2"></div>
              </div>
            </div>
            <div
              class="rounded-xl border-gray-300 text-left border-2 w-40 flex-auto hover:border-indigo-400"
            >
              <div class="p-3 flex flex-col gap-y-2">
                <div class="rounded-xl w-full aspect-square bg-gray-300" />
                <div class="h-4 bg-gray-300 rounded col-span-2"></div>
                <div
                  class="h-2 bg-gray-300 rounded col-span-2 opacity-75 mb-4"
                ></div>
                <div class="h-2 bg-gray-300 rounded col-span-2"></div>
              </div>
            </div>
            <div
              class="rounded-xl border-gray-300 text-left border-2 w-40 flex-auto hover:border-indigo-400"
            >
              <div class="p-3 flex flex-col gap-y-2">
                <div class="rounded-xl w-full aspect-square bg-gray-300" />
                <div class="h-4 bg-gray-300 rounded col-span-2"></div>
                <div
                  class="h-2 bg-gray-300 rounded col-span-2 opacity-75 mb-4"
                ></div>
                <div class="h-2 bg-gray-300 rounded col-span-2"></div>
              </div>
            </div>
            <div
              class="rounded-xl border-gray-300 text-left border-2 w-40 flex-auto hover:border-indigo-400"
            >
              <div class="p-3 flex flex-col gap-y-2">
                <div class="rounded-xl w-full aspect-square bg-gray-300" />
                <div class="h-4 bg-gray-300 rounded col-span-2"></div>
                <div
                  class="h-2 bg-gray-300 rounded col-span-2 opacity-75 mb-4"
                ></div>
                <div class="h-2 bg-gray-300 rounded col-span-2"></div>
              </div>
            </div>
            <div
              class="rounded-xl border-gray-300 text-left border-2 w-40 flex-auto hover:border-indigo-400"
            >
              <div class="p-3 flex flex-col gap-y-2">
                <div class="rounded-xl w-full aspect-square bg-gray-300" />
                <div class="h-4 bg-gray-300 rounded col-span-2"></div>
                <div
                  class="h-2 bg-gray-300 rounded col-span-2 opacity-75 mb-4"
                ></div>
                <div class="h-2 bg-gray-300 rounded col-span-2"></div>
              </div>
            </div>
            <div
              class="rounded-xl border-gray-300 text-left border-2 w-40 flex-auto hover:border-indigo-400"
            >
              <div class="p-3 flex flex-col gap-y-2">
                <div class="rounded-xl w-full aspect-square bg-gray-300" />
                <div class="h-4 bg-gray-300 rounded col-span-2"></div>
                <div
                  class="h-2 bg-gray-300 rounded col-span-2 opacity-75 mb-4"
                ></div>
                <div class="h-2 bg-gray-300 rounded col-span-2"></div>
              </div>
            </div>
            <div
              class="rounded-xl border-gray-300 text-left border-2 w-40 flex-auto hover:border-indigo-400"
            >
              <div class="p-3 flex flex-col gap-y-2">
                <div class="rounded-xl w-full aspect-square bg-gray-300" />
                <div class="h-4 bg-gray-300 rounded col-span-2"></div>
                <div
                  class="h-2 bg-gray-300 rounded col-span-2 opacity-75 mb-4"
                ></div>
                <div class="h-2 bg-gray-300 rounded col-span-2"></div>
              </div>
            </div>
            <div
              class="rounded-xl border-gray-300 text-left border-2 w-40 flex-auto hover:border-indigo-400"
            >
              <div class="p-3 flex flex-col gap-y-2">
                <div class="rounded-xl w-full aspect-square bg-gray-300" />
                <div class="h-4 bg-gray-300 rounded col-span-2"></div>
                <div
                  class="h-2 bg-gray-300 rounded col-span-2 opacity-75 mb-4"
                ></div>
                <div class="h-2 bg-gray-300 rounded col-span-2"></div>
              </div>
            </div>
          </div>
          <div
            class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-4"
          >
            <button
              class="rounded-xl border-gray-300 text-left border-2 w-40 flex-auto hover:border-indigo-400"
              v-for="item in itemsList"
              :key="item.id"
              @click="
                currentOrder.unshift({
                  id: orderId++,
                  name: item.name,
                  image: item.image,
                  price: item.price,
                })
              "
            >
              <div class="p-3 flex flex-col gap-y-2">
                <img
                  :src="`${config.public.databaseUrl}/storage/v1/object/public/${config.public.imageBucket}/${item.image}`"
                  class="rounded-xl w-full object-cover aspect-square"
                />
                <p class="text-lg font-semibold">{{ item.name }}</p>
                <p class="opacity-75 mb-4">
                  {{ item.description }}
                </p>
                <p class="">
                  {{ config.public.currency
                  }}{{ item.price.toLocaleString(config.public.locale) }}
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
      <div
        class="h-full p-6 flex flex-col gap-y-6 bg-gray-50 border border-gray-200 rounded-r-xl w-1/2"
      >
        <div class="flex flex-row justify-between gap-x-4">
          <h1 class="font-bold text-xl">Current Order</h1>
          <button
            class="group"
            v-if="currentOrder.length !== 0"
            @click="currentOrder.length = 0"
          >
            <Icon
              name="mdi:delete-forever"
              class="text-2xl mx-auto my-auto text-red-800 group-hover:text-red-400"
            />
          </button>
        </div>
        <TransitionGroup
          tag="div"
          name="currentOrder"
          class="flex -mx-6 flex-col-reverse relative gap-y-6 lg:gap-y-4 overflow-y-auto h-full"
        >
          <div v-for="item in currentOrder" :key="item.id" :id="item.id">
            <div
              class="flex lg:flex-row flex-col justify-between gap-x-4 my-auto px-6"
            >
              <div class="flex flex-row gap-x-2">
                <img
                  :src="`${config.public.databaseUrl}/storage/v1/object/public/menu/${item.image}`"
                  class="rounded-xl object-cover aspect-square w-16 h-16"
                />
                <div class="my-auto">
                  <p class="lg:text-lg font-semibold text-ellipsis">
                    {{ item.name }}
                  </p>
                  <p class="text-ellipsis">
                    {{ config.public.currency
                    }}{{ item.price.toLocaleString(config.public.locale) }}
                  </p>
                </div>
              </div>
              <button
                class="group lg:block hidden"
                @click="
                  currentOrder.splice(
                    currentOrder.findIndex((i) => i.id === item.id),
                    1
                  )
                "
              >
                <Icon
                  name="mdi:close-circle"
                  class="text-2xl mx-auto my-auto text-red-800 group-hover:text-red-600 lg:group-hover:text-red-400"
                />
              </button>
              <button
                class="group lg:hidden bg-red-200 rounded-md mt-2 py-1"
                @click="
                  currentOrder.splice(
                    currentOrder.findIndex((i) => i.id === item.id),
                    1
                  )
                "
              >
                <div class="flex flex-row mx-auto gap-x-1 w-fit">
                  <Icon
                    name="mdi:close-circle"
                    class="text-2xl my-auto text-red-800 group-hover:text-red-400"
                  />
                  <p class="my-auto text-red-800 text-sm">Delete</p>
                </div>
              </button>
            </div>
          </div>
        </TransitionGroup>
        <div class="z-10 w-full bg-gray-50 flex flex-col gap-y-4">
          <hr class="border-gray-300 rounded-full" />
          <div class="flex flex-row justify-between">
            <p class="opacity-75 my-auto">{{ currentOrder.length }} items</p>
            <p class="font-medium text-lg my-auto">
              {{ config.public.currency
              }}{{
                (totalPrice = currentOrder.reduce(
                  (acc, item) => acc + item.price,
                  0
                )).toLocaleString(config.public.locale)
              }}
            </p>
          </div>
          <button
            v-if="config.public.historyDatabase !== ''"
            @click="
              currentOrder.forEach((i) => {
                add2Db(
                  i.name,
                  i.price,
                  useCookie('cashier').value || 'Cashier'
                );
              });
              currentOrder.length = 0;
            "
            :disabled="currentOrder.length === 0"
            :class="
              currentOrder.length !== 0
                ? 'w-full py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 font-semibold text-gray-50'
                : 'w-full py-2 rounded-full bg-gradient-to-r from-gray-400 to-gray-400 font-semibold text-gray-50'
            "
          >
            Add to Database
          </button>
          <button
            v-else
            @click="currentOrder.length = 0"
            :disabled="currentOrder.length === 0"
            :class="
              currentOrder.length !== 0
                ? 'w-full py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 font-semibold text-gray-50'
                : 'w-full py-2 rounded-full bg-gradient-to-r from-gray-400 to-gray-400 font-semibold text-gray-50'
            "
          >
            Finish Order
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
const itemsList = ref([]);
const itemsSkeleton = ref(true);
const orderId = ref(1);
const currentOrder = reactive([]);
const totalPrice = reactive([]);
const usersList = ref([]);

async function getResults() {
  const quotes = (await supabase.from("quotes").select()).data;
  quote.value = quotes[Math.floor(Math.random() * quotes.length)].text;

  const items = (await supabase.from(config.public.itemsDatabase).select())
    .data;
  itemsList.value = items;

  if (config.public.usersDatabase !== "") {
    const users = (await supabase.from("cashiers").select()).data;
    usersList.value = users;
  }

  itemsSkeleton.value = false;
}

async function add2Db(
  ans_item: string,
  ans_profit: number,
  ans_cashier: string
) {
  if (config.public.historyDatabase !== "") {
    if (config.public.usersDatabase !== "") {
      await supabase
        .from(config.public.historyDatabase)
        .insert({
          item: ans_item,
          profit: ans_profit,
          cashier: ans_cashier,
        })
        .then((r: any) => console.log(r));
    } else {
      await supabase
        .from(config.public.historyDatabase)
        .insert({
          item: ans_item,
          profit: ans_profit,
        })
        .then((r: any) => console.log(r));
    }
  }
}

onMounted(() => {
  getResults();
});
</script>

<style>
.currentOrder-move,
.currentOrder-leave-active,
.currentOrder-enter-active {
  transition: all 0.25s;
}

.currentOrder-enter-from {
  opacity: 0;
  transform: translateY(1rem);
}
.currentOrder-enter-to {
  opacity: 1;
  transform: translateY(0px);
}

.currentOrder-leave-from {
  opacity: 1;
  transform: translateY(0px);
}
.currentOrder-leave-to {
  opacity: 0;
  transform: translateY(0.125rem);
}
.currentOrder-leave-active {
  position: absolute;
  width: 100%;
}
</style>
