<template>
    <button
        @click="$emit('click')"
        aria-label="Close panel"
        class="text-gray-400 rounded hover:text-gray-500 focus:outline-none focus:shadow-outline transition ease-in-out duration-150"
    >
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
            />
        </svg>
    </button>
</template>

<script>
export default {
    name: "CloseButton"
};
</script>