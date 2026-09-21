import { Container, Row, Col } from "react-bootstrap";

const problemas = [
  "Fechamento de mês demora dias e ainda sai com erro",
  "Paciente perde exame por falha na agenda",
  "Dificuldade de comprovar diárias para a prefeitura",
  "Logística de veículos organizada no boca a boca",
  "Risco de glosa por falta de documentação",
];

function OProblema() {
  return (
    <section className="py-5" style={{ backgroundColor: "#fff" }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={8} className="text-center">
            <h2 className="fw-bold mb-4" style={{ color: "var(--jw-primary)" }}>
              Você reconhece esses problemas?
            </h2>
            <ul className="list-unstyled text-start d-inline-block">
              {problemas.map((item, i) => (
                <li
                  key={i}
                  className="mb-3 d-flex align-items-start"
                  style={{ color: "var(--jw-text-muted)", fontSize: "1.05rem" }}
                >
                  <span className="me-2" style={{ color: "var(--jw-accent)" }}>✗</span>
                  {item}
                </li>
              ))}
            </ul>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default OProblema;
