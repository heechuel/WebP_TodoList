import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import CreateTask from '../modals/CreateTask';
import Card from './Card';

const TodoList = () => {
  const [modal, setModal] = useState(false);
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    let arr = localStorage.getItem("taskList");
    if (arr) {
      let obj = JSON.parse(arr);
      setTaskList(obj);
    }
  }, []);

  const deleteTask = (index) => {
    let tempList = [...taskList];
    tempList.splice(index, 1);
    localStorage.setItem("taskList", JSON.stringify(tempList));
    setTaskList(tempList);
  };

  const updateListArray = (obj, index) => {
    let tempList = [...taskList];
    tempList[index] = obj;
    localStorage.setItem("taskList", JSON.stringify(tempList));
    setTaskList(tempList);
  };

  const toggle = () => {
    setModal(!modal);
  };

  const saveTask = (taskObj) => {
    let tempList = [...taskList];
    tempList.push(taskObj);
    localStorage.setItem("taskList", JSON.stringify(tempList));
    setTaskList(tempList);
    setModal(false);
  };

  return (
    <>
      <Container>
        <Box textAlign="center" my={2}>
          <Typography variant="h3">Todo List</Typography>
          <Button variant="contained" color="primary" onClick={() => setModal(true)}>
            Create Task
          </Button>
        </Box>
        <Box className="task-container" height="100vh" width="110vh">
          {taskList && taskList.map((obj, index) => (
            <Card key={index} taskObj={obj} index={index} deleteTask={deleteTask} updateListArray={updateListArray} />
          ))}
        </Box>
      </Container>
      {modal && <CreateTask toggle={toggle} modal={modal} save={saveTask} />}
    </>
  );
};

export default TodoList;
