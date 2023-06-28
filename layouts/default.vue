<template>
    <div>
        <!-- <Preloader /> -->
        <div class="flex h-screen ">            
            <aside class="w-1/5 flex flex-col justify-between py-4 p-6 pt-8">
                <div>
                    <h1 class="text-xl font-bold pl-0 m-0 mb-3">TO-DO</h1>
                 <!-- Menu content goes here  -->
                    <ul class="text-xl mr-6">
                        <NuxtLink to="/" class="mb-4 flex items-center">Home</NuxtLink>
                        <NuxtLink to="/tasks" class="mb-4 flex items-center mt-2">Tasks</NuxtLink>
                        <NuxtLink to="" class="mb-4 flex items-center mt-2">Archive</NuxtLink>
                        <NuxtLink class="mb-4 flex items-center mt-2">Reminders</NuxtLink>
                    </ul>
                </div>
                <!-- Profile section  -->
                <div class="mr-6">
                    <div class="p-2 border rounded add-button mb-2" @click="showModal = true">
                        <div class="flex gap-2 justify-center text-center p-2">
                            <img src="../assets/icons/add-circle.svg" alt="" srcset="">
                            <button class="text-white">Add New Task</button>
                        </div>
                    </div>
                    <div class="p-2 flex items-center border rounded" v-if="user">
                    <!-- <div class="p-2 flex items-center border rounded"> -->
                        <img class="w-12 h-12 rounded-full" src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?cs=srgb&dl=pexels-mohamed-abdelghaffar-771742.jpg&fm=jpg" alt="Profile Image">
                        <NuxtLink to="/profile" >
                            <div class="ml-3">
                            <p class="text-gray-500">{{ user.email }}</p>
                            </div>
                            
                        </NuxtLink>
                    </div>
                        <div class="text-black-700 font-bold border py-3 text-center" v-else>
                            <NuxtLink to="/sign-in">Sign In</NuxtLink>
                        </div>
                </div>
                
            </aside>
            <main class="flex-1 main">
               <!-- Main content goes here -->
                <AddTask :showModal="showModal" @close="showModal = false" />
                <slot />
            </main>
        </div>


    </div>
</template>
<script setup>
const user = useSupabaseUser();
console.log(user.value)

const showModal = ref(false);
console.log(showModal.value,'default layout')

</script>

<style scoped>
.router-link-exact-active {
    background-color: #183440;
    color: #FFFFFF;
    border-radius: 12px;
    padding: 8px 0px 8px 12px;
    display: flex;
    gap: 10px;
    transition: 0.1s ease;
}

.main {
    background-color: #fafafa;
}

.add-button {
    background-color: #183440;
}

</style>
