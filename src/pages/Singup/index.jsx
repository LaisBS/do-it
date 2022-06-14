import { Link, Redirect, useHistory } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { Background, Container, Content, AnimationContainer } from "./styles";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../services/api";
import { toast } from "react-toastify";

function Singup({ autenticado }) {
  const schema = yup.object().shape({
    name: yup.string().required("Campo obrigatorio!"),
    email: yup.string().email("Email invalido").required("Campo obrigatorio!"),
    password: yup
      .string()
      .min(8, "Minimo de 8 digitos")
      .required("Campo obrigatorio!"),
    confirmacaoSenha: yup
      .string()
      .oneOf([yup.ref("password")], "Senhas são diferentes")
      .required("Campo obrigatorio!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const history = useHistory();

  const onSubmitFunction = ({ name, email, password }) => {
    const user = { name, email, password };
    api
      .post("/user/register", user)
      .then((_) => {
        toast.success("Sucesso ao criar a conta");
        return history.push("/login");
      })
      .catch((err) => toast.error("Erro ao criar a conta, tente outro email"));
  };
  if (autenticado) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <form onSubmit={handleSubmit(onSubmitFunction)}>
            <h1>Cadastro</h1>
            <Input
              icon={FiUser}
              label="Nome"
              placeholder="Seu nome"
              name="name"
              register={register}
              error={errors.name?.message}
            />
            <Input
              register={register}
              icon={FiMail}
              label="Email"
              placeholder="Seu melhor e-mail"
              name="email"
              error={errors.email?.message}
            />
            <Input
              icon={FiLock}
              label="Senha"
              placeholder="Uma senha bem segura"
              type="password"
              name="password"
              register={register}
              error={errors.password?.message}
            />
            <Input
              icon={FiLock}
              label="Confirmação da senha"
              placeholder="Confirmação da senha"
              type="password"
              name="confirmacaoSenha"
              register={register}
              error={errors.confirmacaoSenha?.message}
            />
            <Button type="submit">Enviar</Button>
            <p>
              Já tem uma conta? Faça o seu <Link to="/login">Login</Link>
            </p>
          </form>
        </AnimationContainer>
      </Content>
    </Container>
  );
}

export default Singup;
