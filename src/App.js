import React, { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filterCompleted, setFilterCompleted] = useState(false);

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleAddTask = (event) => {
    event.preventDefault();
    if (newTask.trim() !== '') {
      const newTaskObj = {
        id: Date.now(),
        description: newTask,
        completed: false
      };
      setTasks([...tasks, newTaskObj]);
      setNewTask('');
    }
  };

  const handleCompleteTask = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleRemoveTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleFilterCompleted = () => {
    setFilterCompleted(!filterCompleted);
  };

  const handleEditTask = (taskId, newDescription) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, description: newDescription };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const filteredTasks = filterCompleted ? tasks.filter((task) => task.completed) : tasks;

  return (
    <div>
      <h1>Lista de Tarefas</h1>

      <form onSubmit={handleAddTask}>
        <input
          type="text"
          value={newTask}
          onChange={handleInputChange}
          placeholder="Digite uma nova tarefa"
        />
        <button type="submit">Adicionar</button>
      </form>

      <div>
        <input
          type="checkbox"
          checked={filterCompleted}
          onChange={handleFilterCompleted}
        />
        <label>Filtrar concluídas</label>
      </div>

      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <span className={task.completed ? 'completed' : ''}>{task.description}</span>
            <button onClick={() => handleCompleteTask(task.id)}>
              {task.completed ? 'Desfazer' : 'Concluir'}
            </button>
            <button onClick={() => handleRemoveTask(task.id)}>Remover</button>
            <button onClick={() => handleEditTask(task.id, prompt('Digite a nova descrição:'))}>
              Editar
            </button>
          </li>
        ))}
      </ul>

      <button onClick={() => setTasks(tasks.filter((task) => !task.completed))}>
        Excluir tarefas concluídas
      </button>
    </div>
  );
}

export default App;

