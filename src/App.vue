<template>
    <div id="app" class="w-screen h-screen flex flex-col p-8 bg-gray-200">
        <panel
            :fullscreen="false"
            :expandVertically="true"
            :expandHorizontally="false"
            class="bg-white"
        >
            <template #header>
                <div class="p-4 border-b border-gray-200">tis</div>
            </template>
            <template #main>
                <check-box
                    :checked="showSideOver"
                    @click="showSideOver = !showSideOver"
                    label="Show sidebar"
                />
                <base-button @click="showSideOver = !showSideOver">CLICK</base-button>
                <toggle-switch
                    :value="showSideOver"
                    @toggle="showSideOver = !showSideOver"
                    onColor="red"
                />
                <side-over :show="showSideOver">
                    <template #header>
                        <h2 class="text-lg leading-7 font-medium text-gray-900">Filters</h2>
                        <close-button @click="showSideOver = false" />
                    </template>
                    <template #content>
                        <renderless-tags-input v-model="tags">
                            <div
                                class="flex flex-wrap px-1 pt-1 border border-gray-400 text-xs rounded focus-within:border-blue-400 focus-within:shadow-outline"
                                slot-scope="{ tags, removeTag, inputAttrs, inputEvents }"
                            >
                                <base-tag
                                    v-for="tag in tags"
                                    :key="tag"
                                    @delete="removeTag(tag)"
                                >{{ tag }}</base-tag>
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
            </template>
            <template #footer>
                <div class="p-4 border-t border-gray-200">footer content</div>
            </template>
        </panel>
    </div>
</template>

<script>
import BaseButton from "./components/BaseButton";
import CloseButton from "./components/CloseButton";
import RenderlessTagsInput from "./components/RenderlessTagsInput";
import SideOver from "./components/SideOver";
import BaseTag from "./components/BaseTag";
import ToggleSwitch from "./components/ToggleSwitch";
import CheckBox from "./components/CheckBox";
import Panel from "./components/Panel";

export default {
    name: "app",
    components: {
        BaseButton,
        CheckBox,
        CloseButton,
        Panel,
        RenderlessTagsInput,
        SideOver,
        ToggleSwitch,
        BaseTag
    },
    data() {
        return {
            showSideOver: true,
            tags: ["tis", "tos"]
        };
    },
    methods: {}
};
</script>