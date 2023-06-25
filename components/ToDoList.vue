<template>
    <div class="p-6">
        <div>
            <div class="flex justify-between">
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

            <div>
                <p>filters</p>
            </div>
        </div>        
    </div>


    <div class="grid grid-cols-2 gap-4 p-6">
      <div
        v-for="item in filteredTodos"
        :key="item.id"
        class="border p-6 rounded-md max-w-lg flex flex-col justify-between"
      >
        <div>
          <h2 class="text-lg font-bold mb-2">{{ item.title }}</h2>


            <div>
                <!-- <div class="flex mb-2" v-for="category in item.category" :key="category"> -->
                <div class="flex mb-2 items-center gap-2">
                <!-- <div class="flex items-center"> -->
                    <div v-if="item.priority" class="text-red-500 font-bold text-xs border rounded p-1">High Priority</div>
                    <p class="mr-2 text-xs flex border rounded p-1">{{ item.category[0] }}</p>
                <!-- </div> -->
                </div>
            </div>
          <!-- <div class="flex mb-2" v-for="category in item.category" :key="category">
            <div class="flex">
                <p class="mr-2 flex text-sm">{{ category }}</p>
            </div> -->
            <!-- <p class="mr-2">for loop</p> -->
          <!-- </div> -->
          <p class="text-sm text-gray-700 mb-4 description-lines">
            {{ item.description }}
          </p>
        </div>

        <div class="flex">
            <div class="mark-completed flex items-center px-4 py-1 text-white rounded-md text-center">
          <input
            type="checkbox"
            class="mr-2"
            v-model="item.completed"  
            @change="updateToDo(item)">
          <p class="text-center">Mark as Completed</p>
        </div>
        <button class="delete-button" @click="deleteToDoItem(item)">
          Delete
        </button>
        <!-- <button class="edit-button" @click="editToDoItem(item)">Edit</button> -->
        </div>

        <!-- <div class="edit-icon" @click="editToDoItem(item)">
          <i class="fa fa-pencil"></i>
        </div> -->
      </div>
    </div>

    </div>
</template>

<script setup>

const options = ref(['All', 'Completed', 'In progress', 'Archive']);
const selectedOption = ref('All');
// const todo_list = ref([]);

function selectOption(option) {
  selectedOption.value = option;
}


// const {todos} = defineProps(['todos'])


// console.log(todos);

// const filteredTodos = computed(() => {
//   if (selectedOption.value === 'Completed') {
//     return todos.filter((item) => item.completed);
//   } else if (selectedOption.value === 'In progress') {
//     return todos.filter((item) => !item.completed);
//   } else if (selectedOption.value === 'All') {
//     return todos;
//   } else {
//     // Handle the 'Archive' option if needed
//     return [];
//   }
// });

const props = defineProps(['todos']);
const filteredTodos = computed(() => {
  if (selectedOption.value === 'Completed') {
    return props.todos.filter((item) => item.completed);
  } else if (selectedOption.value === 'In progress') {
    return props.todos.filter((item) => !item.completed);
  } else if (selectedOption.value === 'All') {
    return props.todos;
  } else {
    // Handle the 'Archive' option if needed
    return [];
  }
});


console.log(filteredTodos.value)


function updateToDo(item) {
    
//   console.log(todos[index].completed, item)
}

function deleteToDoItem(item) {
  const index = filteredTodos.value.indexOf(item);
  if (index > -1) {
    filteredTodos.value.splice(index, 1);
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
  color: #183440;
}

.mark-completed {
    border: 1px solid rgba(24, 52, 64, 0.6);
    color: rgba(24, 52, 64, 0.6);
    font-size: 1rem;

}

.description-lines {
  max-height: 5em;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
}

.edit-icon {
  position: absolute;
  top: 8px;
  right: 8px;
  color: #183440;
  cursor: pointer;
}

.edit-icon i {
  font-size: 1.2rem;
}
.delete-button {
  background-color: #183440;
  color: #FFFFFF;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  cursor: pointer;
}


</style>