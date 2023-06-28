<template>
    <div class="p-4">
      

      <div>
          <h1 class="text-2xl font-bold mt-4 ml-4">Hey there, Welcome</h1>
          <p class="ml-4 text-gray-500 text-sm">Let's get our day organised by creating a task</p>
      </div>
      <div class="flex flex-col justify-center items-center create-new">
          <img src="../assets/images/bro.png" alt="">
          
          <div class="flex flex-col">
              <p>Create a new task on TO-DO</p>
              <button class="p-6 bg-gray-600 flex gap-2 justify-center my-2 text-white" @click="showModal = true">Create Task</button>
          </div>
      </div>

      <AddTask :showModal="showModal" @close="showModal = false" />

    <!-- <div v-if="showModal" class="fixed inset-0 flex flex-col items-center justify-center z-50">
      <div class="form-container w-96 h-120 bg-white rounded-lg shadow-lg p-4">

        <div class="flex justify-between items-center px-4 py-2">
            <h2 class="text-lg font-bold ">Create Task</h2>
            <span class="chip-remove text-3xl pointer" @click="closeModal()">&times;</span>
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
                <div v-for="(chip, index) in categories" :key="index" class="chip">
                  {{ chip }}
                  <span class="chip-remove" @click="removeCategory(index)">&times;</span>
                </div>
              </div>
              <input type="text" v-model="newCategory" @keydown.enter="addCategory" @keydown.enter.prevent class="chip-input flex" placeholder="Add a category">
            </div>
          </div>

          <div class="flex gap-4 items-center">
            <label for="switch">Set Priority:</label>
            <div class="switch">
              <input type="checkbox" id="switch" v-model="priorityToggle" @click="togglePriority">
              <label for="switch" class="slider"></label>
            </div>
          </div>

          <div class="flex justify-center mt-2">
            <button class="w-full px-4 py-2 text-white bg-blue-500 rounded" type="submit">Create</button>
          </div>


        </form>

        

      </div>
    </div> -->

  </div>
</template>

<script setup>
const showModal = ref(false);

// let newTodoText = ref('');
// let description = ref('');
// let category = ref('Personal');
// let priorityToggle = ref(false);
// let priority = computed(() => priorityToggle.value ? true : false);
// let date = ref('');
// let color = ref('#ffffff');
// const showModal = ref(false);



// let categories = ref(['Personal', 'Work', 'Study']);
// let newCategory = ref('');

// const user = useSupabaseUser();
// const client = useSupabaseClient();
// const router = useRouter();

// function addCategory() {
//   if (newCategory.value.trim() !== '') {
//     categories.value.push(newCategory.value.trim());
//     newCategory.value = '';
//   }
// }

// function removeCategory(index) {
//   categories.value.splice(index, 1);
// }

// function togglePriority() {
//   priorityToggle.value = !priorityToggle.value;
// }

// async function addTodo() {
//   // Check if the user is signed in
//   if (user) {
//     // Log the form data
//     const formData = {
//       title: newTodoText.value,
//       description: description.value,
//       category: categories.value,
//       priority: priority.value,
//       reminder: new Date(date.value).toISOString(),
//       user_id: user.value.id, // Add the user's ID to the form data
//     };

//     console.log('New Task:', formData);

//     // Reset the form inputs
//     newTodoText.value = '';
//     description.value = '';
//     priorityToggle.value = false;
//     date.value = '';
//     color.value = '#ffffff';

//     // Close the form
//     showModal.value = false;

//     try {
//       const { data, error } = await client
//         .from('todos')
//         .insert([formData]);

//       if (error) {
//         console.error('Error creating task:', error);
//       } else {
//         closeModal()
//         router.push('/tasks')
//         console.log('Task created successfully');
//       }
//     } catch (error) {
//       console.error('Error creating task:', error);
//     }
    
//   }
//   else {
//     // Handle the case when the user is not signed in
//     console.log('User is not signed in');
//     // You can show an error message or redirect the user to the sign-in page
//   }
// }


// // async function deleteTodo() {
// //   try {
// //     const { data, error } = await supabase
// //       .from('todo_list')
// //       .delete()
// //       .match({ title: newTodoText.value });

// //     if (error) {
// //       console.error('Error deleting task:', error);
// //     } else {
// //       console.log('Task deleted successfully');
// //     }
// //   } catch (error) {
// //     console.error('Error deleting task:', error);
// //   }
// // }

// const minDateTime = computed(() => {
//   const currentDate = new Date().toISOString().slice(0, 16); // Get current date and time in YYYY-MM-DDTHH:mm format
//   return currentDate;
// });

// function openForm() {
//     showModal.value = true;
// }

// function closeForm() {
//   // Clear the form inputs and close the form
//   newTodoText.value = '';
//   description.value = '';
//   category.value = 'Personal';
//   priorityToggle.value = false;
//   date.value = '';
//   color.value = '#ffffff';
//   showModal.value = false;
// }

// function closeModal() {
//   showModal.value = false;
// }

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
    background-color: #5e72e4;
  }
  
  input[type="checkbox"]:checked + .slider:before {
    transform: translateX(24px);
  }

  .chips-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px;
}

.chips-list {
  display: flex;
  flex-wrap: wrap;
}

.chip {
  display: flex;
  align-items: center;
  background-color: #eee;
  border-radius: 16px;
  padding: 4px 8px;
  margin: 2px;
}

.chip-remove {
  cursor: pointer;
  color: #999;
  font-size: 12px;
  margin-left: 4px;
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
}

.create-new {
  margin-top: 7rem;
}

</style>