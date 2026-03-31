<script setup>
    import NavBarOptions from './NavBarOptions.vue';
    import SortOptions from './SortOptions.vue';

    const searchInput = defineModel('searchInput')

    const emit = defineEmits([
      'sortByNew', 'sortByOld'
    ])
    const sortByNew = () => emit('sortByNew')
    const sortByOld = () => emit('sortByOld')
</script>

<template>
    <nav class="bg-white flex items-center">
        <NavBarOptions />
        <div class="flex-1 flex justify-center">
            <input v-model="searchInput" type="text" placeholder="Поиск" class="bg-gradient-to-b from-indigo-400 to-indigo-600 
                    w-[500px] placeholder:text-sm placeholder:text-white outline-none rounded-[4px] p-4 
                    text-white shadow-xl">
        </div>
        <SortOptions @sort-by-new="sortByNew" @sort-by-old="sortByOld"/>
    </nav>
</template>