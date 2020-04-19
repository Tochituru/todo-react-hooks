import React, { useState } from 'react';
import { CssBaseline, Container, Button, Modal, TextField } from '@material-ui/core'

import TaskList from './components/TaskList'
import idGen from './helpers/idGen'

const App = () => {
  let [taskValue, setTaskValue] = useState('')
  const [todoList, setTodoList] = useState([])

  const enterHandler = (e) => {
    if (e.key === 'Enter' && taskValue) {
      let newTask = {id: idGen('task'), text: taskValue, status: 'pending'}
      setTodoList([newTask, ...todoList])
      setTaskValue('')
    }
  }



  console.log(todoList) 

  return (
    <Container>
      <CssBaseline />
      <h1>Título</h1>
      <TextField
        value={taskValue}
        label={'Ingrese tarea'}
        name={'task'}
        variant="outlined"
        onChange={e => setTaskValue(e.target.value)}
        onKeyPress={(e) => enterHandler(e)}
      />

      <TaskList
        title={'Pendientes'}
        tag={'(___)'}
        data={todoList}
        // changeStatus={this.changeStatus}
        // deleteTask={this.deleteTask}
        // editTask={this.openEdition}
      />

    </Container>
  );
}

export default App;
