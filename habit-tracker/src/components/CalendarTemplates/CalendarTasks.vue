<script setup>
    const props = defineProps({
        userTask: {
            type: Object
        }
    })
</script>

<template>
    <li class="bg-white rounded-[10px] px-5 py-3">
        <span>{{ userTask.habit }}</span>
    </li>
</template>