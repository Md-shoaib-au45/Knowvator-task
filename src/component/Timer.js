import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import TaskModal from './TaskModal';
import EditTaskModal from './EditTaskModal';
import './Timer.css';

const Timer = () => {
  const [time, setTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerPaused, setTimerPaused] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [editTaskIndex, setEditTaskIndex] = useState(null);
  const [editTaskDescription, setEditTaskDescription] = useState('');

  useEffect(() => {
    let interval;
    if (timerRunning && !timerPaused) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerPaused]);

  const handleStartStop = () => {
    if (!timerRunning) {
      setTime(0);
    }
    setTimerRunning(!timerRunning);
    setTimerPaused(false);
  };

  const handlePauseResume = () => {
    setTimerPaused(!timerPaused);
  };

  const handleSave = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setTaskTitle('');
    setTaskDescription('');
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setEditTaskIndex(null);
    setEditTaskDescription('');
  };

  const handleSaveTask = () => {
    const newTask = {
      title: taskTitle,
      description: taskDescription,
      time: formatTime(time),
    };
    setTasks([...tasks, newTask]);
    handleCloseModal();
  };

  const handleEditTask = index => {
    setEditTaskIndex(index);
    setEditTaskDescription(tasks[index].description);
    setEditModalOpen(true);
  };

  const handleSaveEditedTask = () => {
    const updatedTasks = [...tasks];
    updatedTasks[editTaskIndex].description = editTaskDescription;
    setTasks(updatedTasks);
    handleCloseEditModal();
  };

  const formatTime = seconds => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="timer-container">
      <div className="timer-display">{formatTime(time)}</div>
      <div className="timer-buttons">
        <button className="timer-button" onClick={handleStartStop}>
          {timerRunning ? 'Stop' : 'Start'}
        </button>
        <button className="timer-button" onClick={handlePauseResume} disabled={!timerRunning}>
          {timerPaused ? 'Resume' : 'Pause'}
        </button>
        <button className="timer-button" onClick={handleSave} disabled={!timerRunning}>
          Save
        </button>
      </div>
      <TaskList tasks={tasks} onEditTask={handleEditTask} />
      <TaskModal
        open={modalOpen}
        onClose={handleCloseModal}
        onSaveTask={handleSaveTask}
        taskTitle={taskTitle}
        taskDescription={taskDescription}
        onTaskTitleChange={e => setTaskTitle(e.target.value)}
        onTaskDescriptionChange={e => setTaskDescription(e.target.value)}
      />
      <EditTaskModal
        open={editModalOpen}
        onClose={handleCloseEditModal}
        onSaveEditedTask={handleSaveEditedTask}
        editTaskDescription={editTaskDescription}
        onEditTaskDescriptionChange={e => setEditTaskDescription(e.target.value)}
      />
    </div>
  );
};

export default Timer;
