import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { tasks as initialTasks, Task } from "../data/tasks";
import TaskList from "../components/TaskList/TaskList";
import TaskForm from "../components/TaskForm/TaskForm";

const Home: React.FC = () => {
  const [taskList, setTaskList] = useState<Task[]>(initialTasks);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null); // État pour la tâche sélectionnée

  const handleDelete = (id: number): void => {
    setTaskList((prev) => prev.filter((task) => task.id !== id));
  };

  const handleStatusChange = (id: number): void => {
    setTaskList((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: task.status === 0 ? 1 : 0 } : task
      )
    );
  };

  const handleAddOrUpdateTask = (task: Task): void => {
    if (task.id) {
      // Mise à jour d'une tâche existante
      setTaskList((prev) =>
        prev.map((t) => (t.id === task.id ? { ...task } : t))
      );
    } else {
      // Ajout d'une nouvelle tâche
      setTaskList((prev) => [...prev, { ...task, id: Date.now() }]);
    }
    setShowPopup(false);
    setSelectedTask(null); // Réinitialise la tâche sélectionnée
  };

  const handleEditTask = (task: Task): void => {
    setSelectedTask(task); // Préparer la tâche pour modification
    setShowPopup(true);    // Afficher la popup avec les données
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const items = [...taskList];
    const [reorderedItem] = items.splice(source.index, 1);

    if (source.droppableId !== destination.droppableId) {
      reorderedItem.status = destination.droppableId === "done" ? 1 : 0;
    }

    items.splice(destination.index, 0, reorderedItem);
    setTaskList(items);
  };

  return (
    <div className="home">
      <h1>To-Do List</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="columns">
          <TaskList
            title="À Faire"
            tasks={taskList.filter((task) => task.status === 0)}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
            onEdit={handleEditTask} // Passer la méthode d'édition
            droppableId="todo"
          />
          <TaskList
            title="Fait"
            tasks={taskList.filter((task) => task.status === 1)}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
            onEdit={handleEditTask} // Passer la méthode d'édition
            droppableId="done"
          />
        </div>
      </DragDropContext>
      <button
        className="add-task-button"
        onClick={() => {
          setSelectedTask(null); // Réinitialise pour une nouvelle tâche
          setShowPopup(true);
        }}
      >
        +
      </button>
      {showPopup && (
        <TaskForm
          onAddTask={handleAddOrUpdateTask}
          onClose={() => {
            setShowPopup(false);
            setSelectedTask(null); // Réinitialise en cas de fermeture
          }}
          existingTask={selectedTask} // Passer la tâche existante ou null
        />
      )}
    </div>
  );
};

export default Home;
