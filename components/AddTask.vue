<template>
    <div>
        <div v-if="props.showModal" class="overlay" @click="closeModal()"></div>
        <div v-if="props.showModal" class="fixed inset-0 flex flex-col items-center justify-center z-50">
            
            <div class="form-container w-1/2 h-120 bg-white rounded-lg shadow-lg p-4" v-if="user">
                

                <div class="flex justify-between items-center px-4 py-2">
                    <h2 class="text-lg font-bold ">Create Task</h2>
                    <span class="chip-remove close text-xl pointer" @click="closeModal()">&times;</span>
                </div>

                <form @submit.prevent="addTodo" class="px-4 py-2">
                    <div>
                        <label for="">Title</label>
                        <input type="text" v-model="newTodoText" class="w-full mb-2 px-2 py-1 border rounded" placeholder="Enter Task Title" required>
                    </div>
                    <div>
                        <label for="">Description</label>
                        <input type="text" v-model="description" class="w-full mb-2 px-2 py-1 border rounded" placeholder="Enter Task Description">
                    </div>          

                    <div>
                        <label for="Reminder">Reminder</label>
                        
                        <input type="datetime-local" v-model="date" class="w-full mb-2 px-2 py-1 border rounded" :min="minDateTime" required>
                    </div>


                    <div class="flex items-center mb-4">
                        <label class="mr-2"> Set Color:</label>
                        <input type="color" v-model="color" class="mr-1">
                        <div class="w-6 h-6 rounded-full" :style="{ backgroundColor: color }"></div>
                    </div>

                    <div>
                        <label for="category">Category</label>
                        <div class="chips-container">
                            <div class="chips-list">
                                <div v-for="(chip, index) in categories" :key="index" :class="['chip', { 'chip-selected': chip.isSelected }]" class="chip text-sm text-gray-500 border rounded hover:cursor-pointer" @click="selectCategory(chip)">
                                {{ chip.name }}
                                <!-- <span class="chip-remove" @click="removeCategory(index)">&times;</span> -->
                                </div>
                            </div>
                            <!-- <input type="text" v-model="newCategory" @keydown.enter="addCategory" @keydown.enter.prevent class="chip-input flex" placeholder="Add a category"> -->
                        </div>
                    </div>


                    <div class="flex gap-4 items-center py-5">
                        <label for="switch">Set Priority:</label>
                        <div class="switch">
                        <input type="checkbox" id="switch" v-model="priorityToggle" @click="togglePriority">
                        <label for="switch" class="slider"></label>
                        </div>
                    </div>

                    <div class="flex justify-center mt-2">
                        <button class="create-button w-full px-4 py-2 text-white bg-blue-500 rounded" type="submit">Create</button>
                    </div>
                    <!-- <div v-else>
                        <NuxtLink to="/sign-in" class="create-button w-full px-4 py-2 text-white bg-blue-500 rounded" type="submit" @click="closeModal()">Sign in to create</NuxtLink>
                    </div> -->


                </form>
            </div>
            <div v-else>
                <NuxtLink to="/sign-in" class="create-button w-full px-4 py-2 text-white bg-blue-500 rounded" type="submit" >Sign in to Create a Task</NuxtLink>

            </div>
        </div>

    </div>
</template>

<script setup>

definePageMeta({
  middleware: 'auth'
})

const props = defineProps({
showModal: {
    type: Boolean,
    required: true,
},
});


console.log(props.showModal, 'add task modal')


let newTodoText = ref('');
let description = ref('');
let category = ref('Personal');
let selectedCategory = ref('');
let priorityToggle = ref(false);
let priority = computed(() => priorityToggle.value ? true : false);
let date = ref('');
let color = ref('#ffffff');
// const showModal = ref(false);

function selectCategory(chip) {
    categories.value.forEach((c) => {
        c.isSelected = false;
    });

    chip.isSelected = true;
    selectedCategory.value = chip.name;

    console.log(chip.name);
}

