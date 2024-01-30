import React from 'react';

class TaskList extends React.Component {
  render() {
    const { tasks, onEditTask } = this.props;

    return (
      <div className="task-list-container">
        <h2>Task List</h2>
        {tasks && tasks.length > 0 ? (
          <ul className="task-list">
            {tasks.map((task, index) => (
              <li key={index} className="task-item">
                <div>
                  <strong>{task.title}</strong>
                  <p>{task.description}</p>
                  <span className="time-tracked">{task.time}</span>
                </div>
                <button className="edit-button" onClick={() => onEditTask(index)}>Edit</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No tasks to display</p>
        )}
      </div>
    );
  }
}

export default TaskList;
