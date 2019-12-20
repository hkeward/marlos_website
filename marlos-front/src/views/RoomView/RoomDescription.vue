<template>
    <div>
        <div v-if="editing === currentRoom.roomId" class="editing">
            <editor-menu-bar class="editor-menu-bar" :editor="editor" v-slot="{ commands, isActive, getMarkAttrs }">
                <div>
                    <div>
                        <button :class="{ 'is-active': isActive.heading({ level: 1}) }" @click="commands.heading({ level: 1 })">
                            <font-awesome-icon icon="heading"></font-awesome-icon>1
                        </button>
                        <button :class="{ 'is-active': isActive.heading({ level: 2}) }" @click="commands.heading({ level: 2 })">
                            <font-awesome-icon icon="heading"></font-awesome-icon>2
                        </button>
                        <button :class="{ 'is-active': isActive.heading({ level: 3}) }" @click="commands.heading({ level: 3 })">
                            <font-awesome-icon icon="heading"></font-awesome-icon>3
                        </button>
                        <button :class="{ 'is-active': isActive.bold() }" @click="commands.bold">
                            <font-awesome-icon icon="bold"></font-awesome-icon>
                        </button>
                        <button :class="{ 'is-active': isActive.underline() }" @click="commands.underline">
                            <font-awesome-icon icon="underline"></font-awesome-icon>
                        </button>
                        <button :class="{ 'is-active': isActive.italic() }" @click="commands.italic">
                            <font-awesome-icon icon="italic"></font-awesome-icon>
                        </button>
                        <button :class="{ 'is-active': isActive.table() }" @click="commands.createTable({rowsCount: 3, colsCount: 3, withHeaderRow: true})">
                            <font-awesome-icon icon="table"></font-awesome-icon>
                        </button>
                        <button :class="{ 'is-active': isActive.link() }" @click="showLinkPrompt(getMarkAttrs('link'))">
                            <font-awesome-icon icon="link"></font-awesome-icon>
                        </button>
                        <button :class="{ 'is-active': isActive.image() }" @click="showImagePrompt()">
                            <font-awesome-icon icon="image"></font-awesome-icon>
                        </button>
                    </div>
                    <div>
                            <span v-if="isActive.table()" class="secondary-menubar" :class="{ 'is-active': isActive.table() }">
                                <button @click="commands.deleteTable">Delete table</button>
                                <button @click="commands.addColumnBefore">Add column before</button>
                                <button @click="commands.addColumnAfter">Add column after</button>
                                <button @click="commands.deleteColumn">Delete column</button>
                                <button @click="commands.addRowBefore">Add row before</button>
                                <button @click="commands.addRowAfter">Add row after</button>
                                <button @click="commands.deleteRow">Delete row</button>
                            </span>
                        <span v-else-if="newImageLink" class="secondary-menubar" :class="{ 'is-active': newImageLink }">
                                <div>
                                    <form @submit.prevent="setImageUrl(commands.image, imageLinkUrl)">
                                        <input class="link-input" type="text" v-model="imageLinkUrl" placeholder="https://" ref="imageLinkInput"/>
                                        <button class="link-input update-add" @click="setImageUrl(commands.image, imageLinkUrl)">
                                            <span>Add image</span>
                                        </button>
                                    </form>
                                </div>
                            </span>
                        <span v-else class="secondary-menubar" :class="{ 'is-active': isActive.link() || newLink }">
                                <div>
                                    <form @submit.prevent="setLinkUrl(commands.link, linkUrl)">
                                        <input class="link-input" type="text" v-model="linkUrl" placeholder="https://" ref="linkInput"/>
                                        <button class="link-input update-add" @click="setLinkUrl(commands.link, linkUrl)">
                                            <span>{{ isActive.link() ? 'Update' : 'Add'}}</span>
                                        </button>
                                        <button v-if="isActive.link() && getMarkAttrs('link').href !== undefined" class="link-input" @click="setLinkUrl(commands.link, null)" type="button">
                                            Remove link
                                        </button>
                                    </form>
                                </div>
                            </span>
                    </div>
                </div>
            </editor-menu-bar>
            <editor-content class="description" :editor="editor"></editor-content>
        </div>

        <div v-else class="description" v-html="currentRoom.description">
        </div>
    </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap';
import { Heading, Bold, Underline, Italic, Table, TableHeader, TableCell, TableRow, Link, Image } from 'tiptap-extensions';
import { mapState } from 'vuex';


