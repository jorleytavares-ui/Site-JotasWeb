import { Container, Row, Col, Card } from "react-bootstrap";

const passos = [
  { numero: "1", titulo: "Cadastre-se", desc: "Crie sua conta em minutos, sem burocracia." },
  { numero: "2", titulo: "Migre seus dados", desc: "Ajudamos a importar seus contratos e pacientes." },
  { numero: "3", titulo: "Organize tudo", desc: "Diárias, exames e transporte centralizados." },
  { numero: "4", titulo: "Feche o mês", desc: "Relatório automático, pronto para prestação de contas." },
];

function ComoFunciona() {
  return (
    <section className="py-5" style={{ backgroundColor: "var(--jw-bg-light)" }}>
      <Container>
        <h2 className="text-center fw-bold mb-5" style={{ color: "var(--jw-primary)" }}>
          Como funciona
        </h2>
        <Row className="g-4">
          {passos.map((p) => (
            <Col md={3} key={p.numero}>
              <Card className="h-100 border-0 shadow-sm text-center p-4">
                <div
                  className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    backgroundColor: "var(--jw-primary)",
                    color: "#fff",
                    fontWeight: 800,
                    fontSize: "1.3rem",
                  }}
                >
                  {p.numero}
                </div>
                <Card.Body>
                  <Card.Title className="fw-bold" style={{ color: "var(--jw-primary-dark)" }}>
                    {p.titulo}
                  </Card.Title>
                  <Card.Text style={{ color: "var(--jw-text-muted)", fontSize: "0.92rem" }}>
                    {p.desc}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default ComoFunciona;
