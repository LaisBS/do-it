import { Container } from "./style";
function Button({ children, whiteSchema = false, ...rest }) {
  return (
    <Container whiteSchema={whiteSchema} type="button" {...rest}>
      {children}
    </Container>
  );
}
export default Button;
