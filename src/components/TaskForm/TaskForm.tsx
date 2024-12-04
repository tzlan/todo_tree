import React, { useState } from "react";
import { Task } from "../../data/tasks";

interface TaskFormProps {
  onAddTask: (newTask: Task) => void;
  onClose: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    // Récupérer la date et l'heure actuelles
    const now = new Date();
    const formattedDate = now.toISOString().split("T")[0]; // Format "YYYY-MM-DD"
    const formattedTime = now.toTimeString().split(" ")[0]; // Format "HH:mm:ss"

    const newTask: Task = {
      id: Date.now(),
      title,
      description,
      date: formattedDate,
      heure: formattedTime,
      status: 0,
    };

    onAddTask(newTask);
    setTitle("");
    setDescription("");
    onClose(); // Fermer la popup après l'ajout
  };

  return (
    <div className="task-form-page">
      <div className="form-container">
        <h2 className="form-title">Nouvelle Tâche</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="form-input"
            type="text"
            placeholder="Titre"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="form-textarea"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="form-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="submit-btn"
            >
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
