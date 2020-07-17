<template>
    <div id="app" class="w-screen h-screen flex flex-col p-8 bg-gray-200">
        <panel
            :fullscreen="false"
            :expandVertically="true"
            :expandHorizontally="false"
            class="bg-white"
        >
            <template #header>
                <div class="p-4 border-b border-gray-200 text-rose-pink-0">tis</div>
            </template>
            <template #main>
                <div class="p-4">
                    <check-box
                        :checked="showSideOver"
                        @click="showSideOver = !showSideOver"
                        label="Show sidebar"
                    />
                    <base-button type="plain" @click="showSideOver = !showSideOver">CLICK</base-button>
                    <base-button type="error" @click="showSideOver = !showSideOver">CLICK</base-button>
                    <base-button type="warning" @click="showSideOver = !showSideOver">CLICK</base-button>
                    <base-button type="success" @click="showSideOver = !showSideOver">CLICK</base-button>
                    <toggle-switch
                        :value="showSideOver"
                        @toggle="showSideOver = !showSideOver"
                        onColor="red"
                    />

                    <!-- TIPTAP -->
                    <!-- <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
                        <button :class="{ 'font-bold': isActive.bold() }" @click="commands.bold">Bold</button>
                    </editor-menu-bar>
                    <editor-content :editor="editor" />-->
                    <text-editor :content="editorContent" @change="onEditorChange" />

                    <!-- TOOLTIP -->
                    <p>
                        Why dont you hover
                        <tooltip text="check this" bgcolor="gray-900" textcolor="gray-100">
                            <span class="text-teal-600">here</span>
                        </tooltip>?
                    </p>

                    <!-- POPPER -->
                    <base-popper
                        trigger="clickToOpen"
                        :options="{
                            placement: 'bottom-start',
                            modifiers: [
                                {
                                    name: 'offset',
                                    options: {
                                        offset: [0, 0],
                                    },
                                }
                            ]
                        }"
                        :appendToBody="true"
                    >
                        <div class="popper">Popper Content</div>
                        <button slot="reference">Reference Element</button>
                    </base-popper>

                    <!-- SIDEOVER -->
                    <side-over :show="showSideOver">
                        <template #header>
                            <h2 class="text-lg leading-7 font-medium text-gray-900">Filters</h2>
                            <close-button @click="showSideOver = false" />
                        </template>
                        <template #content>
                            <renderless-tags-input v-model="tags">
                                <div
                                    class="flex flex-wrap px-1 pt-1 border border-gray-400 text-xs rounded focus-within:border-blue-500 focus-within:shadow-outline"
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
                </div>
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

import BasePopper from "./components/BasePopper";
import Tooltip from "./components/Tooltip";

import TextEditor from "~/components/TextEditor";

export default {
    name: "app",
    components: {
        BaseButton,
        BasePopper,
        CheckBox,
        CloseButton,
        Panel,
        RenderlessTagsInput,
        SideOver,
        TextEditor,
        Tooltip,
        ToggleSwitch,
        BaseTag
    },
    data() {
        return {
            editorContent: "Yo mofo",
            showSideOver: false,
            tags: ["tis", "tos"]
        };
    },
    watch: {
        editorContent: function(newValue, oldValue) {
            console.log(newValue);
        }
    },
    methods: {
        onEditorChange(value) {
            console.log(value);
        }
    }
};
</script>