import { useState, useEffect } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { tasks as initialTasks, Task } from "../data/tasks";
import TaskList from "../components/TaskList/task-list";
import TaskForm from "../components/TaskForm/task-form";

export const App: React.FC = () => {
  // Initialiser avec les tâches du localStorage s'il y en a, sinon utiliser initialTasks
  const [taskList, setTaskList] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : initialTasks;
  });
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Sauvegarder dans localStorage à chaque modification
  useEffect(() => {
    console.log("Updated taskList:", taskList);
    localStorage.setItem('tasks', JSON.stringify(taskList));
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
    console.log("Received task to add/update:", task); // Vérifie la tâche reçue
    
    setTaskList((prev) => {
      console.log(task);
      if (task.id) {
        console.log("Updating task with id:", task.id); // Vérifie l'ID pour la mise à jour
        return prev.map((t) => (t.id === task.id ? task : t));
      } else {
        const maxId = prev.length > 0 ? Math.max(...prev.map((t) => t.id)) : 0;
        const newTask = { ...task, id: maxId + 1 };
        console.log("Adding new task with ID:", newTask.id); // Vérifie l'ID pour l'ajout
        return [...prev, newTask];
      }
    });
  };
  
  const handleEditTask = (task: Task): void => {
    setSelectedTask(task);
    setShowPopup(true);
  };
//not need for the moment 
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
            title="To make"
            tasks={taskList.filter((task) => task.status === 0)}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
            onEdit={handleEditTask}
            droppableId="todo"
          />
          <TaskList
            title="Already make"
            tasks={taskList.filter((task) => task.status === 1)}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
            onEdit={handleEditTask}
            droppableId="done"
          />
        </div>
      </DragDropContext>
      <button
        className="add-task-button"
        onClick={() => {
          setSelectedTask(null);
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
            setSelectedTask(null);
          }}
          existingTask={selectedTask}
        />
      )}
    </div>
  );
};

