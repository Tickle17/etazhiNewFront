// Ваш файл с обработчиками (utils.js)
import { closeModal } from "../../../../Shared/modal/modalSlice";

export const featuresModalCreateTask = {
  extractedHandleChange: function extractedHandleChange(
    responsible,
    taskData,
    setTaskData
  ) {
    const handleChange = (e) => {
      const { name, value } = e.target;
      if (name === "responsible") {
        const selectedResponsible = responsible.find(
          (resp) => resp.id === value
        );
        const newTaskData = {
          ...taskData,
          responsible: `${selectedResponsible.firstName} ${selectedResponsible.secondName}`,
          responsibleId: selectedResponsible.id,
          responsibleRole: selectedResponsible.role,
        };
        setTaskData(newTaskData);
      } else {
        setTaskData({
          ...taskData,
          [name]: value,
        });
      }
    };
    return handleChange;
  },

  extractedHandleSubmit: function extractedHandleSubmit(
    createTask,
    taskData,
    dispatch
  ) {
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await createTask({ taskData });
        if (response.data) {
          dispatch(closeModal());
          alert("Задача создана");
          window.location.reload();
        }
      } catch (error) {
        console.error("Ошибка при выполнении POST-запроса:", error);
      }
    };
    return handleSubmit;
  },
};
