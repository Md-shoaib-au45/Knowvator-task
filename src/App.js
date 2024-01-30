import React from 'react'
import TaskList from './component/TaskList'
import TaskModal from './component/TaskModal'
import Timer from './component/Timer'
import './App.css'

export default function App() {
  return (
    <div >
      <TaskList/>
      <TaskModal/>
      <Timer/>
    </div>
  )
}
