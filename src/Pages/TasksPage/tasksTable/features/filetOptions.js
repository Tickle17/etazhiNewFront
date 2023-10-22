import { featuresFilters } from "./filters";

export default function filterTasksBySelectedOption(tasks, selectedFilter) {
  switch (selectedFilter.selectedFilter) {
    case "all": {
      return featuresFilters.allTasks(tasks);
    }
    case "today":
      return featuresFilters.filterTasksByCompletionDate(tasks, selectedFilter);
    case "week":
      return featuresFilters.filterTasksByCompletionDate(tasks, selectedFilter);
    case "future":
      return featuresFilters.filterTasksByCompletionDate(tasks, selectedFilter);
    case "admin":
      return featuresFilters.groupTasksByResponsible(tasks);
    default:
      return tasks;
  }
}
