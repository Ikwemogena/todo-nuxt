<template>
    <div class="p-6">

      <div class="flex justify-between items-center">
          <div>
              <h1 class="text-2xl font-bold">Welcome, {{user.email}}</h1>
              <p class="text-gray-500 text-sm">Let's get your day organised by creating a task</p>
          </div>
          <div class="md:flex gap-4 items-center">
              <div class="new-task rounded px-3 py-1 text-m flex gap-1 items-center " @click="showModal = true">
                <img src="../assets/icons/add-vector.svg" alt="">
                <button class=""> New Task</button>
                
              </div>
              <p class="border rounded px-3 py-1">June</p>
          </div>
      </div>
      <div>
          <div class="flex justify-between mt-4">
              <div class="segmented-buttons">
              <button
              v-for="(option, index) in options"
              :key="index"
              :class="['segmented-button', { active: selectedOption === option }, 'pr-8']"
              @click="selectOption(option)"
              >
              {{ option }}
              </button>
          </div>

          <div class="flex items-center gap-2 mb-4 text-gray-500">
              <p>Filters</p>
              <img src="../assets/icons/sort.svg" alt="">
          </div>
      </div>        
    </div>

    <LoadingSign v-if="isLoading" />

    <div class="md:grid grid-cols-2 gap-4 sm: mb-2" v-if="filteredTodoList.length > 0">
        <div v-for="item in filteredTodoList" :key="item.id" class="group filter border p-6 rounded-md max-w-lg flex flex-col justify-between">
            <div class="flex justify-between items-start">
              <div>
                <h2 class="text-lg font-bold mb-2">{{ item.title }}</h2>
                <div class="flex mb-2">
                  <div v-if="item.priority" class="text-red-500 font-bold text-xs border rounded text-center mr-2  p-1">High Priority</div>
                  <p class="text-sm border rounded p-1">{{ item.category }}</p>
                </div>
                <p class="text-sm text-gray-500 text-gray-700 mb-4 description-lines">
                {{ item.description }}
                </p>
              </div>
              <div >
                <button class="opacity-0 group-hover:opacity-100 transition-opacity" @click="editTodo(item)"><img src="../assets/icons/edit-button.svg" alt="" class="w-4"></button>
              </div>
            </div>


              <div class="flex justify-center items-center gap-2">
                <div class="mark-completed flex justify-center items-center px-4 py-1 text-white rounded-md text-center w-full" :class="{ completed: item.completed }">
                  <input type="checkbox" class="mr-2" v-model="item.completed" @change="updateToDo(item)">
                  <p class="text-center">{{ item.completed ? 'Completed' : 'Mark as Completed' }}</p>
                
                </div>
                <div>
                  <img src="../assets/icons/trash.svg" alt="delete task" @click="deleteToDo(item)" class="hover:cursor-pointer">
                </div>
              </div>
        </div>
    </div>
    <div class="flex justify-center items-center" v-else>
        <h1>No {{ selectedOption }} tasks yet.</h1>
    </div>
    <AddTask :showModal="showModal" @close="showModal = false" />

    <!-- <EditToDoModal
    v-if="showEditModal"
    :todo="selectedTodo"
    @update="updateTodo"
    @cancel="cancelEdit"/> -->
    <!-- <ToDoList :selectedOption="selectedOption" /> -->

  </div>
</template>

<script setup>

definePageMeta({
  middleware: 'auth'
})

const showModal = ref(false);

const user = useSupabaseUser();
const options = ref(['All', 'Completed', 'In progress', 'Archive']);
const selectedOption = ref('All');

function selectOption(option) {
selectedOption.value = option;
}


const client = useSupabaseClient();

const isLoading = ref(true);

const todo_list = ref([]);

async function fetchTodos() {
try {
  const { data, error } = await client
    .from('todos')
    .select('*')
    .eq('user_id', user.value.id);

  if (error) {
    console.error('Error fetching tasks:', error);
  } else {
    todo_list.value = data;
  }
} catch (error) {
  console.error('Error fetching tasks:', error);
}
finally {
  isLoading.value = false;
}
}

const filteredTodoList = computed(() => {
if (selectedOption.value === 'Completed') {
  return todo_list.value.filter((item) => item.completed)
} else if (selectedOption.value === 'In progress') {
  return todo_list.value.filter((item) => !item.completed);
} else {
  return todo_list.value;
}
});

fetchTodos();

async function updateToDo(item) {
try {
  const { data, error } = await client
    .from('todos')
    .update({ completed: item.completed })
    .match({ id: item.id });

  if (error) {
    console.error('Error updating task:', error);
  } else {
    console.log('Task updated successfully');
  }
} catch (error) {
  console.error('Error updating task:', error);
}
}

const showEditModal = ref(false);
const selectedTodo = ref(null);

async function editTodo(item) {
selectedTodo.value = item;
showEditModal.value = true;
console.log('Edit button clicked', item)
}

function updateTodo(updatedTodo) {
// Update the todo item in the todo_list
const index = todo_list.value.findIndex((todo) => todo.id === updatedTodo.id);
if (index !== -1) {
  todo_list.value[index] = updatedTodo;
}
// Hide the modal
showEditModal.value = false;
}

function cancelEdit() {
// Hide the modal
showEditModal.value = false;
}

async function deleteToDo(item){
try {
  const { data, error } = await client
    .from('todos')
    .delete()
    .match({ id: item.id });

  if (error) {
    console.error('Error deleting task:', error);
  } else {
    todo_list.value = todo_list.value.filter((todo) => todo.id !== item.id);
    console.log('Task Deleted successfully');
  }
} catch (error) {
  console.error('Error updating task:', error);
}
}



</script>

<style scoped>
.segmented-buttons {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  border: 1px solid #183440;
  border-radius: 1rem;
}

.segmented-buttons::before,
.segmented-buttons::after {
  content: '';
  flex: 1;
  height: 1px;
  background-color: #183440;
  margin: auto;
}


.segmented-button {
  /* border: 1px solid red; */
  /* border-radius: 1rem; */
  /* background-color: #e1e1e1; */
  color: #183440;
  padding: 10px 30px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.segmented-button.active {
    background-color: rgba(24, 52, 64, 0.1);
  /* background-color: #FFFFFF; */
  background-color: none;
  color: #183440;
  font-size: 15px;
  font-weight: 500;
}

.mark-completed {
    border: 1px solid rgba(24, 52, 64, 0.6);
    color: rgba(24, 52, 64, 0.6);
    font-size: 1rem;

}
.mark-completed.completed {
  background-color: #183440;
  color: #FFFFFF;
}

.description-lines {
  max-height: 5em;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
}

.filter {
  background-color: #FFFFFF;
}

.new-task {
  background-color: #183440;
  color: #FFFFFF;
}

</style>
