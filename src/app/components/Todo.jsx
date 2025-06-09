"use client";
import React, { useContext } from "react";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { todoContext } from "@/context/TodoContext";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import TextField from "@mui/material/TextField";

function Todo({ todo }) {
  const { tasks, setTasks } = useContext(todoContext);
  function handleCheckClick() {
    const updatedTasks = tasks.map((t) =>
      t.id === todo.id ? { ...t, isCompleted: !t.isCompleted } : t
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }

  function handleDeleteClick(id) {
    const updatedTasks = tasks.filter((t) => t.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }

  function handleOpenDeleteDialog() {
    setOpenDelete(true);
  }
  function handleOpenEditDialog() {
    setOpenEdit(true);
  }

  const handleDeleteClose = () => {
    setOpenDelete(false);
  };
  const handleEditClose = () => {
    setOpenEdit(false);
  };

  function handleInputChange(e) {
    setUpdatedTask({ ...updatedTask, title: e.target.value });
  }

  function handleUpdateClick(id) {
    const newUpdatedTask = tasks.map((t) => {
      if (todo.id === t.id) {
        return { ...t, title: updatedTask.title };
      } else {
        return t;
      }
    });

    setTasks(newUpdatedTask);
    localStorage.setItem("tasks", JSON.stringify(newUpdatedTask));
    setOpenEdit(false);
  }
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [updatedTask, setUpdatedTask] = useState({ title: todo.title });
  return (
    <>
      <Dialog
        open={openEdit}
        onClose={handleEditClose}
        style={{ direction: "rtl" }}
        fullWidth
      >
        <DialogTitle style={{ fontSize: "30px" }}>تعديل المهمة</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="ادخل التعديل هنا"
            type="text"
            fullWidth
            variant="standard"
            value={updatedTask.title}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>اغلاق</Button>
          <Button onClick={() => handleUpdateClick(todo.id)} type="submit">
            اضافة
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        style={{ direction: "rtl" }}
        fullWidth
        open={openDelete}
        onClose={handleDeleteClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle sx={{ fontSize: "30px" }} id="responsive-dialog-title">
          {"هل انت متأكد من  حذف هذه المهمة؟ "}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontSize: "20px", color: "black" }}>
            اذا قمت بحذف هذه المهمة لا يمكنك استعادتها
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleDeleteClose}>
            غير موافق
          </Button>
          <Button onClick={() => handleDeleteClick(todo.id)} autoFocus>
            موافق
          </Button>
        </DialogActions>
      </Dialog>
      <Card
        className="card"
        sx={{
          marginBottom: "10px",
          backgroundColor: todo.isCompleted ? "#69f0ae" : "primary.main",
          borderRadius: "10px",
          color: todo.isCompleted ? "secondary.app" : "secondary.app",
          // background: "rgb(1, 1, 3)",
        }}
      >
        <CardContent
          sx={{
            // textDecoration: todo.isCompleted ? "line-through" : "none",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography style={{ fontSize: "23px" }} variant="h6">
            {todo.title}
          </Typography>

          <span style={{ display: "flex", gap: "10px" }}>
            <IconButton
              onClick={handleCheckClick}
              sx={{
                color: todo.isCompleted ? "white" : "green",
                background: todo.isCompleted ? "green" : "white",
                borderRadius: "50%",
                padding: "8px",
              }}
            >
              <CheckIcon />
            </IconButton>

            <IconButton
              onClick={() => handleOpenDeleteDialog()}
              sx={{
                color: "red",
                background: "white",
                borderRadius: "50%",
                padding: "8px",
              }}
            >
              <DeleteIcon />
            </IconButton>

            <IconButton
              onClick={handleOpenEditDialog}
              sx={{
                color: "blue",
                background: "white",
                borderRadius: "50%",
                padding: "8px",
              }}
            >
              <EditIcon />
            </IconButton>
          </span>
        </CardContent>
      </Card>
    </>
  );
}

export default Todo;
