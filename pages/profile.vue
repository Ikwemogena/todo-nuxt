<!-- <template>
    <div>
        <h1>{{ user.email }}</h1>
        <button type="submit" @click.prevent="logout">Sign out</button>

    </div>
</template>

<script setup>

definePageMeta({
  middleware: 'auth'
})

const user = useSupabaseUser();
const client = useSupabaseAuthClient();
const router = useRouter();

console.log(user.value)

async function logout(){
    try {
        const { error } = await client.auth.signOut(); 
        if (error) throw error;
        router.push('/login');        
    } catch (error) {
        
    }

}
</script>

<style lang="scss" scoped>

</style> -->

<template>
    <div class="container">
      <h1 class="text-2xl font-bold mb-4">Profile</h1>
      <div class="user-info">
        <div class="user-avatar">
          <!-- Display user avatar here -->
          <!-- <img :src="user.avatar" :alt="user.email" class="w-24 h-24 rounded-full"> -->
        </div>
        <div class="user-details">
          <h2 class="text-xl font-bold">{{ user.email }}</h2>
          <!-- Display additional user details here -->
        </div>
      </div>
      <button class="logout-btn" @click.prevent="logout">Sign out</button>
    </div>
  </template>
  
  <script setup>
//   import { definePageMeta, useSupabaseUser, useSupabaseAuthClient, useRouter } from 'vue-supabase';
  
  definePageMeta({
    middleware: 'auth'
  });
  
  const user = useSupabaseUser();
  const client = useSupabaseAuthClient();
  const router = useRouter();
  
  async function logout() {
    try {
      const { error } = await client.auth.signOut();
      if (error) throw error;
      router.push('/sign-in');
    } catch (error) {
      console.error(error);
    }
  }
  </script>
  
  <style scoped>
  .container {
    max-width: 400px;
    margin: 0 auto;
    padding: 40px;
  }
  
  .user-info {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .user-avatar {
    margin-right: 20px;
  }
  
  .user-details {
    display: flex;
    flex-direction: column;
  }
  
  .logout-btn {
    background-color: #f44336;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
  }
  </style>
  