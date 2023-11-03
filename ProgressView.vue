<template>
  <div class="myprogress">
    <h1>My Progress</h1>
    
    <!-- Task Addition -->
    <div class="add-section">
      <input class="task-input" v-model="newTask" @keyup.enter="addTask" placeholder="Add a new task">
      <select class="category-dropdown" v-model="selectedCategory">
        <option disabled value="">Select a category</option>
        <option v-for="category in categories" :key="category">{{ category }}</option>
      </select>
      <button class="add-btn" @click="addTask">Add Task</button>
    </div>
    
    <!-- Category Addition -->
    <div class="category-section">
      <input class="category-input" v-model="newCategory" placeholder="New category name">
      <button class="create-btn" @click="addCategory">Create Category</button>
    </div>
    
    <!-- Tasks and Categories Display -->
    <ul class="task-list">
      <li v-for="(task, index) in tasks" :key="index">
        <template v-if="task.isCategoryHeader">
          <h3>{{ task.category }}</h3>
        </template>
        <div v-if="!task.isCategoryHeader" class="task-item">
          <span>{{ task.text }}</span>
          <div class="progress-container">
            <input
              type="range"
              min="0"
              max="100"
              v-model="task.progress"
              :style="getProgressBarColor(task.progress)"
            >
            <span>{{ task.progress }}%</span>
            <button class="remove-btn" @click="removeTask(index)">Remove</button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  data() {
    return {
      newTask: "",
      newCategory: "",
      insertPosition: 0,
      tasks: JSON.parse(localStorage.getItem("tasks")) || [], // Load tasks from localStorage on component initialization.
      selectedCategory: "other"
    };
  },
  computed: {
    categories() {
      return [...new Set(this.tasks.filter(t => t.isCategoryHeader).map(t => t.category))];
    }
  },
  methods: {
    addTask() {
      if (this.newTask.trim() === "") return;
      this.tasks.push({ text: this.newTask, category: this.selectedCategory, progress: 0 });
      this.newTask = "";
      this.saveTasks(); // Save tasks to localStorage after adding a new task.
    },
    addCategory() {
      if (this.newCategory.trim() === "") return;
      const position = Math.min(this.insertPosition, this.tasks.length);
      this.tasks.splice(position, 0, { category: this.newCategory, isCategoryHeader: true });
      this.newCategory = "";
      this.insertPosition = 0;
      this.saveTasks(); // Save tasks to localStorage after adding a new category.
    },
    removeTask(index) {
      this.tasks.splice(index, 1);
      this.saveTasks(); // Save tasks to localStorage after removing a task.
    },
    getProgressBarColor(progress) {
      const red = Math.round(255 - (progress * 2.55));
      const green = Math.round(progress * 2.55);
      const pointerColor = `rgb(${red}, ${green}, 0)`;
      const background = `linear-gradient(to right, ${pointerColor}, rgb(255, 255, 0), rgb(0, 128, 0))`;
      return {
        background,
        "::-webkit-slider-thumb": {
          background: pointerColor,
        },
      };
    },
    saveTasks() {
      // Save tasks to localStorage.
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }
  }
};

</script>


<style scoped>
/* Global Styles */
.myprogress {
  font-family: 'Arial', sans-serif;
  max-width: 600px;
  margin: 30px auto;
  padding: 20px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.05);
}

.add-section, .category-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.task-input, .category-input {
  flex: 2;
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

.category-dropdown {
  flex: 1;
  margin-right: 10px;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

/* Buttons */
button {
  padding: 10px 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
}

.add-btn {
  background-color: #3498db;
  color: white;
}

.create-btn {
  background-color: #2ecc71;
  color: white;
}

.remove-btn {
  background-color: #e74c3c;
  color: white;
}

/* Task List */
.task-list {
  list-style: none;
  padding: 0;
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  padding: 10px 0;
}

.progress-container {
  display: flex;
  align-items: center;
}

input[type="range"] {
  width: 60%;
  margin-right: 10px;
}

h1 {
  text-align: center;
  font-size: 24px;
  margin-bottom: 25px;
  color: #2c3e50;
}

h3 {
  width: 100%;
  margin: 15px 0;
  font-weight: bold;
  color: #2c3e50;
  font-size: 18px;
  padding-bottom: 5px;
  border-bottom: 2px solid #e0e0e0;
}
</style>
