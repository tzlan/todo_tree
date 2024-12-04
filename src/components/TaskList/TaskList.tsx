import * as React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import TaskItem from "../TaskItem/TaskItem";
import { Task } from "../../data/tasks";

interface TaskListProps {
    title: string;
    tasks: Task[];
    onDelete: (id: number) => void;
    onStatusChange: (id: number) => void;
    droppableId: string;
}

const TaskList: React.FC<TaskListProps> = ({ title, tasks, onDelete, onStatusChange, droppableId }) => {
    return (
        <div className="task-list">
            <h2>{title}</h2>
            <Droppable droppableId={droppableId}>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
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
                                        />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default TaskList;