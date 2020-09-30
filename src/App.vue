<template>
    <div id="app" class="w-screen h-screen flex flex-col p-8 bg-gray-200">
        <panel
            :fullscreen="false"
            :expandVertically="true"
            :expandHorizontally="false"
            class="bg-white"
        >
            <template #header>
                <div class="p-4 border-b border-gray-200 text-rose-pink-0"></div>
            </template>
            <template #main>
                <div class="p-4">
                    <div class="p-4">
                    </div>

                    <div class="p-4">
                        <fn-select 
                            v-model="selectedOption" 
                            filterable
                            :loading="loading"
                            loading-text="Searching.."
                            :remoteMethod="fetchOptions"
                            no-match-option-text="Create domain"
                            :no-match-value="noMatchValue"
                            placeholder="Select domain"
                            @select="onSelect"
                            @createNew="onCreateNewState"
                            >
                                <fn-select-option 
                                    v-for="option in options" 
                                    :key="option.label" 
                                    :label="option.label" 
                                    :value="option"
                                />
                        </fn-select>
                    </div>

<!--                     
                    <check-box
                        :checked="showSideOver"
                        @click="showSideOver = !showSideOver"
                        label="Show sidebar"
                    />
                    <base-button type="plain" @click="showSideOver = !showSideOver">CLICK</base-button>
                    <base-button type="error" @click="showSideOver = !showSideOver">CLICKME</base-button>
                    <base-button type="warning" @click="showSideOver = !showSideOver">CLICK</base-button>
                    <base-button type="success" @click="showSideOver = !showSideOver">CLICK</base-button>
                    <base-button icon type="success" @click="showSideOver = !showSideOver">CLICK</base-button>
                    <toggle-switch
                        :value="showSideOver"
                        @toggle="showSideOver = !showSideOver"
                        onColor="red"
                    /> -->

                    <!-- TIPTAP -->
                    <!-- <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
                        <button :class="{ 'font-bold': isActive.bold() }" @click="commands.bold">Bold</button>
                    </editor-menu-bar>
                    <editor-content :editor="editor" />-->
                    <!-- <text-editor :content="editorContent" @change="onEditorChange" /> -->

                    <!-- Pagination -->
                    <!-- <pagination :paginator="paginator" /> -->



                    <!-- TOOLTIP -->
                    <!-- <p>
                        Why dont you hover
                        <tooltip text="check this" bgcolor="gray-900" textcolor="gray-100">
                            <span class="text-teal-600">here</span>
                        </tooltip>?
                    </p> -->

                    <!-- <search-highlight value="Highlighted search" highlight="ig" /> -->


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

import Pagination from "~/components/Pagination";
import FnSelect from "~/components/Select";
import FnSelectOption from "~/components/SelectOption";
import FnIcon from "~/components/Icon";
import SearchHighlight from "~/components/SearchHighlight";

export default {
    name: "app",
    components: {
        SearchHighlight,
        BaseButton,
        BasePopper,
        CheckBox,
        CloseButton,
        Pagination,
        Panel,
        RenderlessTagsInput,
        FnIcon,
        FnSelect,
        FnSelectOption,
        SideOver,
        TextEditor,
        Tooltip,
        ToggleSwitch,
        BaseTag
    },
    data() {
        return {
            editorContent: "Yo mofo",
            loading: false,
            noMatchValue: '',
            paginator: {
                currentPage: 1,
                lastPage: 22,
            },
            selectedOption: null,
            showSideOver: false,
            options: null,
            tags: ["tis", "tos"],
            states: [
                "ISO/GMP",
                "GDP",
                "GCP",
                "GLP",
                "GCLP",
                "PV",
                "RS",
                "ISO/GMP/GDP (supplier)",
                "ISO/GMP/GDP (contracting)",
                "GMP/GDP (IMP)",
            ]
        };
    },
    watch: {
        editorContent: function(newValue, oldValue) {
            console.log(newValue);
        },
    },
    methods: {
        fakeApiCall(value) {
            const filteredStates = this.states.filter(state => {
                const targetString = state.toLowerCase();
                const queryString = value.toLowerCase();
                return targetString.includes(queryString);
            });
            this.options = filteredStates.map(state => {
                return { label: state, value: state.toLowerCase() }
            });
            this.loading = false;
        },

        onCreateNewState(value) {
            this.loading = true;
            this.states.push(value);
            this.selectedOption = {label: value, value: value.toLowerCase()};
            this.fakeApiCall(value);
        },

        onEditorChange(value) {
            console.log(value);
        },

        fetchOptions(value, charsAdded) {
            // prevent API calls if nothing mathces
            if(this.options !== null) { // did we make an API call ?
                if(this.options.length === 0 && charsAdded > 0) { // do we have any results ?
                    return;
                }
            }

            this.loading = true;
            setTimeout(this.fakeApiCall.bind(null, value), 500);
        },

        onSelect(value) {
            this.selectedOption = value;
        }
    }
};
</script>