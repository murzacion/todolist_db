<template>
  <v-app-bar app>
    <v-toolbar-title>ToDoList</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-title class="mr-2 NumberTasks"
      >{{ NumberTasks > 1 ? msg2 : msg1 }}:</v-toolbar-title
    >
    <v-progress-circular
      :value="progress"
      :size="50"
      :width="5"
      style="font-size: 20px"
      class="mr-2"
    >
      {{ NumberTasks }}
    </v-progress-circular>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      msg1: "Task",
      msg2: "Tasks"
    };
  },
  computed: {
    completedTasks() {
      return this.$store.getters.selectedTask.length;
    },
    progress() {
      return (this.completedTasks / this.$store.getters.Tasks.length) * 100;
    },
    remainingTasks() {
      return this.$store.getters.Tasks.length - this.completedTasks;
    },
    NumberTasks() {
      return this.$store.getters.numberOfTasks;
    }
  }
};
</script>
<style lang="scss">
.NumberTasks {
  font-size: 1.25rem;
}
</style>