let categories = ref([
  { name: 'Personal', isSelected: false },
  { name: 'Work', isSelected: false },
  { name: 'Study', isSelected: false },
  { name: 'Family', isSelected: false },
  { name: 'Friends', isSelected: false },
  { name: 'Chores', isSelected: false },
  { name: 'Grocery', isSelected: false },
  { name: 'Health', isSelected: false },
  { name: 'Recreation', isSelected: false },
  { name: 'Other', isSelected: false },

]);

const user = useSupabaseUser();
const client = useSupabaseClient();
const router = useRouter();

function togglePriority() {
  priorityToggle.value = !priorityToggle.value;
}

async function addTodo() {
  // Check if the user is signed in
  if (user) {
    // Log the form data
    const formData = {
      title: newTodoText.value,
      description: description.value,
      category: selectedCategory.value,
      priority: priority.value,
      reminder: new Date(date.value).toISOString(),
      user_id: user.value.id, // Add the user's ID to the form data
    };

    console.log('New Task:', formData);

    // Reset the form inputs
    newTodoText.value = '';
    description.value = '';
    priorityToggle.value = false;
    selectedCategory.value = '';
    date.value = '';
    color.value = '#ffffff';

    // Close the form
    closeModal();
    router.go(0)

    try {
      const { data, error } = await client
        .from('todos')
        .insert([formData]);

      if (error) {
        console.error('Error creating task:', error);
      } else {
        showModal.value = false
        router.push('/tasks')
        console.log('Task created successfully');
      }
    } catch (error) {
      console.error('Error creating task:', error);
    }
    
  }
  else {
    // Handle the case when the user is not signed in
    console.log('User is not signed in');
    // You can show an error message or redirect the user to the sign-in page
  }
}

const minDateTime = computed(() => {
  const currentDate = new Date().toISOString().slice(0, 16); // Get current date and time in YYYY-MM-DDTHH:mm format
  return currentDate;
});

function openForm() {
    showModal.value = true;
}

const emits = defineEmits(['close']);
function closeModal() {
    emits('close');
    // Clear the form inputs and close the form
    newTodoText.value = '';
    description.value = '';
    category.value = 'Personal';
    priorityToggle.value = false;
    date.value = '';
    color.value = '#ffffff';
}
</script>

<style scoped>
.switch {
    position: relative;
    display: inline-block;
    width: 48px;
    height: 24px;
  }
  
  .switch input[type="checkbox"] {
    display: none;
  }
  
  .slider {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    cursor: pointer;
    border-radius: 24px;
    background-color: #ccc;
    transition: background-color 0.3s;
  }
  
  .slider:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    border-radius: 50%;
    transition: transform 0.3s;
  }
  
  input[type="checkbox"]:checked + .slider {
    background-color: #183440;
  }
  
  input[type="checkbox"]:checked + .slider:before {
    transform: translateX(24px);
  }

  .chips-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  /* border: 1px solid #ccc; */
  border-radius: 4px;
  /* padding: 4px; */
}

.chips-list {
  display: flex;
  flex-wrap: wrap;
}

.chip {
  display: flex;
  align-items: center;
  /* background-color: #eee; */
  /* border-radius: 16px; */
  padding: 4px 8px;
  margin: 2px;
}

.chip-remove {
  cursor: pointer;
  color: #999;
  font-size: 1rem;
  margin-left: 4px;
}

.close{
    font-size: 2rem;
}

.chip-input {
  flex-grow: 1;
  border: none;
  outline: none;
  font-size: 14px;
  padding: 4px;
}

.overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5); /* Translucent background color */
  z-index: 50;
  backdrop-filter: blur(2px);
}

.create-new {
  margin-top: 7rem;
}

.create-button {
    background-color: #183440;
}

.chip-selected {
  border:1px solid #183440;
  color: #183440;
  background-color: rgba(24, 52, 64, 10%);
  font-weight: 500;
}

</style>