<template>
    <div id="app">
        <base-button @click="test">CLICK</base-button>

        <span class="bg-yellow-400 font-bold text-2xl px-2 py-1 rounded-sm">UAP</span>

        <side-over :show="showSideOver">
            <template #header>
                <h2 class="text-lg leading-7 font-medium text-gray-900">Filters</h2>
                <close-button @click="showSideOver = false" />
            </template>
            <template #content>
                <renderless-tags-input v-model="tags">
                    <div
                        class="flex flex-wrap px-1 pt-1 border border-gray-400 text-xs rounded focus-within:border-blue-600"
                        slot-scope="{ tags, removeTag, inputAttrs, inputEvents }"
                    >
                        <!-- TAG -->
                        <!-- <span class="flex-0 flex mb-1 mr-1 last:ml-0" v-for="tag in tags">
                            <span class="pl-2 py-1 rounded-l bg-gray-300">{{ tag }}</span>
                            <button
                                class="group px-1 bg-gray-300 rounded-r focus:outline-none focus:border-blue-800"
                                type="button"
                                @click="removeTag(tag)"
                            >
                                <span
                                    class="inline-flex items-center justify-center rounded-full w-4 h-4 text-gray-600 group-hover:bg-gray-400 group-hover:text-gray-900"
                                >&times;</span>
                            </button>
                        </span>-->
                        <base-tag v-for="tag in tags" :key="tag" @delete="removeTag(tag)">{{ tag }}</base-tag>

                        <!-- INPUT -->
                        <input
                            class="flex-1 py-1 mb-1 ml-1 focus:outline-none"
                            placeholder="Add tag..."
                            v-on="inputEvents"
                            v-bind="inputAttrs"
                        />
                    </div>
                </renderless-tags-input>
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
import BaseTag from "./components/BaseTag";

export default {
    name: "app",
    components: {
        BaseButton,
        CloseButton,
        RenderlessTagsInput,
        SideOver,
        BaseTag
    },
    data() {
        return {
            showSideOver: true,
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