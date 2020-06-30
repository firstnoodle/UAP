<template>
    <div id="app">
        <base-button @click="test">CLICK</base-button>

        <span class="bg-yellow-400 font-bold text-2xl px-2 py-1 rounded-sm">UAP</span>

        <renderless-tags-input v-model="tags">
            <div class="tags-input" slot-scope="{ tags, removeTag, inputAttrs, inputEvents }">
                <span class="tags-input-tag" v-for="tag in tags">
                    <span>{{ tag }}</span>
                    <button type="button" class="tags-input-remove" @click="removeTag(tag)">&times;</button>
                </span>

                <input
                    class="tags-input-text"
                    placeholder="Add tag..."
                    v-on="inputEvents"
                    v-bind="inputAttrs"
                />
            </div>
        </renderless-tags-input>

        <side-over :show="showSideOver">
            <template #header>
                <h2 class="text-lg leading-7 font-medium text-gray-900">Panel title</h2>
                <close-button @click="showSideOver = false" />
            </template>
            <template #content>
                <div class="h-full border-2 border-dashed border-gray-200" style="height: 64rem"></div>
            </template>
            <template #footer>
                <span class="inline-flex rounded-md shadow-sm">
                    <base-button @click="showSideOver = false">Cancel</base-button>
                </span>
                <span class="inline-flex rounded-md shadow-sm">
                    <base-button type="primary">Save</base-button>
                </span>
            </template>
        </side-over>
    </div>
</template>

<script>
import BaseButton from "./components/BaseButton";
import CloseButton from "./components/CloseButton";
import RenderlessTagsInput from "./components/RenderlessTagsInput";
import SideOver from "./components/SideOver";
export default {
    name: "app",
    components: { BaseButton, CloseButton, RenderlessTagsInput, SideOver },
    data() {
        return {
            showSideOver: false,
            tags: ["tis", "tos"]
        };
    },
    methods: {
        test() {
            this.showSideOver = !this.showSideOver;
        }
    }
};
</script>