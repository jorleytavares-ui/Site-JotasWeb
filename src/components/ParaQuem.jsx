// ParaQuem.jsx (SEO otimizado)
import { Container, Row, Col, Card } from "react-bootstrap";

const pilares = [
  {
    icone: "🏠",
    titulo: "Hospedagem de Pacientes",
    descricao:
      "Controle de entrada, saída e diárias dos pacientes que chegam de outras cidades para tratamento (TFD).",
  },
  {
    icone: "🚐",
    titulo: "Transporte de Pacientes",
    descricao:
      "Agenda de motoristas e veículos para levar e buscar pacientes em clínicas, hospitais e laboratórios.",
  },
  {
    icone: "🩺",
    titulo: "Exames e Cirurgias",
    descricao:
      "Vínculo com médicos e clínicas para organizar exames, consultas e procedimentos cirúrgicos.",
  },
  {
    icone: "🏛️",
    titulo: "Parcerias com Prefeituras",
    descricao:
      "Gestão de convênios municipais e fechamento mensal de diárias para prestação de contas.",
  },
];

function ParaQuem() {
  return (
    <section id="para-quem" className="py-5">
      <Container>
        <Row className="align-items-center mb-5">
          <Col md={12} className="text-center">
            <h2 className="fw-bold mb-3" style={{ color: "var(--jw-primary)" }}>
              Software de Gestão para Casas de Apoio a Pacientes
            </h2>
            <p
              className="mx-auto"
              style={{ color: "var(--jw-text-muted)", maxWidth: "700px" }}
            >
              O JotasWeb é o sistema ideal para <strong>casas de apoio a pacientes</strong> que
              atendem <strong>Tratamento Fora do Domicílio (TFD)</strong>. Organize o
              recebimento de pacientes, transporte para consultas e exames, controle de
              diárias e parcerias firmadas com prefeituras — tudo em um só lugar.
            </p>
          </Col>
        </Row>

        <Row className="g-4">
          {pilares.map((item, index) => (
            <Col md={6} lg={3} key={index}>
              <Card
                className="h-100 border-0 shadow-sm text-center p-4"
                style={{ backgroundColor: "var(--jw-bg-light)" }}
              >
                <div style={{ fontSize: "2.8rem" }}>{item.icone}</div>
                <Card.Body>
                  <Card.Title
                    className="fw-bold mb-2"
                    style={{ color: "var(--jw-primary-dark)", fontSize: "1.05rem" }}
                  >
                    {item.titulo}
                  </Card.Title>
                  <Card.Text style={{ color: "var(--jw-text-muted)", fontSize: "0.92rem" }}>
                    {item.descricao}
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

export default ParaQuem;
