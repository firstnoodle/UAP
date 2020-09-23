<template>
    <div
        class="my-4 border border-granite-grey-15 rounded focus-within:shadow-outline focus-within:border-light-blue-darker"
    >
        <!-- MENU -->
        <editor-menu-bar
            class="p-1 bg-granite-grey-40 rounded-t overflow-hidden border-b border-granite-grey-15"
            :editor="editor"
            v-slot="{ commands, isActive }"
        >
            <div>
                <text-editor-button>&larr;</text-editor-button>
                <text-editor-button>&rarr;</text-editor-button>

                <text-editor-button :active="isActive.bold()" @click="commands.bold">B</text-editor-button>
                <text-editor-button :active="isActive.italic()" @click="commands.italic">I</text-editor-button>
                <text-editor-button :active="isActive.underline()" @click="commands.underline">U</text-editor-button>
                <text-editor-button
                    :active="isActive.heading({ level: 1 })"
                    @click="commands.heading({ level: 1 })"
                >H1</text-editor-button>
                <text-editor-button
                    :active="isActive.heading({ level: 2 })"
                    @click="commands.heading({ level: 2 })"
                >H2</text-editor-button>
                <text-editor-button
                    :active="isActive.heading({ level: 3 })"
                    @click="commands.heading({ level: 3 })"
                >H3</text-editor-button>
                <text-editor-button
                    :active="isActive.heading({ level: 3 })"
                    @click="commands.heading({ level: 3 })"
                >&#182;</text-editor-button>
            </div>
        </editor-menu-bar>

        <!-- CONTENT -->
        <editor-content class="overflow-hidden rounded" :editor="editor" />
    </div>
</template>

<script>
import TextEditorButton from "~/components/TextEditorButton";
import { Editor, EditorContent, EditorMenuBar } from "tiptap";
import {
    Bold,
    Italic,
    Link,
    HardBreak,
    Heading,
    Underline
} from "tiptap-extensions";

export default {
    name: "TextEditor",
    components: {
        EditorContent,
        EditorMenuBar,
        TextEditorButton
    },
    props: {
        content: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            editor: new Editor({
                content: this.content,
                onUpdate: ({ getHTML }) => {
                    // get new content on update
                    this.$emit("change", getHTML());
                },
                extensions: [
                    // The editor will accept paragraphs and headline elements as part of its document schema.
                    new Bold(),
                    new Italic(),
                    new Link(),
                    new HardBreak(),
                    new Heading({
                        levels: [1, 2, 3]
                    }),
                    new Underline()
                ]
            })
        };
    },
    beforeDestroy() {
        // Always destroy your editor instance when it's no longer needed
        this.editor.destroy();
    }
};
</script>