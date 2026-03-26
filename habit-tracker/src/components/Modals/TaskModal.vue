<script setup>
    const habit = defineModel('habit')
    const time = defineModel('time')
    const category = defineModel('category')

    const props = defineProps({
        errorHabitMessage: {
            type: String
        },
        errorTimeMessage: {
            type: String
        },
        errorCategoryMessage: {
            type: String
        },
        habitError: {
            type: Boolean
        },
        timeError: {
            type: Boolean
        },
        categoryError: {
            type: Boolean
        }
    })

    const emit = defineEmits([
        'hide', 'createTask'
    ])

    const hide = () => emit('hide')
    const createTask = () => emit('createTask')
</script>

<template>
    <div class="fixed inset-0 z-50 bg-[rgba(0,0,0,0.5)]
                                flex items-center justify-center">
        <div class="bg-white rounded-lg shadow-xl w-[450px] p-6 relative">
            <h2 class="text-xl font-semibold mb-4">Добавить новую привычку</h2>
            <div class="flex flex-col gap-6">
                <div class="flex flex-col gap-3">
                    <input type="text" v-model="habit" placeholder="Название привычки"
                            class="bg-gray-300 outline-none rounded-[4px] p-4 w-full"/>
                    <span v-if="habitError" class="text-sm text-red-500">{{ errorHabitMessage }}</span>
                </div>  
                <div class="flex flex-col gap-3">
                    <input type="text" v-model="time" placeholder="Время на выполнение (мин)"
                            class="bg-gray-300 outline-none rounded-[4px] p-4 w-full"/>
                    <span v-if="timeError" class="text-sm text-red-500">{{ errorTimeMessage }}</span>
                </div>

                <select class="bg-gray-300 outline-none rounded-[4px] p-4 text-gray-600">
                        <option disabled value="">Выберите частоту</option>
                        <option>Eжедневно</option>
                        <option>1 раз в неделю</option>
                        <option>3 раза в неделю</option>    
                </select>
                <div class="flex flex-col gap-3">
                    <input type="text" v-model="category" placeholder="Категория (например, здоровье, учеба)"
                            class="bg-gray-300 outline-none rounded-[4px] p-4"/>
                    <span v-if="categoryError" class="text-sm text-red-500">{{ errorCategoryMessage }}</span>
                </div>
            
                <div class="flex justify-end gap-4 mt-2">
                    <button @click="hide" class="px-7 py-4 text-white rounded-lg bg-gradient-to-b 
                            from-rose-400 to-rose-600 shadow-xl shadow-rose-500/40
                            active:scale-95 transition">
                        Отмена
                    </button>
                    <button @click="createTask" class="p-4 text-white rounded-lg bg-gradient-to-b
                            from-indigo-400 to-indigo-600 shadow-xl shadow-indigo-500/40
                            active:scale-95 transition">
                        Сохранить
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>