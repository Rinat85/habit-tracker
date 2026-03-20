<script setup>

</script>

<template>
    <div class="flex justify-center items-center min-h-screen">
        <div class="flex flex-col gap-8">
            <h1 class="text-3xl">Регистрация</h1>
            <div class="flex flex-col gap-6 w-[600px]">
                <input type="text" placeholder="Имя" class="bg-gray-300 outline-none rounded-[4px] p-4">
                <input type="text" placeholder="E-mail" class="bg-gray-300 outline-none rounded-[4px] p-4">
                <input type="text" placeholder="Пароль" class="bg-gray-300 outline-none rounded-[4px] p-4">
            </div>
            <div class="flex justify-center">
                <button @click="addAccount" class="px-12 py-6 text-white rounded-lg bg-gradient-to-br 
                            from-indigo-400 to-indigo-600 shadow-lg shadow-indigo-500/40
                            active:scale-95 transition">
                    Зарегестрироваться
                </button>
            </div>
        </div>
    </div>
</template>