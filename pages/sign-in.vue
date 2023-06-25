<template>
  <div class="container">
    <form v-if="!switchToLogin" @submit.prevent="signUp">
      <h1 class="text-2xl font-bold mb-4">Create New Account</h1>
      <div class="mb-4">
        <label for="email" class="block font-bold">Email:</label>
        <input type="email" id="email" v-model="email" class="w-full p-2 border border-gray-300 rounded" required>
      </div>
      <div class="mb-4">
        <label for="password" class="block font-bold">Password:</label>
        <input type="password" id="password" v-model="password" class="w-full p-2 border border-gray-300 rounded" required>
      </div>
      <div class="mb-4">
        <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Sign Up</button>
      </div>
    </form>
    <form v-else @submit.prevent="signIn">
      <h1 class="text-2xl font-bold mb-4">Sign in to your acoount</h1>
      <div class="mb-4">
        <label for="loginEmail" class="block font-bold">Email:</label>
        <input type="email" id="loginEmail" v-model="loginEmail" class="w-full p-2 border border-gray-300 rounded" required>
      </div>
      <div class="mb-4">
        <label for="loginPassword" class="block font-bold">Password:</label>
        <input type="password" id="loginPassword" v-model="loginPassword" class="w-full p-2 border border-gray-300 rounded" required>
      </div>
      <div class="mb-4">
        <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Sign In</button>
      </div>
    </form>
    <div v-if="errorMessage" class="text-red-500">{{ errorMessage }}</div>
    <div v-if="successMessage" class="text-green-500">{{ successMessage }}</div>
    <div class="mt-4">
      <span v-if="!switchToLogin">Already have an account?</span>
      <button class="text-blue-500 hover:underline" @click="switchToLogin = !switchToLogin">
        {{ switchToLogin ? 'Create New Account' : 'Sign In' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const email = ref('');
const password = ref('');
const loginEmail = ref('');
const loginPassword = ref('');
const errorMessage = ref('');
const switchToLogin = ref(true);

const client = useSupabaseAuthClient();
const router = useRouter();
const successMessage = ref(null);


async function signUp(){
  if (email.value && password.value){
    try {
      const {data, error} = await client.auth.signUp({
          email: email.value,
          password: password.value
      });
      // check errors
      if (error) throw error;
      // will be caught in the try catch block
      successMessage.value = "Check your email to confirm your account"
      switchToLogin.value = true;
    } catch (error) {
        errorMessage.value = error.message;
    }
  } else {
    errorMessage.value = "Please enter an email and password"
  }
}

async function signIn() {
    if(loginEmail.value && loginPassword.value) {
        try {
            const { error } = await client.auth.signInWithPassword({
                email: loginEmail.value,
                password: loginPassword.value
            });
            // check errors
            if (error) throw error;
            // will be caught in the try catch block
            errorMessage.value = '';
            successMessage.value = "Signed in successfully"

            router.push('/tasks')
        } catch (error) {
            errorMessage.value = error.message;
        }
    } else {
        errorMessage.value = "Please enter an email and password"
    }
}

</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: start; */
  max-width: 400px;
  margin: 0 auto;
  padding: 40px;
  border: 1px solid #ccc;
  border-radius: 8px;
}
/* 183440 */
</style>
