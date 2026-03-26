<script setup>
    import NavBarOptions from './NavBarOptions.vue';


</script>

<template>
    <nav class="bg-white w-full p-6 flex items-center">
        <NavBarOptions />
        <div class="flex-1 flex justify-center">
            <input type="text" placeholder="Поиск" class="bg-gradient-to-b from-indigo-400 to-indigo-600 
                    w-[500px] placeholder:text-sm placeholder:text-white outline-none rounded-[4px] p-4 
                    text-white shadow-xl">
        </div>
    </nav>
</template>