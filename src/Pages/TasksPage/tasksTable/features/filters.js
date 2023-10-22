export const featuresFilters = {
  filterTasksByCompletionDate: function filterTasksByCompletionDate(
    tasks,
    selectedFilter
  ) {
    const today = new Date();
    const oneWeekFromNow = new Date();
    oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);

    const todayTasks = [];
    const weekTasks = [];
    const futureTasks = [];

    tasks.forEach((task) => {
      const taskDeadline = new Date(task.deadLine);
      if (taskDeadline <= today) {
        todayTasks.push(task);
      } else if (taskDeadline <= oneWeekFromNow) {
        weekTasks.push(task);
      } else {
        futureTasks.push(task);
      }
    });
    switch (selectedFilter.selectedFilter) {
      case "today":
        return todayTasks;
      case "week":
        return weekTasks;
      case "future":
        return futureTasks;
    }
  },
  groupTasksByResponsible: function groupTasksByResponsible(tasks) {
    tasks.sort((a, b) => a.responsible.localeCompare(b.responsible));
    return tasks;
  },
  allTasks: function sortTasksByLastUpdated(tasks) {
    return tasks.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  },
};
