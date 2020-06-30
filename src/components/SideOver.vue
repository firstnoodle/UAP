<template>
    <transition
        enter-active-class="transform transition ease-in-out duration-300 sm:duration-700"
        enter-class="translate-x-full"
        enter-to-class="translate-x-0"
        leave-active-class="transform transition ease-in-out duration-500 sm:duration-700"
        leave-class="translate-x-0"
        leave-to-class="translate-x-full"
    >
        <aside v-if="show" class="absolute inset-y-0 right-0 pl-10 max-w-full flex">
            <div class="w-screen max-w-md">
                <div class="h-full divide-y divide-gray-200 flex flex-col bg-white shadow-xl">
                    <!-- Header -->
                    <header class="flex-shrink-0 px-4 py-4 space-x-4 flex justify-start">
                        <div class="w-full flex items-center justify-between">
                            <slot name="header" />
                        </div>
                    </header>

                    <!-- content -->
                    <div class="h-0 flex-1 py-6 space-y-6 overflow-y-scroll">
                        <div class="relative flex-1 px-4 sm:px-6">
                            <slot name="content" />
                        </div>
                    </div>

                    <!-- Footer -->
                    <footer class="flex-shrink-0 px-4 py-4 space-x-4 flex justify-end">
                        <slot name="footer" />
                    </footer>
                </div>
            </div>
        </aside>
    </transition>
</template>

<script>
export default {
    name: "SideOver",
    props: {
        show: {
            type: Boolean,
            default: false
        }
    }
};
</script>