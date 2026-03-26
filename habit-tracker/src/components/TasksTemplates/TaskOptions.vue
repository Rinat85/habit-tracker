<script setup>
    import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
    import { ChevronDownIcon } from '@heroicons/vue/20/solid'

    const emit = defineEmits([
      'deleteTask', 'addInComplete', 'addInProgress'
    ])
    const deleteTask = (id) => emit('deleteTask', id)
    const addInComplete = (id) => emit('addInComplete', id)
    const addInProgress = (id) => emit('addInProgress', id)
</script>

<template>
  <Menu as="div" class="relative inline-block">
    <MenuButton class="inline-flex w-full justify-center gap-x-1.5 rounded-md text-white rounded-lg 
                                bg-gradient-to-b from-indigo-400 to-indigo-600 shadow-lg 
                                shadow-indigo-500/40 active:scale-95 transition p-3 text-sm font-semibold 
                                text-white inset-ring-1 inset-ring-white/5 hover:bg-gray-500">
      Добавить
      <ChevronDownIcon class="-mr-1 size-5 text-white" aria-hidden="true" />
    </MenuButton>

    <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform scale-100" leave-to-class="transform opacity-0 scale-95">
      <MenuItems class="absolute right-1 z-10 mt-2 w-38 origin-top-right divide-y divide-white/40 rounded-md bg-indigo-400 outline-1 -outline-offset-1 outline-white/10">
        <div class="py-1">
          <MenuItem v-slot="{ active }">
            <button @click="addInComplete" class="w-full text-start">
              <span :class="[
                      active ? `bg-white/25 text-white outline-hidden` : 
                      'text-white', 'block px-4 py-2 text-sm'
                  ]">
                  В Выполненные
              </span>
            </button>
          </MenuItem>
        </div>
        <div class="py-1">
            <MenuItem v-slot="{ active }">
              <button @click="addInProgress" class="w-full text-start">
                <span :class="[
                        active ? 'bg-white/25 text-white outline-hidden' : 
                        'text-white', 'block px-4 py-2 text-sm'
                    ]">
                    В процессе
                </span>
              </button>
            </MenuItem>
        </div>
        <div class="py-1">
            <MenuItem v-slot="{ active }">
              <button @click="deleteTask" class="w-full text-start">
                <span :class="[
                        active ? 'bg-white/25 text-white outline-hidden' : 
                        'text-white', 'block px-4 py-2 text-sm'
                    ]">
                    Удалить
                </span>
              </button>
            </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>