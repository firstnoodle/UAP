import Vue from 'vue';
import BasePopper from './BasePopper.vue';

export default Vue.component('tooltip', {
    components: { BasePopper },
    props: {
        text: {
            type: String,
            required: true
        }
    },

    render(createElement) {
        const tooltipAttrs = { class: 'popper px-2 py-1 rounded bg-black text-white text-xs' };
        const tooltipElement = createElement('div', { attrs: tooltipAttrs }, this.text);

        const referenceElement = createElement('span', { slot: 'reference' }, this.$slots.default);

        const popperOptions = {
            props: {
                trigger: "hover",
                appendToBody: true,
                options: { placement: 'bottom' }
            }
        };

        return createElement('base-popper', popperOptions, [tooltipElement, referenceElement]);
    }
});