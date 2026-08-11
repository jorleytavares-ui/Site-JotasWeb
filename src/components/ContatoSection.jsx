import { Container } from "react-bootstrap";
import ContatoForm from "./ContatoForm";

// NOVO: prop "esconder" para não duplicar quando o trial já mostrou o contato
function ContatoSection({ esconder = false }) {
  if (esconder) return null;

  return (
    <section id="contato" className="py-5">
      <Container style={{ maxWidth: "600px" }}>
        <ContatoForm variante="padrao" />
      </Container>
    </section>
  );
}

export default ContatoSection;
