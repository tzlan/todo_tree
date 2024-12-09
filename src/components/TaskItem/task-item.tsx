import { Task } from "../../data/tasks";
import styles from "./task-item.module.css";
import { FaTrashAlt, FaCheckCircle, FaArrowLeft } from "react-icons/fa";

interface TaskItemProps {
    task: Task;
    onDelete: (id: number) => void;
    onStatusChange: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onStatusChange }) => {
    return (
        <div className={styles.taskItem}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>
                {task.date} à {task.heure}
            </p>

            <div className={styles.actions}>
                {/* Icône pour marquer comme terminé ou revenir */}
                {task.status === 0 ? (
                    <FaCheckCircle
                        className={styles.checkIcon}
                        onClick={() => onStatusChange(task.id)}
                        title="Finish"
                    />
                ) : (
                    <FaArrowLeft
                        className={styles.backIcon}
                        onClick={() => onStatusChange(task.id)}
                        title="Back to make"
                    />
                )}


                {task.status === 0 && (
                    <FaTrashAlt
                        className={styles.deleteIcon}
                        onClick={() => onDelete(task.id)}
                        title="Delete the task"
                    />
                )}
            </div>
        </div>
    );
};

export default TaskItem;
