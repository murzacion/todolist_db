<template>
  <v-card
    width="800px"
    height="800px"
    class="mx-auto mt-5 mybox overflow-y-auto"
    :class="scrollbarTheme"
  >
    <v-container width="800px" height="800px" class="mybox" fluid>
      <v-input class="myinput">
        <v-text-field
          v-model="newTask"
          label="Task"
          placeholder="Enter here..."
          class="task"
          required
          @keyup.enter="addTask()"
          autofocus
        ></v-text-field>
        <v-btn
          :disabled="!validate"
          @click="valid"
          class="mx-2"
          fab
          dark
          color="indigo"
        >
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
      </v-input>
      <div class="text-center" v-if="Tasks.length > 0">
        <transition name="fade" mode="out-in">
          <v-btn
            v-if="!allSelected"
            @click="SelectAllTasks()"
            class="mybtn selallbtn ma-2"
            outlined
            color="indigo"
            >Select All</v-btn
          >
          <v-btn
            v-else-if="allSelected"
            @click="UnselectAllTasks()"
            class="mybtn unselallbtn ma-2"
            outlined
            color="indigo"
            >Unselect All</v-btn
          >
        </transition>
        <v-btn
          @click="ShowAll()"
          class="mybtn showselbtn ma-2"
          outlined
          color="success"
          >Show All</v-btn
        >
        <v-btn
          @click="ShowSelectedTasks()"
          class="mybtn showselbtn ma-2"
          outlined
          color="success"
          >Show Selected</v-btn
        >
        <v-btn
          @click="ShowUnselectedTasks()"
          class="mybtn showselbtn ma-2"
          outlined
          color="success"
          >Show Unselected</v-btn
        >
        <v-btn
          v-if="SelectedTasks.length === numTask"
          @click="deleteAllTasks()"
          class="mybtn delallbtn ma-2"
          outlined
          color="error"
          >Delete All</v-btn
        >
        <v-btn
          v-else-if="SelectedTasks.length > 0"
          @click="deleteAllTasks()"
          class="mybtn delallbtn ma-2"
          outlined
          color="error"
          >Delete Selected</v-btn
        >
      </div>
      <v-divider v-if="Tasks.length > 0" class="mx-2"></v-divider>
      <v-list v-if="!ShowSelected && !ShowUnselected">
        <v-list-item v-for="(task, index) in Tasks" :key="index">
          <v-list-item-icon style="margin-right: 10px;">
            <v-btn @click="selectTask(task)" icon>
              <v-icon :class="task.done ? 'icon-checked' : ''">mdi-star</v-icon>
            </v-btn>
          </v-list-item-icon>
          <v-list-item-content>
            <v-text-field
              :label="task.datein"
              class="editTask"
              type="text"
              v-model="task.text"
              @click="editTask(task)"
              @blur="saveTask(task, $event)"
              @keyup.enter="saveTask(task, $event)"
              @keyup.esc="cancelEdit(task, $event)"
            />
          </v-list-item-content>
          <v-list-item-icon style="margin-left: 0px;">
            <v-btn @click="deleteTask(task)" icon color="teal">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
      <v-list v-else-if="ShowSelected">
        <v-list-item v-for="(task, index) in SelectedTasks" :key="index">
          <v-list-item-icon style="margin-right: 10px;">
            <v-btn @click="selectTask(task)" icon>
              <v-icon :class="task.done ? 'icon-checked' : ''">mdi-star</v-icon>
            </v-btn>
          </v-list-item-icon>
          <v-list-item-content>
            <v-text-field
              :label="task.datein"
              class="editTask"
              type="text"
              v-model="task.text"
              @click="editTask(task)"
              @blur="saveTask(task, $event)"
              @keyup.enter="saveTask(task, $event)"
              @keyup.esc="cancelEdit(task, $event)"
            />
          </v-list-item-content>
          <v-list-item-icon style="margin-left: 0px;">
            <v-btn v-if="task.done" @click="deleteTask(task)" icon color="teal">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
      <v-list v-else-if="ShowUnselected">
        <v-list-item v-for="(task, index) in UnselectedTasks" :key="index">
          <v-list-item-icon style="margin-right: 10px;">
            <v-btn @click="selectTask(task)" icon>
              <v-icon :class="task.done ? 'icon-checked' : ''">mdi-star</v-icon>
            </v-btn>
          </v-list-item-icon>
          <v-list-item-content>
            <v-text-field
              :label="task.datein"
              class="editTask"
              type="text"
              v-model="task.text"
              @click="editTask(task)"
              @blur="saveTask(task, $event)"
              @keyup.enter="saveTask(task, $event)"
              @keyup.esc="cancelEdit(task, $event)"
            />
          </v-list-item-content>
          <v-list-item-icon style="margin-left: 0px;">
            <v-btn @click="deleteTask(task)" icon color="teal">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-container>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      ShowSelected: false,
      ShowUnselected: false,
      newTask: "",
      editedTask: null,
      validate: true
    };
  },
  mounted() {
    this.$store.dispatch("GET_TASKS");
  },
  computed: {
    scrollbarTheme() {
      return "light";
    },
    Tasks() {
      return this.$store.getters.Tasks;
    },
    numTask() {
      return this.$store.getters.numberOfTasks;
    },
    SelectedTasks() {
      return this.$store.getters.selectedTask;
    },
    UnselectedTasks() {
      return this.$store.getters.unselectedTask;
    },
    allSelected() {
      return (
        this.$store.getters.selectedTask.length ===
        this.$store.getters.numberOfTasks
      );
    }
  },
  methods: {
    addTask: function() {
      if (!this.newTask) return;
      this.$store.dispatch("ADD_TASK", {
        text: this.newTask,
        datein: this.datetask(),
        done: false
      });
      this.newTask = "";
    },
    valid: function() {
      if (this.newTask.length > 0) {
        this.addTask();
      } else alert("You must write something!");
    },
    selectTask: function(task) {
      this.$store.dispatch("SELECT_TASK", task);
    },
    deleteTask: function(task) {
      this.$store.dispatch("DELETE_TASK", task);
    },
    deleteAllTasks: function() {
      this.$store.dispatch("DELETE_ALL_TASKS");
    },
    SelectAllTasks: function() {
      this.$store.dispatch("SELECT_ALL_TASKS");
      this.ShowUnselected = false;
      this.ShowSelected = false;
    },
    UnselectAllTasks: function() {
      this.$store.dispatch("UNSELECT_ALL_TASKS");
      this.ShowUnselected = false;
      this.ShowSelected = false;
    },
    ShowSelectedTasks: function() {
      this.ShowSelected = true;
      this.ShowUnselected = false;
    },
    ShowUnselectedTasks: function() {
      this.ShowSelected = false;
      this.ShowUnselected = true;
    },
    ShowAll: function() {
      this.ShowSelected = false;
      this.ShowUnselected = false;
    },
    editTask: function(task) {
      this.beforeEditCache = task.text;
      this.editedTask = task;
    },
    saveTask: function(task, event) {
      if (!this.editedTask) return;
      task.datein = this.datetask();
      if (!task.text) {
        this.deleteTask(task);
      } else {
        this.$store.dispatch("SAVE_TASK", task);
      }
      event.target.blur();
      this.editedTask = null;
    },
    cancelEdit: function(task, event) {
      this.editedTask = null;
      task.text = this.beforeEditCache;
      event.target.blur();
    },
    datetask: function() {
      let d = new Date();
      let transorm =
        d.getDate() < 10
          ? "0" + d.getDate().toString()
          : d.getDate().toString();
      transorm += ".";
      transorm +=
        d.getMonth() + 1 < 10
          ? "0" + (d.getMonth() + 1).toString()
          : (d.getMonth() + 1).toString();
      transorm += ".";
      transorm += d.getFullYear();
      return transorm;
    }
  }
};
</script>

<style lang="scss">
.editTask {
  label {
    margin-left: calc(100% - 75px);
    font-size: 1.15rem;
  }
}
.editTask {
  padding-top: 5px !important;
  padding-bottom: 5px;
  padding-left: 2px;
  outline: 0;
}
.editTask:focus {
  border-bottom: 2px solid #1976d2;
}

.mybtn {
  font-size: 0.7rem !important;
}

.activebtn {
  justify-self: space-between;
}

.task {
  margin-right: 10px;
}

.icon-checked::before {
  color: gold;
}

::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-thumb {
  background: #c7f5ff;
  border-radius: 7px;
}
::-webkit-scrollbar-track {
  border: 0px none #ffffff;
  border-radius: 53px;
}

@media (min-height: 550px) {
}

.with-mode-fade-enter-active,
.with-mode-fade-leave-active {
  transition: opacity 0.5s;
}
.with-mode-fade-enter,
.with-mode-fade-leave-active {
  opacity: 0;
}
</style>
