import Vue from 'vue';

export default Vue.component('base-tag', {
    render: function (createElement) {

        const childElements = [];
        const componentOptions = {};
        componentOptions.class = 'flex-0 flex mb-1 mr-1 last:ml-0';

        // label
        const labelElementClass = this.$listeners.delete ? 'pl-2 py-1 rounded-l bg-gray-300' : 'px-2 py-1 rounded bg-gray-300';
        childElements.push(
            createElement('span', { class: labelElementClass }, this.$slots.default)
        );

        // delete button ?
        if (this.$listeners.delete) {
            const deleteIconClass = 'inline-flex items-center justify-center rounded-full w-4 h-4 text-gray-600 group-hover:bg-gray-400 group-hover:text-gray-900 group-focus:bg-gray-400 group-focus:text-gray-800 focus:border-gray-600';
            const deleteElementClass = 'group inline-flex items-center justify-center px-1 bg-gray-300 rounded-r focus:outline-none';

            const deleteIcon = createElement('span', { class: deleteIconClass }, 'x');
            const deleteElement = createElement('button', { class: deleteElementClass }, [deleteIcon]);

            // emit 'delete' event on click 
            componentOptions.on = {
                click: event => this.$emit('delete')
            }

            childElements.push(deleteElement);
        }

        return createElement('span', componentOptions, childElements);
    }
});