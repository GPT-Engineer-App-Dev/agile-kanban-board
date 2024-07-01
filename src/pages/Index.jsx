import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function Index() {
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: [],
  });

  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks((prevTasks) => ({
      ...prevTasks,
      todo: [...prevTasks.todo, newTask],
    }));
    setNewTask("");
  };

  const moveTask = (task, from, to) => {
    setTasks((prevTasks) => {
      const fromTasks = prevTasks[from].filter((t) => t !== task);
      const toTasks = [...prevTasks[to], task];
      return {
        ...prevTasks,
        [from]: fromTasks,
        [to]: toTasks,
      };
    });
  };

  return (
    <main className="flex flex-1 p-4 space-x-4">
      <div className="w-1/3">
        <Card>
          <CardHeader>
            <CardTitle>To Do</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {tasks.todo.map((task, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span>{task}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => moveTask(task, "todo", "inProgress")}
                  >
                    In Progress
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="w-1/3">
        <Card>
          <CardHeader>
            <CardTitle>In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {tasks.inProgress.map((task, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span>{task}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => moveTask(task, "inProgress", "done")}
                  >
                    Done
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="w-1/3">
        <Card>
          <CardHeader>
            <CardTitle>Done</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {tasks.done.map((task, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span>{task}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="fixed bottom-4 right-4">
        <Card>
          <CardHeader>
            <CardTitle>Add Task</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <Input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="New Task"
              />
              <Button onClick={addTask}>Add</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

export default Index;