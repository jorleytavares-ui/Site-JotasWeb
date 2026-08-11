import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <footer
      className="text-white py-4 mt-auto"
      style={{ backgroundColor: "var(--jw-primary-dark)" }}
    >
      <Container>
        <Row className="text-center text-md-start align-items-center g-3">
          <Col md={6}>
          <img src="/logo.png" alt="JotasWeb" height="32" className="mb-2" />

            <h6 className="fw-bold mb-1">JotasWeb</h6>
            <small style={{ color: "#cfe6e6" }}>
              Sistema de gestão para Casas de Apoio a Pacientes.
            </small>
          </Col>
          <Col md={6} className="text-md-end">
            <small className="d-block" style={{ color: "#cfe6e6" }}>
              contato@jotasweb.com.br
            </small>
            <small style={{ color: "#cfe6e6" }}>
              © {new Date().getFullYear()} JotasWeb. Todos os direitos reservados.
            </small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
