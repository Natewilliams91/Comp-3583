<template>

  <main class="taskTracker"> 
  
  <section class="welcome">
  
    <h2 class="title">
      
      Hello, Welcome to your Task Tracker, <input type="text" id="name" placeholder="Your Name" v-model="userName"> 
  
    </h2>
  
  </section>
  
  <section class="createTask">
  
    <h3>Create a new task:</h3>
  
    <br> 
  
    <form id="taskForm" @submit.prevent="addTask">
      
      <input
        type="text"
  
        name="content"
  
        id="content"
  
        placeholder="ex: study for test"
  
        v-model="newTaskContent"
      />
  
      <h4>Select a category for your task:</h4>
  
      <div class="taskOptions">
        <label>
  
          <input
  
            type="radio"
  
            name="category"
  
            id="cat1"
  
            value="work"
  
            v-model="selectedCategory"
          />
          <span class="taskCatIcon work"></span>
  
          <div>Work</div>
  
        </label>
  
        <label>
  
          <input
  
            type="radio"
  
            name="category"
  
            id="cat2"
  
            value="school"
  
            v-model="selectedCategory"
          />
          <span class="taskCatIcon school"></span>
  
          <div>School</div>
  
          </label>
  
        <label>
  
          <input
            type="radio"
  
            name="category"
  
            id="cat3"
  
            value="fitness"
  
            v-model="selectedCategory"
          />
          <span class="taskCatIcon fitness"></span>
  
          <div>Fitness</div>
  
        </label>
  
        <label>
  
        <input
  
          type="radio"
  
          name="category"
  
          id="cat4"
  
          value="other"
  
          v-model="selectedCategory"
        />
        <span class="taskCatIcon other"></span>
  
        <div>Other</div>
  
        </label>
  
      </div>
  
      <input type="submit" value="Add Task" />
  
    </form>
    
  </section>
  
  <section class="task-list">
  <h2>Your current tasks:</h2>
  <div class="list" id="task-list">

    <div v-for="(task, index) in sortedTaskList" :key="task.timeCreated">
      <!-- Display category as a header when it changes or it's the first task -->
      <h4 v-if="index === 0 || task.category !== sortedTaskList[index - 1].category">
        {{ task.category.charAt(0).toUpperCase() + task.category.slice(1) }} <!-- capitalize the first letter -->
      </h4>

      <div :class="`task-item ${task.done && 'done'} ${task.category}`">
        <label>
          <input type="checkbox" v-model="task.done" />
          <span :class="`taskCatIcon ${categoryClassMapping[task.category] || 'default'}`"></span>
        </label>

        <div class="task-content">
          <input type="text" v-model="task.content" />
        </div>

        <div class="actions">
          <button class="delete" @click="removeTask(task)">Delete</button>
        </div>
      </div>
    </div>

  </div>
</section>

  
    </main>
  
  </template>
  
  
  <script setup> //Javascript portion
  
  import {computed} from 'vue'
  import {onMounted} from 'vue'
  import {ref} from 'vue'
  import {watch} from 'vue'
  
  const categoryClassMapping = 
  {
  
    work: 'work',
    fitness: 'fitness',
    school: 'school', 
    other: 'other',   
    
  };
  
  // empty array to store the tasks
  const taskList = ref([])
  
  // variable to store the user's name
  const userName = ref('')
  
  // variable that stores contents of a task
  const newTaskContent = ref('')
  
  //Variable to store the category of the task
  const selectedCategory = ref(null)
  
  const addTask = () => {
    if (newTaskContent.value.trim() === '' || selectedCategory.value === null) {
      return //if statement to ensure an empty task can't be creating without inputting values
    }

  
    taskList.value.push({
  
      content: newTaskContent.value,
      category: selectedCategory.value,
      done: false,
      editable: false,
      timeCreated: new Date().getTime()
  
    })
  }
  
  // Remove a task from the list
  const removeTask = (task) => {
    taskList.value = taskList.value.filter((t) => t !== task)
  }
  
  // sorting the tasks based on when they were created
  const sortedTaskList = computed(() => {
    return taskList.value.slice().sort((a, b) => {
      // Assign numeric values to categories to establish a sorting order
      const categoryOrder = {
        work: 1,
        school: 2,
        fitness: 3,
        other: 4,
      };
  
      const categoryA = categoryOrder[a.category];
      const categoryB = categoryOrder[b.category];
  
      if (categoryA < categoryB) {
        return -1;
      } else if (categoryA > categoryB) {
        return 1;
      } else {
        // If categories are the same, sort by timeCreated
        return a.timeCreated - b.timeCreated;
      }
    });
  });
  
  // Retrieve the user's name and task list from local storage
  onMounted(() => {
  
  userName.value = localStorage.getItem('userName') || ''
  taskList.value = JSON.parse(localStorage.getItem('taskList')) || []
  
  })
  
  // watching for changes in the username and saving the name locally to remember it
  watch(userName, (newVal) => {
    
    localStorage.setItem('userName', newVal)
  
  })
  
  // watching for changes in the task list and saving it to local storage to remember tasks
  watch(taskList, (newVal) => {
  
    localStorage.setItem('taskList', JSON.stringify(newVal))
    
  }, {
  
    deep: true
  
  })
  
  
  </script>
  
  <style> 
  
  body 
  {
  
    background: rgb(241, 241, 241);
    color: rgb(34, 29, 29);
  
  }
  
  * 
  {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'montserrat', sans-serif;
  }
  
  section 
  {
    margin-top: 1cm;
    margin-bottom: 1cm;
    padding-left: 0.75cm;
    padding-right: 0.75cm;
  }
  
  h3 
  {
    color: rgb(34, 29, 29);
    font-size: 1rem;
    font-weight: 400;
    margin-bottom: 0.5rem;
  }
  
  h4 {
  color: rgb(34, 29, 29);
  font-size: 1.125rem;
  font-weight: 700;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  text-transform: capitalize; /* To ensure categories appear with the first letter capitalized */
}

