<template>
    <div class="fixed inset-0 flex flex-col items-center justify-center z-50">
      <div class="form-container w-96 h-120 bg-white rounded-lg shadow-lg p-4">

        <div class="flex justify-between items-center px-4 py-2">
            <h2 class="text-lg font-bold ">Update Your Task</h2>
            <span class="chip-remove text-3xl pointer" @click="cancelEdit">&times;</span>
        </div>

        <form class="px-4 py-2">
          <div>
            <label for="">Title</label>
            <input type="text" v-model="editedTodo.title" class="w-full mb-2 px-2 py-1 border rounded" placeholder="Enter Task Title" required>
          </div>
          <div>
            <label for="">Description</label>
            <input type="text" v-model="editedTodo.description"  class="w-full mb-2 px-2 py-1 border rounded" placeholder="Enter Task Description">
          </div>          

          <div>
            <label for="Reminder">Reminder</label>
            
            <input type="datetime-local" v-model="editedTodo.reminder" class="w-full mb-2 px-2 py-1 border rounded" :min="minDateTime" required>
          </div>

          <div class="flex items-center mb-4">
            <label class="mr-2"> Set Color:</label>
            <input type="color" class="mr-1">
            <div class="w-6 h-6 rounded-full" :style="{ backgroundColor: color }"></div>
          </div>


          <div class="flex gap-4 items-center">
            <label for="switch">Set Priority:</label>
            <div class="switch">
              <input type="checkbox" id="switch">
              <label for="switch" class="slider"></label>
            </div>
          </div>

          <div class="flex justify-center mt-2">
            <button class="w-full px-4 py-2 text-white bg-blue-500 rounded" type="submit" @click="cancelEdit">Update Task</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
<script setup>

const props = defineProps({
todo: {
    type: Object,
    required: true,
},
});

const editedTodo = ref({ ...props.todo });
console.log(editedTodo.value)

// const updateTodo = () => {
// emit('update', editedTodo.value);
// };

const cancelEdit = () => {
emit('cancel');
};
</script>
  
<style scoped>
/* Add the modal styles here */
</style>
  