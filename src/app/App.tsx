import { useState, useEffect } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { tasks as initialTasks, Task } from "../data/tasks";
import TaskList from "../components/TaskList/task-list";
import TaskForm from "../components/TaskForm/task-form";
import React from "react";

export const App: React.FC = () => {
  // État des tâches
  const [taskList, setTaskList] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : initialTasks;
  });

  // État pour la popup et la tâche sélectionnée
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Sauvegarder les tâches dans localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskList));
  }, [taskList]);

  /**
   * Supprimer une tâche par ID
   */
  const handleDelete = (id: number): void => {
    setTaskList((prev) => prev.filter((task) => task.id !== id));
  };

  /**
   * Changer le statut d'une tâche
   */
  const handleStatusChange = (id: number): void => {
    setTaskList((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, status: task.status === 0 ? 1 : 0 }
          : task
      )
    );
  };

  /**
   * Ajouter ou mettre à jour une tâche
   */
  const handleAddOrUpdateTask = (task: Task): void => {
    setTaskList((prev) => {
      if (task.id) {
        // Met à jour la tâche existante
        return prev.map((t) => (t.id === task.id ? task : t));
      } else {
        // Ajoute une nouvelle tâche
        const maxId = prev.length > 0 ? Math.max(...prev.map((t) => t.id)) : 0;
        return [...prev, { ...task, id: maxId + 1 }];
      }
    });
  };

  /**
   * Préparer l'édition d'une tâche
   */
  const handleEditTask = (task: Task): void => {
    setSelectedTask(task);
    setShowPopup(true);
  };

  /**
   * Gestion du glisser-déposer (optionnel pour le moment)
   */
  const onDragEnd = (result: DropResult): void => {
    const { source, destination } = result;

    if (!destination) return; // Si l'utilisateur a annulé le déplacement

    const items = [...taskList];
    const [reorderedItem] = items.splice(source.index, 1);

    if (source.droppableId !== destination.droppableId) {
      // Met à jour le statut en fonction de la nouvelle colonne
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
          />
          <TaskList
            title="Done"
            tasks={taskList.filter((task) => task.status === 1)}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
            onEdit={handleEditTask}
            droppableId="done"
          />
        </div>
      </DragDropContext>

      {/* Bouton pour ajouter une tâche */}
      <button
        className="add-task-button"
        onClick={() => {
          setSelectedTask(null); // Réinitialiser la tâche sélectionnée
          setShowPopup(true); // Ouvrir le formulaire
        }}
      >
        +
      </button>

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
