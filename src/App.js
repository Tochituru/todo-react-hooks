import React, { useState, useEffect } from 'react';
import { CssBaseline, Container, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core'

import TaskList from './components/TaskList'
import { idGen, findIndex } from './helpers'

const App = () => {
  let [taskValue, setTaskValue] = useState('')
  const [todoList, setTodoList] = useState([])
  const [isModalOpen, toggleModalState] = useState(false)
  const [initialField, editField] = useState('')

  useEffect(() => {
    console.log('nothing')
  })

  useEffect(() => {
    console.log('levanto storage')
    const persistedState = window.localStorage.getItem('todo-state')
    setTodoList([ ...(JSON.parse(persistedState) || '')])
  }, [])

  useEffect(() => {
    console.log('guardo en el storage')
    window.localStorage.setItem('todo-state', JSON.stringify(todoList))
  }, [todoList])


  const toggleModal = () => toggleModalState(!isModalOpen)

  const enterHandler = (e) => {
    if (e.key === 'Enter' && taskValue) {
      let newTask = { id: idGen('task'), text: taskValue, status: 'pending' }
      setTodoList([newTask, ...todoList])
      setTaskValue('')
    }
  }

  const deleteTask = (id) => {
    let newList = [...todoList]
    newList.splice(findIndex(newList, id), 1)
    setTodoList(newList)
  }

  const changeTaskStatus = (id) => {
    let newList = [...todoList]
    let task = newList.find((e) => e.id === id)
    task.status = task.status === 'pending' ? 'completed' : 'pending'
    setTodoList(newList)
  }

  const openEditModal = (id) => {
    toggleModal()
  }
  const pending = todoList.filter(e => e.status === 'pending')
  const complete = todoList.filter(e => e.status === 'completed')

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
        data={pending}
        changeTaskStatus={changeTaskStatus}
        deleteTask={deleteTask}
        editTask={openEditModal}
      />
      <TaskList
        title={'Completadas'}
        tag={'( X )'}
        data={complete}
        changeTaskStatus={changeTaskStatus}
        deleteTask={deleteTask}
        editTask={openEditModal}
      />

      <Dialog open={isModalOpen} onClose={toggleModal}>
        <DialogTitle>
          Editar
            </DialogTitle>
        <DialogContent>
          <TextField
            label={'task'}
            name={'editField'}
            variant={'outlined'}
            value={initialField}
          // onChange={(e) => this.fieldHandler(e)}
          // onKeyPress={(e) => this.enterEditHandler(e)}
          >
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button
          // onClick={() => saveEdit()}
          >
            Guardar
              </Button>
          <Button
            onClick={() => toggleModal()}
          >
            Cancelar
            </Button>
        </DialogActions>
      </Dialog>


    </Container>
  );
}

export default App;
