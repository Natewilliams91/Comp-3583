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
      tasks: [],
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
    },
    addCategory() {
      if (this.newCategory.trim() === "") return;
      const position = Math.min(this.insertPosition, this.tasks.length);
      this.tasks.splice(position, 0, { category: this.newCategory, isCategoryHeader: true });
      this.newCategory = "";
      this.insertPosition = 0;
    },
    removeTask(index) {
      this.tasks.splice(index, 1);
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
    }
  }
};
</script>

<style scoped>
/* Global Styles */
.myprogress {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
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
  border: 1px solid #ccc;
  border-radius: 5px;
}

.category-dropdown {
  flex: 1;
  margin-right: 10px;
}

/* Buttons */
button {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.add-btn {
  background-color: #4CAF50;
  color: white;
}

.create-btn {
  background-color: #2196F3;
  color: white;
}

.remove-btn {
  background-color: #f44336;
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
  font-size: 2em;
  margin-bottom: 20px;
}

h3 {
  width: 100%;
  margin: 15px 0;
  font-weight: bold;
  border-bottom: 2px solid #ccc;
  padding-bottom: 5px;
}
</style>
