import { useState, useEffect } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { tasks as initialTasks, Task } from "../data/tasks";
import TaskList from "../components/TaskList/task-list";
import TaskForm from "../components/TaskForm/task-form";
import React from "react";

export const App: React.FC = () => {
  // Initialiser avec les tâches du localStorage ou les tâches par défaut
  const [taskList, setTaskList] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    try {
      return savedTasks ? JSON.parse(savedTasks).filter((task: Task) => task.id && task.title) : initialTasks;
    } catch {
      console.error("Erreur lors du parsing des données de localStorage.");
      return initialTasks;
    }
  });

  const [showPopup, setShowPopup] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Sauvegarder dans le localStorage chaque fois que la liste des tâches est mise à jour
  useEffect(() => {
    console.log("Updated taskList:", taskList);
    localStorage.setItem("tasks", JSON.stringify(taskList));
  }, [taskList]);

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
    console.log("Received task to add/update:", task);

    setTaskList((prev) => {
      if (prev.some((t) => t.id === task.id)) {
        console.log("Updating task with id:", task.id);
        return prev.map((t) => (t.id === task.id ? task : t));
      } else {
        const highestId = prev.length > 0 ? Math.max(...prev.map((t) => t.id)) : 0;
        const newTask = { ...task, id: highestId + 1 };
        console.log("Adding new task with ID:", newTask.id);
        return [...prev, newTask];
      }
    });
  };

  const handleEditTask = (task: Task): void => {
    setSelectedTask(task);
    setShowPopup(true);
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
        {/* Colonnes des tâches */}
        <div className="task-list-container">
          <TaskList
            title="To-Do"
            tasks={taskList.filter((task) => task.status === 0)}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
            onEdit={handleEditTask}
            droppableId="todo"
            setSelectedTask = {setSelectedTask}
            setShowPopup = { setShowPopup}
          />
          <TaskList
            title="Done"
            tasks={taskList.filter((task) => task.status === 1)}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
            onEdit={handleEditTask}
            droppableId="done"            
            setSelectedTask = {setSelectedTask}
            setShowPopup = { setShowPopup}

          />
        </div>
      </DragDropContext>

      {/* Popup du formulaire */}
      {showPopup && (
        <TaskForm
          onAddTask={handleAddOrUpdateTask}
          onClose={() => {
            setShowPopup(false);
            setSelectedTask(null);
          }}
          existingTask={selectedTask}
        />
      )}
    </div>
  );
};