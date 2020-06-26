import Vue from 'vue';

const baseStyle = 'inline-flex items-center justify-center shadow-sm border focus:outline-none transition ease-in-out duration-150';

const sizes = {
    xs: ' text-xs leading-none px-2 py-2 rounded-md',
    sm: ' text-sm leading-tight px-3 py-2 rounded-md',
    md: ' text-md leading-snug px-4 py-2 rounded-lg',
    lg: ' text-lg leading-normal px-6 py-3 rounded-lg',
    xl: ' text-xl leading-relaxed px-8 py-4 rounded-lg'
};

const types = {
    plain: ' border-gray-300 bg-white text-gray-700 shadow-sm hover:text-blue-500 hover:bg-gray-50 focus:outline-none focus:text-blue-500 focus:border-blue-300 focus:shadow-outline-blue',
    primary: ' bg-blue-500 border-transparent text-white hover:bg-blue-600 focus:border-blue-700 focus:shadow-outline-blue'
}

export default Vue.component('base-button', {
    props: {
        href: {
            type: String,
            required: false
        },
        onClick: {
            type: Function,
            required: false
        },
        size: {
            type: String,
            default: 'sm',
            validator: function (value) {
                return ['xs', 'sm', 'md', 'lg', 'xl'].indexOf(value) !== -1;
            }
        },
        type: {
            type: String,
            default: 'plain',
            validator: function (value) {
                return ['plain', 'primary'].indexOf(value) !== -1;
            }
        }
    },


    render: function (createElement) {
        const tag = this.href ? 'a' : 'button';

        const options = {};

        if (this.href) {
            options.attrs = {
                href: this.href
            }
        } else if (this.onClick) {
            options.on = {
                click: this.onClick
            }
        }
        options.class = baseStyle + sizes[this.size || 'sm'] + types[this.type || 'plain'];

        return createElement(tag, options, this.$slots.default);
    }
});