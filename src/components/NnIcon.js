import Vue from 'vue';

export default Vue.component('nn-icon', {
    functional: true,
    props: {
        value: {
            type: String,
            default: 'index-finger-up'
        },
        color: {
            type: String,
            default: ''
        },
        size: {
            type: String,
            default: ''
        }
    },
    render(createElement, context) {
        const size = context.props.size ? ` text-${context.props.size}` : '';
        const color = context.props.color ? ` text-${context.props.color}` : '';
        return createElement(
            'span', 
            { class: `nn-icon nn-icon-${context.props.value}${color}${size}`}
        );
    }
});