"use client";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { red } from "@mui/material/colors";

import { v4 as uuidv4 } from "uuid";
import Todos from "./components/Todos";
import { todoContext } from "@/context/TodoContext";
import Dialog from "./components/ResponsiveDialog";
export default function App() {
  const [tasks, setTasks] = useState([]);
  const theme = createTheme({
    palette: {
      primary: {
        main: "#4fc3f7",
      },
      secondary: {
        main: "#ede7f6",
        app : "#212121"
      },
    },
  });
  return (
    <div>
      <ThemeProvider theme={theme}>
        <todoContext.Provider value={{ tasks, setTasks }}>
          <div className="App">
            <Todos />
          </div>
        </todoContext.Provider>
      </ThemeProvider>
    </div>
  );
}