export default {
    name: 'room-description',

    components: {
        EditorContent,
        EditorMenuBar
    },

    props: {
        currentRoom: {}
    },

    data() {
        return {
            editor: null,
            linkUrl: null,
            newLink: false,
            imageLinkUrl: null,
            newImageLink: false,
        }
    },

    computed: {
        ...mapState([
            'editing',
        ])
    },

    methods: {
        addBrToEmptyParagraph(html) {
            const emptyParagraphRegex = /<p><\/p>/g;
            return html.replace(emptyParagraphRegex, "<p><br></p>");
        },

        cleanDataColwidth(html) {
            const dataColwidthRegex = /data-colwidth/g;
            return html.replace(dataColwidthRegex, "width");
        },

        uncleanDataColwidth(html) {
            if (html == null) {
                return html;
            }
            const widthRegex = /width/g;
            return html.replace(widthRegex, "data-colwidth");
        },

        cleanLinkUrl(href) {
            const dotRegex = /\./;

            // prepend non-relative links with https://www.
            if (href.match(dotRegex)) {
                const badUrlPrefixRegex = /^(www\.|(?!(https?:\/\/www\.)))/;
                return href.replace(badUrlPrefixRegex, "https://www.");
            }

            return href;
        },

        showLinkPrompt(attrs) {
            this.linkUrl = attrs.href;
            if (!this.linkUrl) {
                this.newLink = true;
            }
            this.$nextTick(() => {
                this.$refs.linkInput.focus();
            })
        },

        setLinkUrl(command, url) {
            if (!url) {
                command({ href: url});
            } else {
                command({ href: this.cleanLinkUrl(url) });
            }
            this.linkUrl = null;
            this.newLink = false;
        },

        showImagePrompt() {
            if (!this.imageLinkUrl) {
                this.newImageLink = true;
            }
            this.$nextTick(() => {
                this.$refs.imageLinkInput.focus();
            })
        },

        setImageUrl(command, url) {
            if (url !== null) {
                command({ src: url });
            }
            this.imageLinkUrl = null;
            this.newImageLink = false;
        },
    },

    mounted() {
        this.editor = new Editor({
            extensions: [
                new Heading({
                    levels: [1, 2, 3]
                }),
                new Bold(),
                new Underline(),
                new Italic(),
                new Table({
                    resizable: true,
                }),
                new TableHeader(),
                new TableCell(),
                new TableRow(),
                new Link({
                    openOnClick: false,
                }),
                new Image()
            ],
            content: this.currentRoom.description,
            onUpdate: ({ getHTML }) => {
                const descriptionHTML = this.cleanDataColwidth(this.addBrToEmptyParagraph(getHTML()));
                this.currentRoom.description = descriptionHTML;
                this.$emit('input', descriptionHTML);
            },
        });
    },

    watch: {
        // populates the description when the room data is loaded
        currentRoom () {
            this.editor.setContent(this.uncleanDataColwidth(this.currentRoom.description));
        },

        'editor.isActive.link' (linkFn) {
            if (!linkFn()) {
                this.newLink = false;
                this.newImageLink = false;
            }
            this.linkUrl = this.editor.getMarkAttrs('link').href;
        }
    },

    beforeDestroy() {
        this.editor.destroy()
    },
}
</script>

<style scoped>
.description {
    white-space: pre-wrap;
    min-height: 100px;
    width: 100%;
    border: 1px solid transparent;
}

.editor-menu-bar button {
    /*margin-right: 3px;*/
    border: unset;
    border-radius: unset;
    border-left: 3px solid transparent;
    border-right: 1px solid white;
    background: transparent;
}

.editor-menu-bar button.is-active {
    background: #6d7392;
    border-left: 3px solid #6d7392;
}

.editor-menu-bar button:hover {
    background: #50596c;
}

.secondary-editor-menu-bar button {
    border-top: 2px double white;
    margin: 0;
}

.secondary-menubar {
    visibility: hidden;
}

.secondary-menubar.is-active {
    visibility: visible;
}

.link-input {
    width: unset;
    display: inline-block;
    background: #6d7392;
}

input.link-input {
    border-radius: 0;
    margin-left: 0.5rem;
    padding: 0rem 0.5rem;
    background: transparent;
    color: white;
    border: 1px solid white;
    min-width: 20rem;
}

button.link-input {
    border: none;
    border-radius: 3px;
    background: #6d7392;
    margin-left: 0.5rem;
    transition-duration: 0s;
}
</style>