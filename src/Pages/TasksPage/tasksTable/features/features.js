export default function extractedHandleChange(
  responsible,
  editedTask,
  setEditedTask
) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "responsible") {
      const selectedResponsible = responsible.find((resp) => resp.id === value);
      const newTaskData = {
        ...editedTask,
        responsible: `${selectedResponsible.firstName} ${selectedResponsible.secondName}`,
        responsibleId: selectedResponsible.id,
        responsibleRole: selectedResponsible.role,
      };
      setEditedTask(newTaskData);
    } else {
      setEditedTask({ ...editedTask, [name]: value });
    }
  };
  return handleChange;
}
