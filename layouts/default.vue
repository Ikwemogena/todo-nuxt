<template>
    <div>
        <Preloader />
        <div class="flex h-screen">            
            <aside class="w-1/5 flex flex-col justify-between py-4">
                <div>
                    <h1 class="text-xl font-bold p-4 m-0">TO-DO</h1>
                 <!-- Menu content goes here  -->
                <ul class="p-4 text-xl w-28">
                    <NuxtLink to="/" class="mb-4 flex items-center">Home</NuxtLink>
                    <NuxtLink to="/tasks" class="mb-4 flex items-center mt-2">Tasks</NuxtLink>
                    <NuxtLink to="" class="mb-4 flex items-center mt-2">Archive</NuxtLink>
                    <NuxtLink class="mb-4 flex items-center mt-2">Reminders</NuxtLink>
                </ul>
                </div>
                 <!-- Profile section  -->
                <div>
        </div>
                <div class="p-4 flex items-center" v-if="user">
                    <img class="w-12 h-12 rounded-full" src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?cs=srgb&dl=pexels-mohamed-abdelghaffar-771742.jpg&fm=jpg" alt="Profile Image">
                    <NuxtLink to="/profile" >
                        <div class="ml-3">
                        <!-- <h4 class="text-lg font-semibold">{{ user.email }}</h4> -->
                        <p class="text-gray-500">{{ user.email }}</p>
                    </div>
                        
                    </NuxtLink>
                    <!-- <div class="ml-3">
                        <h4 class="text-lg font-semibold">John Doe</h4>
                        <p class="text-gray-500">john.doe@example.com</p>
                    </div> -->
                    <!-- <img src="../assets/icons/more-icon.svg" alt=""> -->
                </div>
                <div class="p-4 flex" v-else>
                    <div class="bg-black text-teal-700 flex justify-center items-center p-5">
                        <NuxtLink to="/sign-in">Sign In</NuxtLink>
                    </div>
                </div>
            </aside>
            <main class="flex-1">
               <!-- Main content goes here -->
                <!-- <h1 class="text-2xl font-bold mt-4 ml-4">Main Content</h1>
                <p class="ml-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> -->
                <slot />
            </main>
        </div>


    </div>
</template>
<script setup>
const user = useSupabaseUser();
// import supabase from '~/server/api/supabase.js';

// const user = ref(null);

// onMounted(() => {
//   // Wait for the client to initialize before accessing $supabase
//   supabase.auth.onAuthStateChange((event, session) => {
//     if (event === 'SIGNED_IN') {
//       user.value = session.user;
//     } else {
//       user.value = null;
//     }
//   });

//   // Check initial authentication state
//   const session = supabase.auth.session;
//   if (session) {
//     user.value = session.user;
//   }
// });
</script>

<style scoped>
.router-link-exact-active {
    background-color: #183440;
    color: #FFFFFF;
    border-radius: 12px;
    width: 160px;
    padding: 8px 0px 8px 12px;
    display: flex;
    gap: 10px;
}

</style>
