<script setup>
    const props = defineProps({
        message: {
            type: String
        }
    })
    const emit = defineEmits([
        'confirm', 'cancel'
    ])
    const cancel = () => emit('cancel')
    const confirm = () => emit('confirm')
</script>

<template>
    <section class="fixed inset-0 z-50 bg-[rgba(0,0,0,0.5)]
                                flex items-center justify-center">
        <div class="bg-white rounded-2xl w-[400px] h-[200px] shadow-xl">
            <div class="flex flex-col justify-center items-center gap-y-8 pt-8">
                <h2 class="text-2xl text-center">{{ message }}</h2>
                <div class="flex justify-center gap-6">
                    <button @click="cancel" class="px-10 py-3 text-white rounded-lg bg-gradient-to-br 
                            from-rose-400 to-rose-600 shadow-xl shadow-rose-500/40
                            active:scale-95 transition">
                        Нет
                    </button>
                    <button @click="confirm" class="px-11 py-3 text-white rounded-lg bg-gradient-to-br 
                            from-indigo-400 to-indigo-600 shadow-xl shadow-indigo-500/40
                            active:scale-95 transition">
                        Да
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>