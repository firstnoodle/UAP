// https://adamwathan.me/renderless-components-in-vuejs/
import Vue from 'vue';

export default Vue.component('renderless-tags-input', {
    props: ['value'],
    data() {
        return {
            newTag: '',
        }
    },
    methods: {
        addTag() {
            if (this.newTag.trim().length === 0 || this.value.includes(this.newTag.trim())) {
                return
            }
            this.$emit('input', [...this.value, this.newTag.trim()])
            this.newTag = ''
        },
        removeTag(tag) {
            this.$emit('input', this.value.filter(t => t !== tag))
        }
    },
    render() {
        return this.$scopedSlots.default({
            tags: this.value,
            addTag: this.addTag,
            removeTag: this.removeTag,
            inputAttrs: {
                value: this.newTag,
            },
            inputEvents: {
                input: (e) => { this.newTag = e.target.value },
                keydown: (e) => {
                    if (e.keyCode === 13) {
                        e.preventDefault()
                        this.addTag()
                    } else if (e.keyCode === 8) {
                        if (this.newTag.length === 0) {
                            // TODO: focus the last tag 
                            console.log('focus last tag');
                        }
                    }
                }
            }
        })
    },
})