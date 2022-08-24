import React, {useState} from "react";
import {v4 as uuidv4} from 'uuid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import image from "./1.png"

const label = {inputProps: {'aria-label': 'Checkbox demo'}};

function TodoApp() {
  const [task, setTask] = useState("");
  const [editId, setEditID] = useState(null);
  const [editText, setEditText] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [open, setOpen] = React.useState(false)

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = e => setTask(e.target.value);

  const handleSearch =  e => e.key === 'Enter' && AddTask()

  const AddTask = () => {
    if (task !== "") {
      const taskDetails = {
        id: uuidv4(),
        value: task,
        isCompleted: false,
      }
      setTaskList(prevState => {
        return [...prevState, taskDetails]
      });

      setTask('')
    }
  };

  const editTask = (e, id) => {
    setOpen(true);

    const element = taskList.find(elm => elm.id === id)
    setEditText(element.value)
    setEditID(id)
  }

  const handleEditSubmit = () => {
    const newTaskList = taskList.map(element => {
      if (element.id === editId) {
        return {...element, value: editText}
      }
      return element
    })

    setTaskList(newTaskList);
    setOpen(false)
  }

  const deleteTask = (e, id) => {
    e.preventDefault();
    setTaskList(taskList.filter((t) => t.id !== id));
  };

  const taskCompleted = (e, id) => {
    e.preventDefault();

    const newTaskList = taskList.map(element => {
      if (element.id === id) {
        return {...element, isCompleted: !element.isCompleted}
      }
      return element
    })

    setTaskList(newTaskList);
  };

  return (
    <div className="container">
      <img className="img" src={image} alt="1"  width={600} />
      <div className="todo">

        <Stack direction="row" spacing={2} sx={{ justifyContent: 'center' }}>
          <Box
            sx={{
              width: 500,
              height: 40,
              maxWidth: '100%',
            }}
          >
            <TextField
              variant={"standard"}
              value={task}
              fullWidth
              label="افزودن مورد جدید . . ."
              id="fullWidth"
              onChange={(e) => handleChange(e)}
              onKeyPress={(e) => handleSearch(e)}

            />
          </Box>
          <Button variant="contained" onClick={AddTask}>
            افزودن
          </Button>
        </Stack>
        <br/><br/><br/>

        {taskList !== [] ? (
          <ul className="todo-list">
            {taskList.map((t) => {
              const cls = t.isCompleted ? "todo-list-completed-text" : ""

              return (
                <li className={t.isCompleted ? "crossText" : "listItem"}>
                  <Paper variant="outlined" sx={{marginBottom: 2}}>
                    <Stack direction="row" justifyContent="space-between">
                      <div>
                        <Checkbox checked={t.isCompleted} className="completed"
                                  onClick={e => taskCompleted(e, t.id)} {...label}  />
                        <span className={cls}>
                        {t.value}
                      </span>
                      </div>
                      <div>
                        <IconButton className="edit" onClick={e => editTask(e, t.id)} aria-label="delete">
                          <EditIcon/>
                        </IconButton>
                        <IconButton className="delete" onClick={e => deleteTask(e, t.id)} aria-label="delete">
                          <DeleteIcon/>
                        </IconButton>
                      </div>
                    </Stack>
                  </Paper>
                </li>
              )
            })}
          </ul>
        ) : null}

      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
      >
        <DialogContent>
          <br/>
          <TextField
            variant={"outlined"}
            fullWidth
            label="ویرایش آیتم"
            id="fullWidth"
            value={editText}
            onChange={e => setEditText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>منصرف شدم</Button>
          <Button onClick={handleEditSubmit}>ثبت</Button>
        </DialogActions>
      </Dialog>

    </div>
  )
}

export default TodoApp;