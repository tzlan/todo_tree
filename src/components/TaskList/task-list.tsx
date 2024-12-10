import * as React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import TaskItem from "../TaskItem/task-item";
import { Task } from "../../data/tasks";
import  style from  "./task-list.module.css"
import "../../styles/App.css"

interface TaskListProps {
  title: string;
  tasks: Task[];
  onDelete: (id: number) => void;
  onStatusChange: (id: number) => void;
  onEdit: (task: Task) => void; // Ajout de la fonction d'édition
  droppableId: string;
  setSelectedTask: React.Dispatch<React.SetStateAction<Task | null>>
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>
  
}


const TaskList: React.FC<TaskListProps> = ({
  title,
  tasks,
  onDelete,
  onStatusChange,
  onEdit, // Fonction d'édition passée en props
  droppableId,setSelectedTask,setShowPopup
}) => {
  return (
    
    <div className="task-list">
      <h2 style={{textAlign: "center", fontWeight: "bolder", fontSize: "2em"}}>{title}</h2>
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {tasks.map((task, index) => (
              <Draggable
                key={task.id}
                draggableId={task.id.toString()}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TaskItem
                      task={task}
                      onDelete={onDelete}
                      onStatusChange={onStatusChange}
                      onEdit={onEdit}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

 {/* If it's to do ok else not button */}
 {title === "To-Do" && (
        
        <div className={style.add_task_button_container}>
              <button
            className={style.add_task_button}
            onClick={() => {
              setSelectedTask(null); // Réinitialiser la tâche sélectionnée
              setShowPopup(true); // Ouvrir le formulaire
            }}
          >
            +
        </button>

        </div>

     
      )}
    </div>
    
  );
};

export default TaskList;