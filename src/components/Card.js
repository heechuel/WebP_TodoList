import React, { useState } from 'react';
import { Box, Card as MUICard, CardContent, Typography, IconButton, Checkbox } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import EditTask from '../modals/EditTask';

const categoryColors = {
  Work: { primaryColor: "#5D93E1", secondaryColor: "#ECF3FC" },
  Personal: { primaryColor: "#F9D288", secondaryColor: "#FEFAF1" },
  Shopping: { primaryColor: "#5DC250", secondaryColor: "#F2FAF1" },
  Fitness: { primaryColor: "#F48687", secondaryColor: "#FDF1F1" },
  Others: { primaryColor: "#B964F7", secondaryColor: "#F3F0FD" }
};

const Card = ({ taskObj, index, deleteTask, updateListArray }) => {
  const [modal, setModal] = useState(false);
  const [isCompleted, setIsCompleted] = useState(taskObj.isCompleted || false);

  const toggle = () => {
    setModal(!modal);
  };

  const updateTask = (obj) => {
    obj.isCompleted = isCompleted;
    updateListArray(obj, index);
  };

  const handleDelete = () => {
    deleteTask(index);
  };

  const handleCheckboxChange = (event) => {
    const completed = event.target.checked;
    setIsCompleted(completed);
    const updatedTask = { ...taskObj, isCompleted: completed };
    updateTask(updatedTask);
  };

  const category = taskObj.Category || "Others";
  const colors = categoryColors[category];

  return (
    <>
      <MUICard sx={{ maxWidth: 400, height: "35vh", width: "20vh", m: 2, position: 'relative', backgroundColor: colors.secondaryColor }}>
        <Box sx={{ height: 10, backgroundColor: colors.primaryColor }} />
        <CardContent>
          <Typography variant="h5" component="div" sx={{ backgroundColor: colors.secondaryColor, borderRadius: 1, p: 3, textDecoration: isCompleted ? 'line-through' : 'none' }}>
            {taskObj.Name}
          </Typography>
          <Typography variant="body2" sx={{ mt: 2, textDecoration: isCompleted ? 'line-through' : 'none' }}>
            {taskObj.Description}
          </Typography>
          <Typography variant="caption" display="block" sx={{ mt: 15, color: colors.primaryColor }}>
            {category}
          </Typography>
          <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
            <IconButton onClick={() => setModal(true)} sx={{ color: colors.primaryColor }}>
              <Edit />
            </IconButton>
            <IconButton onClick={handleDelete} sx={{ color: colors.primaryColor }}>
              <Delete />
            </IconButton>
          </Box>
          <Checkbox
            checked={isCompleted}
            onChange={handleCheckboxChange}
            sx={{ position: 'absolute', bottom: 16, right: 16, color: colors.primaryColor }}
          />
          {isCompleted && (
            <Typography variant="body2" sx={{ position: 'absolute', bottom: 16, left: 16, color: 'green' }}>
              완료됨
            </Typography>
          )}
        </CardContent>
      </MUICard>
      {modal && <EditTask modal={modal} toggle={toggle} updateTask={updateTask} taskObj={taskObj} />}
    </>
  );
};

export default Card;
