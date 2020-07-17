<template>
    <button
        class="inline-flex items-center justify-center w-8 h-8 rounded bg-granite-gray-40 hover:bg-granite-grey-15 focus:outline-none focus:shadow-outline"
        :class="{ 'bg-granite-grey-15 font-bold': active }"
        @click="$emit('click')"
    >
        <slot />
    </button>
</template>

<script>
export default {
    name: "TextEditorButton",
    props: {
        active: {
            type: Boolean,
            default: false
        }
    }
};
</script>