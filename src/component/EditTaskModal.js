import React from 'react';

class TaskModal extends React.Component {
  render() {
    const { open, onClose, onSaveTask, onSaveEditedTask, taskTitle, taskDescription, onTaskTitleChange, onTaskDescriptionChange } = this.props;

    return (
      <div className={`modal-container ${open ? 'modal-open' : ''}`}>
        <div className="modal-content">
          <div className="modal-header">
            <h2>{open ? 'Save Task' : 'Edit Task Description'}</h2>
          </div>
          <input
            type="text"
            className="modal-input"
            placeholder="Title"
            value={taskTitle}
            onChange={onTaskTitleChange}
          />
          <textarea
            className="modal-input"
            placeholder="Description"
            value={taskDescription}
            onChange={onTaskDescriptionChange}
          />
          <div className="modal-buttons">
            {open ? (
              <button className="modal-button" onClick={onSaveTask}>
                Save
              </button>
            ) : (
              <button className="modal-button" onClick={onSaveEditedTask}>
                Save Description
              </button>
            )}
            <button className="modal-button secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default TaskModal;