.task-list .task-item {
  margin-top: 0.5rem; /* Add a little space between the category name and the task item */
}
  
  
  input:not([type="radio"]):not([type="checkbox"]), button 
  {
    appearance: none;
    border: none;
    outline: none;
    background: none;
    cursor: initial;
  }
  
  .welcome .title 
  {
    display: flex;
  }
  
  .welcome .title input 
  {
    margin-left: 0.5rem;
    flex: 1 1 0%;
    min-width: 0;
  }
  
  .welcome .title,
  .welcome .title input 
  {
    color: rgb(34, 29, 29);
    font-size: 1.5rem;
    font-weight: 700;
  }
  
  .createTask input[type="text"] 
  {
    display: block;
    width: 100%;
    font-size: 16px;
    padding: 1rem 1.5rem;
    color: rgb(34, 29, 29);
    background-color: #FFF;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    margin-bottom: 1.5rem;
  }
  
  .createTask .taskOptions {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1rem;
    margin-bottom: 1.5rem;
  }
  
  .createTask .taskOptions label {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    background-color: #FFF;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
  
  input[type="radio"]
  {
    display: none;
  }
  
  input[type="checkbox"] 
  {
    display: none;
  }
  
  .taskCatIcon
  {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border: 2px solid rgb(73, 127, 210);
    box-shadow: 0px 0px 3px rgba(73, 127, 210, 0.8);
    border-radius: 50%;
    
  }
  
  .taskCatIcon.school 
  {
    border-color: var(white);
    box-shadow: 0px 0px 3px rgba(194, 72, 72, 0.75);
  }
  
  .taskCatIcon.fitness 
  {
    border-color: var(white);
    box-shadow: 0px 0px 3px rgba(64, 218, 103, 0.75);
  }
  
  .taskCatIcon.other 
  {
    border-color: var(white);
    box-shadow: 0px 0px 3px rgba(127, 56, 185, 0.75);
  }
  
  .taskCatIcon::after 
  {
    content: "";
    display: block;
    opacity: 0;
    width: 0px;
    height: 0px;
    background-color: rgb(73, 127, 210);
    box-shadow: rgb(175, 217, 252);
    border-radius: 50%;
    transition: 0.2s ease-in-out;
  }
  
  .taskCatIcon.school::after {
    background-color: rgb(232, 63, 63);
    box-shadow: 0px 0px 3px rgba(194, 72, 72, 0.75);
  }
  
  .taskCatIcon.fitness::after {
    background-color: rgb(100, 233, 100);
    box-shadow: 0px 0px 3px rgba(64, 218, 103, 0.75);
  }
  
  .taskCatIcon.other::after {
    background-color: rgb(151, 38, 226);
    box-shadow: 0px 0px 3px rgba(127, 56, 185, 0.75);
  }
  
  input:checked ~ .taskCatIcon::after {
    width: 10px;
    height: 10px;
    opacity: 1;
  }
  
  .createTask .taskOptions label div {
    color: rgb(34, 29, 29);
    font-size: 1.125rem;
    margin-top: 1rem;
  }
  
  .createTask input[type="submit"] 
  {
    display: block;
    width: 100%;
    font-size: 1.125rem;
    padding: 1rem 1.5rem;
    color: #FFF;
    background-color: rgb(28, 187, 240);
    border-radius: 0.5rem;
    box-shadow: 0px 0px 4px rgb(85, 213, 255);
    cursor: pointer;
    transition: 0.2s ease-in-out;
  }
  
  .createTask input[type="submit"]:hover 
  {
    opacity: 0.75;
  }
  
  .task-list .list 
  {
    margin: 1rem 0;
  } 
  
  .task-list .task-item 
  {
    display: flex;
    align-items: center;
    background-color: #FFF;
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    margin-bottom: 1rem;
  }
  
  .task-item label 
  {
    display: block;
    margin-right: 1rem;
    cursor: pointer;
  }
  
  .task-item .task-content 
  {
    flex: 1 1 0%;
  }
  
  .task-item .task-content input 
  {
    color: rgb(34, 29, 29);
    font-size: 1.125rem;
  }
  
  .task-item .actions 
  {
    display: flex;
    align-items: center;
  }
  
  .task-item .actions button 
  {
    display: block;
    padding: 0.5rem;
    border-radius: 0.25rem;
    color: #FFF;
    cursor: pointer;
    transition: 0.2s ease-in-out;
  }
  
  .task-item .actions button:hover 
  {
    opacity: 0.75;
  }
  
  .task-item .actions .edit 
  {
    margin-right: 0.5rem;
    background-color: rgb(28, 187, 240);
  }
  
  .task-item .actions .delete 
  {
    background-color: rgb(227, 69, 69);
  }
  
  .task-item.done .task-content input 
  {
    text-decoration: line-through;
    color: rgb(113, 113, 113);
  }
  
  .task-item.work {
    background-color: rgb(175, 217, 252);
  }
  
  .task-item.school {
    background-color: rgb(248, 151, 151);
  }
  
  .task-item.fitness {
    background-color:  rgb(169, 239, 169);
  }
  
  .task-item.other {
    background-color: rgb(200, 154, 232);
  }
  
  .task-list .task-item {
    display: flex;
    align-items: center;
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    margin-bottom: 1rem;
  }
  
  </style> 