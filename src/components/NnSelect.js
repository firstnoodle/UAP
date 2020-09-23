import Vue from 'vue';
import BaseButton from '~/components/BaseButton';
import BasePopper from '~/components/BasePopper';
import { sameWidth } from '~/utils/popper-modifiers';
import NnIcon from '~/components/NnIcon';
import NnSelectOption from '~/components/NnSelectOption';
import { loopRange } from '~/utils/array';

/**
 * PROPS:
 * select all on click  [ ]
 * outline = open       [ ]
 * arrow keys           [x]
 * autocomplete         [ ]
 * clearable            [ ]
 * disabled             [ ]
 * filterable           [x]
 * loading              [x]
 * loading-text         [x]
 * multiple...          [ ]
 * no-data-text         [ ]
 * no-match-text        [x]
 * no-match-option      [x]
 * placeholder          [ ]
 * remote               [x]
 * remote-method        [x]
 * value-key            [ ]
 */


export default Vue.component('nn-select', {
    components: { BaseButton, BasePopper, NnIcon, NnSelectOption },
    props: {
        value: {
            default: null,
        },
        placeholder: {
            type: String,
            default: 'select'
        },
        filterable: {
            type: Boolean,
            default: false
        },
        loading: {
            type: Boolean,
            default: false
        },
        loadingText: {
            type: String,
            default: 'Loading...'
        },
        noMatchText: {
            type: String,
            default: 'No match..'
        },
        noMatchOptionText: {
            type: String,
            default: 'Create'
        },
        remoteMethod: {
            type: Function,
            required: false
        }
    },

    data() {
        return {
            highlight: 'tosse',
            highlightedOption: null,
            popperOpen: false,
            visibleOptions: null,
        }
    },

    computed: {
        computedCaretRotation() {
            return this.popperOpen ? 'rotate-180' : 'rotate-0';
        },
    },

    created() {
        this.visibleOptions = this.$slots.default;
    },

    methods: {
        noMatchOption() {
            this.$emit('createNew', this.$refs.input.value);
            this.$refs.popper.doClose();
        },

        onInput(event) {
            // TODO: is this the appropriate way?
            if(this.filterable && !this.remoteMethod) {
                if(event.target.value.length) {
                    this.visibleOptions = this.$slots.default.filter(vnode => {
                        if(vnode.componentOptions) {
                            const targetString = vnode.componentOptions.propsData.label.toLowerCase();
                            const queryString = event.target.value.toLowerCase();
                            return targetString.includes(queryString);
                        }
                    });
                } else {
                    this.visibleOptions = this.$slots.default;
                }
            } else if(this.remoteMethod) {
                this.highlightedOption = null;
                this.remoteMethod(event.target.value);
            }
        },

        onInputFocus() {
            if(this.popperOpen) return;
            this.$refs.popper.doShow();
        },

        onKeyDown(event) {
            if(event.key === 'ArrowUp' || event.key === 'ArrowDown') {
                this.updateHighlight(event.key === 'ArrowUp' ? -1 : 1);
                event.stopPropagation();
                event.preventDefault();
            }

            if(event.key === 'Enter' && this.highlightedOption !== null) {
                let values = [];
                this.$slots.default.forEach(vnode => {
                    if(vnode.componentOptions.tag === 'nn-select-option') {
                        values.push(vnode);
                    }
                });

                this.$refs.popper.doClose();
                this.$emit('select', values[this.highlightedOption].componentInstance.$options.propsData.label);
                this.$refs.input.value = values[this.highlightedOption].componentInstance.$options.propsData.label;
                this.$refs.input.blur();
            }

            // switch(event.key) {
            //     case 'Enter':
            //         if(this.highlightedOption !== null) console.log('select ' + this.highlightedOption);
            //         this.$refs.popper.doToggle();
            //         break;
            //     case 'ArrowUp':
            //         this.updateHighlight(-1);
            //         break;
            //     case 'ArrowDown':
            //         this.updateHighlight(1);
            //         break;
            // }
        },

        onPopperShow() {
            this.popperOpen = true;
            this.$refs.input.focus();
        },

        onPopperHide() {
            this.popperOpen = false;
            // this.highlightedOption = null;
        },

        updateHighlight(value) {
            if(this.$slots.default) {
                let itemCount = 0;
                this.$slots.default.forEach(vnode => {
                    if(vnode.componentOptions.tag === 'nn-select-option') {
                        itemCount++;
                    }
                });

                if(this.highlightedOption === null) {
                    if(value > 0) this.highlightedOption = 0;
                    else this.highlightedOption = itemCount-1;
                } else {
                    this.highlightedOption = loopRange(this.highlightedOption + value, itemCount);
                }

                // trigger re-render
                this.$slots.default.forEach((vnode, index) => {
                    if(vnode.componentOptions.tag === 'nn-select-option') {
                        vnode.componentInstance.setFocus(index === this.highlightedOption);
                    }
                });
            }
        },

    },

    render: function (createElement) {
        let popperContent;
        if(this.remoteMethod) {
            if(this.loading) {
                popperContent = [createElement(
                    'div', 
                    { class: 'bg-white px-3 py-2 focus:outline-none text-gray-500 italic cursor-default', }, 
                    this.loadingText
                )];
            } else if(!this.$slots.default) {
                // undefined error is thrown if we don't do this check
                if(this.$refs.input) {
                    if(this.$refs.input.value) {
                        popperContent = [
                            // No match element
                            createElement(
                                'div', 
                                { class: 'bg-white px-3 py-2 focus:outline-none text-gray-500 italic cursor-default', }, 
                                this.noMatchText
                            ),
                            // Border
                            createElement('div', {class: 'border-b border-gray-200'}, []),
                            // No match option
                            createElement(
                                'div', 
                                { class: 'bg-white hover:bg-blue-100 px-3 py-2 focus:outline-none text-blue-500 cursor-pointer', on: { click: this.noMatchOption }}, 
                                [
                                    `${this.noMatchOptionText} `,
                                    createElement('span', {class: 'font-bold'}, `"${this.$refs.input.value}"`)
                                ]
                            )
                        ];
                    } else {
                        popperContent = [
                            createElement(
                                'div', 
                                { class: 'bg-white px-3 py-2 focus:outline-none text-gray-500 italic cursor-default', }, 
                                'Start typing...'
                            ),
                        ];
                    }
                }
            } else {
                for(const [index, vnode] of this.$slots.default.entries()) {
                    // only add eventlisteners to "real" vnodes
                    // whitespace also generates vnodes 
                    if(vnode.componentOptions) {
                        vnode.componentOptions.propsData.highlighted = index === this.highlightedOption;
                        // TODO: this check is done because in a future version labeled groups will be implemented
                        if(vnode.componentOptions.tag === 'nn-select-option') {
                            vnode.componentOptions.listeners = {
                                'optionClicked': value => {
                                    this.$refs.popper.doClose();
                                    this.$emit('select', value);
                                    this.$refs.input.value = value;
                                }
                            }
                        }
                    }
                }
                popperContent = this.$slots.default;
            }
        }

        const popper = createElement(
            'div', 
            { 
                style: 'max-height: 160px',
                class: 'popper overflow-y-scroll block text-sm border border-granite-grey-15 rounded shadow-lg overflow-hidden',
            }, 
            popperContent
        );

        const inputSuffixInner = createElement(
            'span', 
            { 
                class: 'nn-icon nn-icon-angle-down text-xs text-granite-grey transform transition-all duration-100 ' + this.computedCaretRotation, 
            }
        );
        const inputSuffix = createElement('div', { class: 'absolute top-0 right-0 pl-1 pr-3 h-full flex items-center rounded-lg bg-transparent cursor-pointer' }, [inputSuffixInner]);
        const inputInner = createElement(
            'input', 
            {
                ref: 'input',
                class: 'py-2 w-56 text-sm leading-tight bg-white text-gray-700 focus:outline-none cursor-pointer',
                attrs: {
                    autocomplete: 'off',
                    placeholder: this.placeholder,
                    readonly: !(this.filterable || this.remoteMethod),
                    type: 'text', // TODO: prop? email, or other types..
                },
                on: {
                    'focus': this.onInputFocus,
                    'input': this.onInput,
                    'keydown': this.onKeyDown,
                }
            }
        );

        // TODO: "focus" classes should be applied with computed function instead based on popperOpen
        const inputOuter = createElement(
            'div', 
            { 
                class: 'relative overflow-hidden inline-block text-sm leading-tight pl-3 rounded-md border border-granite-grey-15 bg-white text-gray-700 shadow-sm hover:text-blue-500 focus:outline-none focus:text-blue-500 focus-within:border-light-blue focus-within:shadow-outline cursor-pointer',
                slot: 'reference', 
            }, 
            [inputInner, inputSuffix]
        );

        return createElement(
            'base-popper', 
            {
                ref: 'popper',
                on: {
                    show: this.onPopperShow,
                    hide: this.onPopperHide,
                },
                props: { 
                    trigger: 'clickToOpen', 
                    options: { 
                        placement: 'bottom-start',
                        modifiers: [
                            sameWidth,
                            {
                                name: 'offset',
                                options: {
                                    offset: [0, 2],
                                },
                            }
                        ]
                    }
                } 
            }, 
            [inputOuter, popper]
        );
    }
});