import React, { useState } from 'react';
import { Box, Card as MUICard, CardContent, Typography, IconButton } from '@mui/material';
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

  const toggle = () => {
    setModal(!modal);
  };

  const updateTask = (obj) => {
    updateListArray(obj, index);
  };

  const handleDelete = () => {
    deleteTask(index);
  };

  const category = taskObj.Category || "Others";
  const colors = categoryColors[category];

  return (
    <>
      <MUICard sx={{ maxWidth: 400, height:"35vh", width:"20vh", m: 2, position: 'relative', backgroundColor: colors.secondaryColor }}>
        <Box sx={{ height: 10, backgroundColor: colors.primaryColor }} />
        <CardContent>
          <Typography variant="h5" component="div" sx={{ backgroundColor: colors.secondaryColor, borderRadius: 1, p: 3 }}>
            {taskObj.Name}
          </Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            {taskObj.Description}
          </Typography>
          <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
            <IconButton onClick={() => setModal(true)} sx={{ color: colors.primaryColor }}>
              <Edit />
            </IconButton>
            <IconButton onClick={handleDelete} sx={{ color: colors.primaryColor }}>
              <Delete />
            </IconButton>
          </Box>
        </CardContent>
      </MUICard>
      <EditTask modal={modal} toggle={toggle} updateTask={updateTask} taskObj={taskObj} />
    </>
  );
};

export default Card;
