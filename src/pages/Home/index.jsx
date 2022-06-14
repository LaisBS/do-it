import { Redirect, useHistory } from "react-router-dom";
import Button from "../../components/Button";
import { Container, Content } from "./style";
function Home({ autenticado }) {
  const history = useHistory();

  const handleNavigation = (path) => {
    return history.push(path);
  };
  if (autenticado) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Container>
      <Content>
        <h1>
          do<span>.</span>it
        </h1>
        <span>Organize-se de forma fácil e efetiva</span>
        <div>
          <Button onClick={() => handleNavigation("/singup")} whiteSchema>
            Cadastre-se
          </Button>
          <Button onClick={() => handleNavigation("/login")}>Login</Button>
        </div>
      </Content>
    </Container>
  );
}
export default Home;
