import { Container, Row, Col } from "react-bootstrap";
import { FaLock, FaCloud, FaHeadset } from "react-icons/fa";

const itens = [
  { icone: <FaLock size={28} />, titulo: "Dados protegidos", desc: "Conformidade com a LGPD e backup automático na nuvem." },
  { icone: <FaCloud size={28} />, titulo: "Acesso na Nuvem", desc: "Acesse de qualquer lugar, com segurança, 24h por dia." },
  { icone: <FaHeadset size={28} />, titulo: "Suporte real", desc: "Atendimento direto por WhatsApp, sem burocracia." },
];

function Seguranca() {
  return (
    <section className="py-5" style={{ backgroundColor: "#fff" }}>
      <Container>
        <h2 className="text-center fw-bold mb-5" style={{ color: "var(--jw-primary)" }}>
          Segurança e confiança
        </h2>
        <Row className="g-4 justify-content-center">
          {itens.map((item, i) => (
            <Col md={4} key={i} className="text-center">
              <div className="mb-3" style={{ color: "var(--jw-primary)" }}>{item.icone}</div>
              <h5 className="fw-bold" style={{ color: "var(--jw-primary-dark)" }}>{item.titulo}</h5>
              <p style={{ color: "var(--jw-text-muted)" }}>{item.desc}</p>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default Seguranca;
