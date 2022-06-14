import { Redirect, useHistory } from "react-router-dom";
import { Container, InputContainer, TaskContainer } from "./style";
import Input from "../../components/Input";
import { useForm } from "react-hook-form";
import { FiEdit2 } from "react-icons/fi";
import Button from "../../components/Button";
import Card from "../../components/Card";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";

function Dashboard({ autenticado, setAutenticado }) {
  const [tasks, setTasks] = useState([]);
  const [token] = useState(
    JSON.parse(localStorage.getItem("@Doit:token") || "")
  );
  const { register, handleSubmit } = useForm();
  const [date] = useState(new Date().toDateString());

  function loadTasks() {
    api
      .get("/task", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          completed: false,
        },
      })
      .then((response) => {
        const apiTasks = response.data.data.map((task) => ({
          ...task,
          createdAt: new Date(task.createdAt).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }),
        }));
        setTasks(apiTasks);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    loadTasks();
  }, []);

  const handleCompleted = (id) => {
    const newTask = tasks.filter((task) => task._id !== id);

    api
      .put(
        `/task/${id}`,
        { completed: true },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => setTasks(newTask));
  };
  const history = useHistory();
  function handleLogout() {
    localStorage.removeItem("@Doit:token");
    setAutenticado(false);
    return history.push("/login");
  }
  if (!autenticado) {
    return <Redirect to="/login" />;
  }

  const onSubmit = ({ task }) => {
    if (!task) {
      return toast.error("Complete o campo para enviar uma tarefa");
    }
    api
      .post(
        "/task",
        {
          description: task,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => loadTasks());
  };

  return (
    <Container>
      <InputContainer onSubmit={handleSubmit(onSubmit)}>
        <time>{date}</time>
        <section>
          <Input
            icon={FiEdit2}
            placeholder="Nova tarefa"
            register={register}
            name="task"
            error=""
          />
          <Button type="submit">Adicionar</Button>
          <Button whiteSchema onClick={() => handleLogout()}>
            Logout
          </Button>
        </section>
      </InputContainer>
      <TaskContainer>
        {tasks.map((elem) => (
          <Card
            key={elem._id}
            title={elem.description}
            date={elem.createdAt}
            onClick={() => handleCompleted(elem._id)}
          />
        ))}
      </TaskContainer>
    </Container>
  );
}
export default Dashboard;
