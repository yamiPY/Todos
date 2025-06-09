"use client";
import { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";
import Todo from "./Todo";
import { todoContext } from "@/context/TodoContext";
import { useEffect } from "react";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import Scrollbar from "smooth-scrollbar";

function Todos() {
  const { tasks, setTasks } = useContext(todoContext);
  const [inputValue, setInputValue] = useState("");
  const [toggleCategory, setToggleCategory] = useState("all");

  const completedTasks = tasks.filter((t) => {
    return t.isCompleted;
  });
  const notCompletedTasks = tasks.filter((t) => {
    return t.isCompleted != true;
  });

  let renderedTasks = tasks;

  if (toggleCategory == "notDone") {
    renderedTasks = notCompletedTasks;
  } else if (toggleCategory == "done") {
    renderedTasks = completedTasks;
  } else {
    renderedTasks = tasks;
  }

  function handleInputChange(e) {
    setInputValue(e.target.value);
  }

  function handleClick() {
    if (!inputValue.trim()) return;

    const newTask = {
      id: uuidv4(),
      title: inputValue.trim(),
      isCompleted: false,
    };

    const myTasks = [...tasks, newTask];
    setTasks(myTasks);
    localStorage.setItem("tasks", JSON.stringify(myTasks));

    setInputValue("");
  }
  useEffect(() => {
    const storageTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storageTasks) {
      setTasks(storageTasks);
    } else {
      setTasks([
        {
          id: uuidv4(),
          title: "مراجعة البريد الإلكتروني المهني",
          isCompleted: false,
        },
        {
          id: uuidv4(),
          title: "كتابة تقرير أسبوعي عن التقدم في العمل",
          isCompleted: false,
        },
        {
          id: uuidv4(),
          title: "تحضير عرض تقديمي لاجتماع الغد",
          isCompleted: false,
        },
        {
          id: uuidv4(),
          title: "تنظيم الملفات في مجلدات العمل",
          isCompleted: false,
        },
        {
          id: uuidv4(),
          title: "متابعة العميل بشأن مشروع التصميم",
          isCompleted: false,
        },
        {
          id: uuidv4(),
          title: "مراجعة مهام الفريق والتأكد من الإنجاز",
          isCompleted: false,
        },
      ]);
    }
  }, []);

  function changeToggleCategory(e) {
    setToggleCategory(e.target.value);
  }

  return (
    <Container
      maxWidth="sm"
      style={{
        borderRadius: "20px",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          width: "100%",
          borderRadius: "20px",
        }}
      >
        <CardContent
          className="scroll"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h1">مهامي</Typography>
          <ToggleButtonGroup
            color="primary"
            exclusive
            value={toggleCategory}
            onChange={changeToggleCategory}
            size="small"
          >
            <ToggleButton
              sx={{ fontSize: "17px", fontWeight: "bold" }}
              value="all"
              key="left"
            >
              الكل
            </ToggleButton>

            <ToggleButton
              sx={{ fontSize: "17px", fontWeight: "bold" }}
              value="done"
            >
              المنجز
            </ToggleButton>

            <ToggleButton
              sx={{ fontSize: "17px", fontWeight: "bold" }}
              value="notDone"
              key="right"
            >
              غير المنجز
            </ToggleButton>
          </ToggleButtonGroup>

          <CardContent
            sx={{
              width: "100%",
              paddingRight: "10px",
              overflow: "scroll",
              scrollbarWidth: "none",
              maxHeight: "60vh",
            }}
          >
            {renderedTasks.map((t) => (
              <Todo key={t.id} todo={t} />
            ))}
          </CardContent>

          <Box sx={{ width: "100%", display: "flex", gap: 2, mt: 3 }}>
            <TextField
              color="primary"
              fullWidth
              label="إضافة مهمة"
              variant="outlined"
              value={inputValue}
              onChange={handleInputChange}
            />
            <Button
              disabled={inputValue <= 3}
              color="primary"
              variant="contained"
              onClick={handleClick}
            >
              إضافة
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Todos;
