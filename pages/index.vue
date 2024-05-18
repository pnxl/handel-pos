<template>
  <div class="p-8 flex flex-col w-full gap-y-8 h-full">
    <div class="w-full flex justify-between flex-row gap-x-4">
      <p class="text-xl font-semibold text-left flex flex-col my-auto">
        Cashier
        <span class="mt-1 text-base font-normal text-gray-500">
          {{ quote }}
        </span>
      </p>
      <HeadlessMenu as="div" class="my-auto" v-if="tableNames.users">
        <div
          :class="
            (!useCookie('cashier').value ? 'animate-pulse-bg' : '') +
            ' p-1 rounded-2xl'
          "
        >
          <HeadlessMenuButton
            class="my-auto flex relative z-10 flex-row group w-56 md:w-72 justify-between gap-x-2 bg-gray-50 py-3 px-6 rounded-xl border border-gray-200 hover:border-indigo-500 hover:bg-indigo-100"
          >
            <div
              class="my-auto flex-row flex gap-x-3 group text-left"
              v-if="useCookie('cashier').value"
            >
              <img
                :src="useCookie('cashierImage').value || undefined"
                class="md:block hidden rounded-full my-auto h-8 object-cover aspect-square border border-transparent group-hover:border-indigo-500"
              />
              <p
                class="md:flex flex-row gap-x-1 hidden text-ellipsis line-clamp-1 my-auto"
              >
                Hi,
                <span class="font-semibold text-ellipsis line-clamp-1">{{
                  (useCookie("cashier").value || "Default Cashier")
                    .split(" ")
                    .slice(0, 2)
                    .join(" ")
                }}</span>
              </p>
              <p class="md:hidden text-gray-500 my-auto">
                <span class="font-semibold">{{
                  (useCookie("cashier").value || "Default Cashier")
                    .split(" ")
                    .slice(0, 2)
                    .join(" ")
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
            class="absolute right-0 mr-8 z-50 mt-2 w-56 md:w-72 rounded-xl bg-gray-50 shadow-lg ring-1 ring-black/5 focus:outline-none"
          >
            <div class="px-1 py-1 flex-col gap-y-1 flex">
              <HeadlessMenuItem v-for="user in usersList" :key="user.id">
                <button
                  v-if="useCookie('cashier').value === user.fullName"
                  class="bg-indigo-200/75 active:bg-indigo-200/75 group flex gap-x-3 w-full rounded-lg px-5 py-2"
                  @click="
                    useCookie('cashier').value = user.fullName;
                    useCookie(
                      'cashierImage'
                    ).value = `${config.public.databaseUrl}/storage/v1/object/public/${bucketNames.users}/${user.image}`;
                  "
                >
                  <img
                    :src="`${config.public.databaseUrl}/storage/v1/object/public/${bucketNames.users}/${user.image}`"
                    class="md:block hidden rounded-full my-auto h-8 object-cover aspect-square border border-transparent group-hover:border-indigo-500"
                  />
                  <p class="my-auto line-clamp-1 text-ellipsis text-left">
                    {{ user.fullName }}
                  </p>
                </button>
                <button
                  v-else
                  class="hover:bg-indigo-100 active:bg-indigo-200 group flex gap-x-3 w-full rounded-lg px-5 py-2"
                  @click="
                    useCookie('cashier').value = user.fullName;
                    useCookie(
                      'cashierImage'
                    ).value = `${config.public.databaseUrl}/storage/v1/object/public/${bucketNames.users}/${user.image}`;
                  "
                >
                  <img
                    :src="`${config.public.databaseUrl}/storage/v1/object/public/${bucketNames.users}/${user.image}`"
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
    <div
      class="flex flex-row gap-x-2 max-h-[74%] md:max-h-[82.5%] xl:max-h-[90%] 2xl:max-h-[94%] h-full"
    >
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
            class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-4 pb-6"
          >
            <button
              class="rounded-xl border-gray-300 text-left border-2 w-40 flex-auto hover:border-indigo-400 active:bg-indigo-50 duration-[250ms]"
              v-for="item in itemsList"
              :key="item.id"
              @click="
                if (item.options && item.options.length !== 0) {
                  modalCurrentId = orderId++;
                  modalCurrentItem = item.name || 'No Name';
                  modalCurrentImage =
                    `${config.public.databaseUrl}/storage/v1/object/public/${bucketNames.items}/${item.image}` ||
                    `${config.public.databaseUrl}/storage/v1/object/public/${bucketNames.items}/noimage.jpg`;
                  modalCurrentPrice = item.price || 0;
                  modalCurrentModifications = toRaw(
                    item.options
                  ) as MenuOption[];
                  console.log(modalCurrentModifications);
                  openItemModal();
                } else {
                  currentOrder.unshift({
                    id: orderId++,
                    name: item.name,
                    image: `${config.public.databaseUrl}/storage/v1/object/public/${bucketNames.items}/${item.image}`,
                    price: item.price,
                    options: [],
                    note: '',
                  });
                }
              "
            >
              <div class="p-3 flex flex-col gap-y-2 h-full justify-between">
                <div class="flex flex-col gap-y-2">
                  <img
                    :src="`${config.public.databaseUrl}/storage/v1/object/public/${bucketNames.items}/${item.image}`"
                    class="rounded-xl w-full object-cover aspect-square"
                  />
                  <p class="text-lg font-semibold">{{ item.name }}</p>
                  <p class="opacity-75 mb-4 text-sm">
                    {{ item.description }}
                  </p>
                </div>
                <p class="">
                  {{ config.public.currency
                  }}{{ item?.price?.toLocaleString(config.public.locale) }}
                </p>
              </div>
            </button>
          </div>
          <HeadlessTransitionRoot appear :show="modalIsOpen" as="template">
            <HeadlessDialog
              as="div"
              @close="closeItemModal()"
              class="relative z-30"
            >
              <HeadlessTransitionChild
                as="template"
                enter="duration-[250ms] ease-out"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="duration-[250ms] ease-in"
                leave-from="opacity-100"
                leave-to="opacity-0"
              >
                <div class="fixed inset-0 bg-gray-950/50" />
              </HeadlessTransitionChild>
              <div
                class="fixed inset-0 flex flex-col justify-center overflow-y-auto"
              >
                <div
                  class="flex flex-col items-center h-[90%] overflow-y-auto justify-center md:p-4 text-center"
                >
                  <HeadlessTransitionChild
                    as="template"
                    enter="duration-[250ms] ease-out"
                    enter-from="scale-90 opacity-0"
                    enter-to="scale-100 opacity-100"
                    leave="duration-[250ms] ease-in"
                    leave-from="scale-100 opacity-100"
                    leave-to="scale-90 opacity-0"
                  >
                    <HeadlessDialogPanel
                      class="w-full md:max-w-[48rem] lg:max-w-[56rem] xl:max-w-[72rem] 2xl:max-w-[104rem] h-full flex flex-col gap-y-8 transform overflow-hidden md:rounded-2xl border border-gray-200 bg-gray-50 p-6 text-left align-middle shadow-xl transition-all"
                    >
                      <div class="flex flex-row justify-between">
                        <div class="flex flex-row gap-x-4">
                          <img
                            :src="modalCurrentImage"
                            class="h-[3.25rem] aspect-square rounded-lg my-auto"
                          />
                          <div class="my-auto">
                            <HeadlessDialogTitle
                              as="h1"
                              class="text-xl font-semibold"
                              >{{ modalCurrentItem }}</HeadlessDialogTitle
                            >
                            <p class="mt-1 text-base font-normal text-gray-500">
                              Choose modifications to apply on the product...
                            </p>
                          </div>
                        </div>
                        <button @click="closeItemModal()">
                          <Icon
                            name="mdi:close"
                            class="text-2xl my-auto hover:text-red-500 text-gray-500"
                          />
                        </button>
                      </div>

                      <div
                        class="flex flex-row overflow-y-auto overflow-x-hidden gap-x-6 h-full"
                      >
                        <div class="flex flex-col gap-y-8 grow">
                          <div
                            v-for="modification in modalCurrentModifications"
                            :key="modification.category"
                            :id="modification.category"
                          >
                            <p class="text-lg font-medium">
                              {{ modification.category }}
                            </p>
                            <div
                              class="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-2 gap-y-2 mt-2"
                            >
                              <button
                                v-for="item in modification.items"
                                :key="item.name"
                                :id="item.name"
                                @click="
                                  //@ts-ignore
                                  currentModifications.unshift({
                                    id: modificationId++,
                                    name: item.name,
                                    price: item.price,
                                    note: '',
                                  })
                                "
                                class="p-2 rounded-xl active:bg-indigo-50 duration-[250ms] flex text-left flex-row justify-between border-2 border-gray-300 hover:border-indigo-400"
                              >
                                <p class="my-auto">
                                  {{ item.name }}
                                </p>
                                <p
                                  class="opacity-50 text-sm my-auto text-right"
                                >
                                  {{ config.public.currency
                                  }}{{
                                    item.price.toLocaleString(
                                      config.public.locale
                                    )
                                  }}
                                </p>
                              </button>
                            </div>
                          </div>
                        </div>

                        <div
                          class="w-1 rounded-full h-full bg-gray-200/50"
                        ></div>
                        <div class="flex flex-col w-1/3 justify-end">
                          <TransitionGroup
                            tag="div"
                            name="currentModifications"
                            class="flex flex-col-reverse relative gap-y-6 lg:gap-y-4 h-full overflow-y-auto"
                          >
                            <div
                              v-for="item in currentModifications"
                              :key="item.id"
                              :id="String(item.id)"
                            >
                              <div
                                class="flex lg:flex-row flex-col justify-between gap-x-4 my-auto pr-3"
                              >
                                <div class="flex flex-row gap-x-2">
                                  <div class="my-auto">
                                    <p class="font-semibold text-ellipsis">
                                      {{ item.name }}
                                    </p>
                                    <p class="text-ellipsis">
                                      {{ config.public.currency
                                      }}{{
                                        item.price.toLocaleString(
                                          config.public.locale
                                        )
                                      }}
                                    </p>
                                  </div>
                                </div>
                                <button
                                  class="group lg:block hidden"
                                  @click="
                                    currentModifications.splice(
                                      currentModifications.findIndex(
                                        (i) => i.id === item.id
                                      ),
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
                                    currentModifications.splice(
                                      currentModifications.findIndex(
                                        (i) => i.id === item.id
                                      ),
                                      1
                                    )
                                  "
                                >
                                  <div
                                    class="flex flex-row mx-auto gap-x-1 w-fit"
                                  >
                                    <Icon
                                      name="mdi:close-circle"
                                      class="text-2xl my-auto text-red-800 group-hover:text-red-400"
                                    />
                                    <p class="my-auto text-red-800 text-sm">
                                      Delete
                                    </p>
                                  </div>
                                </button>
                              </div>
                            </div>
                          </TransitionGroup>

                          <hr class="border-gray-300 rounded-full my-4" />
                          <div class="flex flex-row justify-between">
                            <p class="opacity-75 my-auto">
                              {{ currentModifications.length }} items
                            </p>
                            <p class="font-medium text-lg my-auto">
                              {{ config.public.currency
                              }}{{
                                (
                                  currentModifications.reduce(
                                    (acc, item) => acc + item.price,
                                    0
                                  ) + modalCurrentPrice
                                ).toLocaleString(config.public.locale)
                              }}
                            </p>
                          </div>
                          <button
                            type="button"
                            class="min-w-full mt-4 p-2 rounded-full bg-indigo-200/75 hover:bg-indigo-100 text-indigo-800 hover:text-indigo-900 font-medium"
                            @click="
                              currentOrder.unshift({
                                id: orderId++,
                                name: modalCurrentItem,
                                image: modalCurrentImage,
                                price: (orderPrice =
                                  currentModifications.reduce(
                                    (acc, item) => acc + (item.price || 0),
                                    0
                                  ) + modalCurrentPrice),
                                options: JSON.parse(
                                  JSON.stringify(currentModifications)
                                ),
                                note: '',
                              });
                              closeItemModal();
                            "
                          >
                            {{
                              currentModifications.length !== 0
                                ? "Add with selected modifications"
                                : "Add without modifications"
                            }}
                          </button>
                        </div>
                      </div>
                    </HeadlessDialogPanel>
                  </HeadlessTransitionChild>
                </div>
              </div>
            </HeadlessDialog>
          </HeadlessTransitionRoot>
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
          key="currentOrder"
          name="currentOrder"
          class="flex -mx-6 flex-col-reverse relative gap-y-6 lg:gap-y-4 overflow-y-auto h-full"
        >
          <div
            v-for="item in currentOrder"
            :key="item.id"
            :id="item.id.toString()"
          >
            <div
              class="flex lg:flex-row flex-col justify-between gap-x-4 my-auto px-6"
            >
              <div class="flex flex-row gap-x-2">
                <div class="my-auto">
                  <p class="text-lg font-semibold text-ellipsis">
                    {{ item.name }}
                  </p>
                  <div
                    v-for="options in item.options as MenuOption['items']"
                    class="opacity-75 text-sm"
                  >
                    + {{ options?.name }}
                  </div>
                  <p class="text-ellipsis">
                    {{ config.public.currency
                    }}{{ item?.price?.toLocaleString(config.public.locale) }}
                  </p>
                  <div
                    class="opacity-75 text-sm"
                    v-if="String(item.note).trim() !== ''"
                  >
                    <div
                      class="text-sm"
                      v-if="String(item.note).trim() !== 'undefined'"
                    >
                      ({{ String(item.note).trim() }})
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-auto flex flex-row gap-x-2">
                <button
                  class="group lg:block hidden mt-auto"
                  @click="openNoteModal(item.id)"
                >
                  <Icon
                    name="mdi:note-edit"
                    class="text-2xl mx-auto mb-auto text-gray-500 group-hover:text-gray-400"
                  />
                </button>
                <button
                  class="group lg:block hidden mt-auto"
                  @click="
                    currentOrder.splice(
                      currentOrder.findIndex((i) => i.id === item.id),
                      1
                    )
                  "
                >
                  <Icon
                    name="mdi:close-circle"
                    class="text-2xl mx-auto mb-auto text-red-800 group-hover:text-red-400"
                  />
                </button>
                <button
                  class="group lg:hidden grow bg-gray-300 hover:bg-gray-200 rounded-md mt-2 py-1"
                  @click="openNoteModal(item.id)"
                >
                  <div class="flex flex-row mx-auto gap-x-1 w-fit">
                    <Icon
                      name="mdi:note-edit"
                      class="text-2xl my-auto text-gray-700 group-hover:text-gray-500"
                    />
                    <p class="my-auto text-gray-800 text-sm">Note</p>
                  </div>
                </button>
                <button
                  class="group lg:hidden grow bg-red-200 hover:bg-red-100 rounded-md mt-2 py-1"
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
                      class="text-2xl my-auto text-red-800 group-hover:text-red-600"
                    />
                    <p class="my-auto text-red-800 text-sm">Delete</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
          <HeadlessTransitionRoot appear :show="noteIsOpen" as="template">
            <HeadlessDialog
              as="div"
              @close="closeNoteModal()"
              class="relative z-30"
            >
              <HeadlessTransitionChild
                as="template"
                enter="duration-[250ms] ease-out"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="duration-[250ms] ease-in"
                leave-from="opacity-100"
                leave-to="opacity-0"
              >
                <div class="fixed inset-0 bg-gray-950/50" />
              </HeadlessTransitionChild>
              <div
                class="fixed inset-0 flex flex-col justify-center overflow-y-auto"
              >
                <div
                  class="flex flex-col items-center h-[90%] overflow-y-auto justify-center md:p-4 text-center"
                >
                  <HeadlessTransitionChild
                    as="template"
                    enter="duration-[250ms] ease-out"
                    enter-from="scale-90 opacity-0"
                    enter-to="scale-100 opacity-100"
                    leave="duration-[250ms] ease-in"
                    leave-from="scale-100 opacity-100"
                    leave-to="scale-90 opacity-0"
                  >
                    <HeadlessDialogPanel
                      class="w-full md:max-w-[24rem] lg:max-w-[40rem] xl:max-w-[72rem] 2xl:max-w-[104rem] flex flex-col gap-y-8 transform overflow-hidden md:rounded-2xl border border-gray-200 bg-gray-50 p-6 text-left align-middle shadow-xl transition-all"
                    >
                      <div class="flex flex-row justify-between w-full">
                        <div class="flex flex-row gap-x-4">
                          <div class="my-auto">
                            <HeadlessDialogTitle
                              as="h1"
                              class="text-xl font-semibold"
                              >Note</HeadlessDialogTitle
                            >
                            <p class="mt-1 text-base font-normal text-gray-500">
                              Add a note to this product...
                            </p>
                          </div>
                        </div>
                      </div>
                      <textarea
                        rows="5"
                        cols="33"
                        v-model="noteText"
                        class="bg-gray-50 border-2 p-2 border-gray-200 rounded-xl"
                      ></textarea>
                      <div class="flex flex-row justify-end gap-x-2">
                        <button
                          @click="
                            currentOrder[
                              currentOrder
                                .map((i) => {
                                  return i.id;
                                })
                                .indexOf(noteCurrentId)
                            ].note = noteText;
                            closeNoteModal();
                            noteText = '';
                          "
                          class="px-4 py-2 bg-indigo-200/75 hover:bg-indigo-100 rounded-xl text-indigo-800 font-medium hover:text-indigo-900"
                        >
                          Apply
                        </button>
                        <button
                          @click="closeNoteModal()"
                          class="px-4 py-2 bg-red-200/75 hover:bg-red-100 rounded-xl text-red-800 font-medium hover:text-red-900"
                        >
                          Cancel
                        </button>
                      </div>
                    </HeadlessDialogPanel>
                  </HeadlessTransitionChild>
                </div>
              </div>
            </HeadlessDialog>
          </HeadlessTransitionRoot>
        </TransitionGroup>
        <div class="z-10 w-full bg-gray-50 flex flex-col gap-y-4">
          <hr class="border-gray-300 rounded-full" />
          <div class="flex flex-row justify-between">
            <p class="opacity-75 my-auto">{{ currentOrder.length }} items</p>
            <p class="font-medium text-lg my-auto">
              {{ config.public.currency
              }}{{
                (totalPrice = currentOrder.reduce(
                  (acc, item) => acc + (item.price || 0),
                  0
                )).toLocaleString(config.public.locale)
              }}
            </p>
          </div>
          <div class="w-full">
            <div class="relative w-full min-w-[200px] h-10 mb-2">
              <input
                class="peer w-full h-full bg-transparent focus:outline-0 transition-all border-2 focus:border-2 border-t-gray-300 focus:border-t-transparent p-3 rounded-lg border-gray-300 focus:border-indigo-500"
                placeholder=""
                ref="currentAssignment"
              /><label
                class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-indigo-500 before:border-gray-300 peer-focus:before:!border-indigo-500 after:border-gray-300 peer-focus:after:!border-indigo-500"
                >Assign a name to this order...
              </label>
            </div>
          </div>

          <button
            v-if="tableNames.history"
            @click="
              currentOrder.forEach((i) => {
                add2Db(
                  i.name,
                  i.price || 0,
                  i.options || [],
                  i.note || '',
                  useCookie('cashier').value || 'Cashier'
                );
                sendToKitchen(
                  currentAssignment.value,
                  i.name,
                  i.options || [],
                  i.note || ''
                );
              });
              currentOrder.length = 0;
              currentAssignment.value = '';
            "
            :disabled="currentOrder.length === 0"
            :class="
              currentOrder.length !== 0
                ? 'w-full py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 font-medium text-gray-50'
                : 'w-full py-2 rounded-full bg-gradient-to-r from-gray-400 to-gray-400 font-medium text-gray-50'
            "
          >
            Finish Order
          </button>
          <button
            v-else
            @click="currentOrder.length = 0"
            :disabled="currentOrder.length === 0"
            :class="
              currentOrder.length !== 0
                ? 'w-full py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 font-medium text-gray-50'
                : 'w-full py-2 rounded-full bg-gradient-to-r from-gray-400 to-gray-400 font-medium text-gray-50'
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
import type { Database, Json, MenuOption, Tables } from "~/types/supabase";
import { tableNames, bucketNames } from "~/utils/databaseNames";

const config = useRuntimeConfig();

const supabase = createClient<Database>(
  config.public.databaseUrl,
  config.public.anonymousApikey
);

const defaultQuote = "Welcome to Handel.";

const usersList: Ref<Array<Tables<"cashiers">> | null> = ref(null);
const quote = ref("");
const itemsList: Ref<Array<Tables<"menu">> | null> = ref(null);
const itemsSkeleton = ref(true);

const orderId = ref(1);
const modificationId = ref(1);

const modalIsOpen = ref(false);
const modalCurrentId = ref(1);
const modalCurrentItem = ref("No Name");
const modalCurrentImage = ref(
  `${config.public.databaseUrl}/storage/v1/object/public/${bucketNames.items}/noimage.png`
);
const modalCurrentPrice = ref(0);
const modalCurrentModifications: Ref<MenuOption[] | []> = ref([]);

const noteIsOpen = ref(false);
const noteCurrentId = ref(1);
const noteCurrentItem = ref("No Name");
const noteCurrentImage = ref(
  `${config.public.databaseUrl}/storage/v1/object/public/${bucketNames.items}/noimage.png`
);
const noteText = ref("");

const currentModifications: MenuOption["items"] | [] = reactive([]);
const currentOrder: Array<Tables<"menu">> = reactive([]);
const currentAssignment = ref("");
const orderPrice = ref(0);
const totalPrice = ref(0);

function closeItemModal() {
  modalIsOpen.value = false;
  setTimeout(() => {
    modalCurrentId.value = 1;
    modificationId.value = 1;
    modalCurrentItem.value = "No Name";
    modalCurrentImage.value = `${config.public.databaseUrl}/storage/v1/object/public/${bucketNames.items}/noimage.jpg`;
    modalCurrentPrice.value = 0;
    currentModifications.length = 0;
  }, 250);
}

function openItemModal() {
  modalIsOpen.value = true;
}

function closeNoteModal() {
  noteIsOpen.value = false;
  setTimeout(() => {
    noteCurrentId.value = 1;
    noteCurrentItem.value = "No Name";
    noteCurrentImage.value = `${config.public.databaseUrl}/storage/v1/object/public/${bucketNames.items}/noimage.jpg`;
    noteText.value = "";
  }, 250);
}

function openNoteModal(id: number) {
  noteIsOpen.value = true;
  noteCurrentId.value = id;
}

async function getResults() {
  const quotes = (await supabase.from(tableNames.quotes).select()).data;
  quote.value = quotes
    ? quotes[Math.floor(Math.random() * quotes.length)].text
    : defaultQuote;

  const items = (await supabase.from(tableNames.items).select()).data;
  itemsList.value = items;

  if (config.public.usersDatabase !== "") {
    const users = (await supabase.from(tableNames.users).select()).data;
    usersList.value = users;
  }

  itemsSkeleton.value = false;
}

async function add2Db(
  ans_item: string,
  ans_revenue: number,
  ans_options: Json[],
  ans_notes: string,
  ans_cashier: string
) {
  if (config.public.historyDatabase !== "") {
    if (config.public.usersDatabase !== "") {
      //@ts-ignore
      await supabase
        .from(tableNames.history)
        .insert({
          item: ans_item,
          revenue: ans_revenue,
          options: ans_options,
          notes: ans_notes,
          cashier: ans_cashier,
        })
        .then((r: any) => console.log(r));
    } else {
      //@ts-ignore
      await supabase
        .from(tableNames.history)
        .insert({
          item: ans_item,
          revenue: ans_revenue,
          options: ans_options,
          notes: ans_notes,
        })
        .then((r: any) => console.log(r));
    }
  }
}

async function sendToKitchen(
  ans_assignment: string,
  ans_item: string,
  ans_options: Json[],
  ans_notes: string
) {
  //@ts-ignore
  await supabase
    .from(tableNames.realtime)
    .insert({
      assignment: ans_assignment,
      item: ans_item,
      options: ans_options,
      notes: ans_notes,
    })
    .then((r: any) => console.log(r));
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

.currentModifications-move,
.currentModifications-leave-active,
.currentModifications-enter-active {
  transition: all 0.25s;
}

.currentModifications-enter-from {
  opacity: 0;
  transform: translateY(1rem);
}
.currentModifications-enter-to {
  opacity: 1;
  transform: translateY(0px);
}

.currentModifications-leave-from {
  opacity: 1;
  transform: translateY(0px);
}
.currentModifications-leave-to {
  opacity: 0;
  transform: translateY(0.125rem);
}
.currentModifications-leave-active {
  position: absolute;
  width: 100%;
}
</style>
