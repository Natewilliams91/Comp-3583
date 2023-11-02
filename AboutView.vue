<template>
  <div class="myprogress">
    <h1>My Progress</h1>
    
    <!-- Task Addition -->
    <div>
      <input v-model="newTask" @keyup.enter="addTask" placeholder="Add a new task">
      <select v-model="selectedCategory">
        <option v-for="category in categories" :key="category">{{ category }}</option>
      </select>
      <button @click="addTask">Add Task</button>
    </div>
    
    <!-- Category Addition -->
    <div class="category-section">
      <input v-model="newCategory" placeholder="New category name">
      <input v-model="insertPosition" type="number" placeholder="Insert position (0 for top)">
      <button @click="addCategory">Create Category</button>
    </div>
    
    <!-- Tasks and Categories Display -->
    <ul>
      <li v-for="(task, index) in tasks" :key="index">
        <template v-if="task.isCategoryHeader">
          <h3>{{ task.category }}</h3>
        </template>
        <span v-if="!task.isCategoryHeader">{{ task.text }}</span>
        <input
          type="range"
          min="0"
          max="100"
          v-if="!task.isCategoryHeader"
          v-model="task.progress"
          :style="getProgressBarColor(task.progress)"
        >
        <span v-if="!task.isCategoryHeader">{{ task.progress }}%</span>
        <button @click="removeTask(index)">Remove</button>
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
.myprogress {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.category-section {
  margin-top: 20px;
  border-top: 1px solid #eee;
  padding-top: 10px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
}

h3 {
  width: 100%;
  margin-top: 10px;
  font-weight: bold;
}

input[type="range"] {
  width: 60%;
  height: 10px;
  appearance: none;
  background: transparent;
  outline: none;
  opacity: 0.7;
  transition: background 0.2s;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 15px;
  height: 15px;
  background-color: transparent;
  border: 1px solid #000;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.2s;
}

button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}
</style>

















