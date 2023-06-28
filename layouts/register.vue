<template>
    <div>
        <!-- <div>
            <header class="shadow-sm bg-white">
                <nav class="container mx-auto p-4">
                    <nuxt-link to="/" class="font-bold">TO-DO</nuxt-link>
                    
                </nav>
            </header>

            page content
            <div class="container mx-auto p-4">
                <slot />
            </div>

            <footer class="container mx-auto p-4 flex justify-between border-t-2">
                <ul class="flex gap-4">
                    <li><nuxt-link to="/">Home</nuxt-link></li>
                </ul>
            </footer>
        </div> -->

        <div class="flex justify-between items-center">
            <div class="w-1/2">
                <slot />
            </div>

            <div class="w-1/2">
                <img src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80" alt="" class="h-screen">
                <!-- <h1>kjobuiey</h1> -->
            </div>
        </div>
    </div>
</template>

<style scoped>
.router-link-exact-active {
    color: #12b488;
}
</style>