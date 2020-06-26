<template>
    <div id="app">
        <base-button :onClick="test">CLICK</base-button>
        <span class="bg-yellow-400 font-bold text-2xl px-2 py-1 rounded-sm">UAP</span>
    </div>
</template>

<script>
import BaseButton from "./components/BaseButton";
export default {
    name: "app",
    components: { BaseButton },
    data() {
        return {};
    },
    methods: {
        test() {
            console.log("click");
        }
    }
};
</script>