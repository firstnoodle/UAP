<template>
    <nav class="relative z-0 inline-flex shadow-sm">
        <button 
            href="#"
            rel="prev" 
            aria-label="previous page" 
            class="relative inline-flex items-center px-2 py-1 border border-granite-grey-15 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-primary-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:border-light-blue-darker focus:shadow-outline active:bg-gray-100 active:text-primary-500 transition ease-in-out duration-150 rounded-l-md"
            >
            <x-icon icon="angle-left" />
        </button>
        <span class="-ml-px relative inline-flex items-center z-0 px-3 py-1 border border-granite-grey-15 bg-white text-sm leading-5 font-light text-gray-700">
            {{ paginator.currentPage }} / <a href="/goto-last-page" class="ml-1 hover:text-primary-500">{{ paginator.lastPage }}</a>
        </span>
        <button 
            rel="next" 
            aria-label="next page" 
            class="relative inline-flex items-center px-2 py-1 border border-granite-grey-15 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-primary-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:border-light-blue-darker focus:shadow-outline active:bg-gray-100 active:text-primary-500 transition ease-in-out duration-150 -ml-px rounded-r-md"
            >
            <x-icon icon="angle-right" />
        </button>
    </nav>
</template>

<script>
export default {
    name: "Pagination",
    props: {
        paginator: {
            type: Object,
            requred: true,
        }
    }
}
</script>