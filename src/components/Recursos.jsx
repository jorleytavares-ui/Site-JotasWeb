import { Container, Row, Col, Card } from "react-bootstrap";

const recursos = [
  {
    titulo: "Gestão de Internação",
    descricao: "Controle completo de entrada, saída e diárias dos pacientes hospedados.",
    icone: "🏠",
  },
  {
    titulo: "Transporte de Pacientes",
    descricao: "Agenda de motoristas e veículos para levar e buscar pacientes em clínicas e hospitais.",
    icone: "🚐",
  },
  {
    titulo: "Agenda de Exames e Cirurgias",
    descricao: "Organize consultas, exames clínicos e procedimentos cirúrgicos sem perder nenhum compromisso.",
    icone: "📋",
  },
  {
    titulo: "Parcerias com Prefeituras",
    descricao: "Gestão de convênios municipais e relatórios de faturamento por diárias.",
    icone: "🤝",
  },
  {
    titulo: "Relatórios Gerenciais",
    descricao: "Fechamentos, serviços extras e relatórios completos para prestação de contas.",
    icone: "📊",
  },
  {
    titulo: "Acesso na Nuvem",
    descricao: "Acesse de qualquer lugar, com segurança, a qualquer hora do dia.",
    icone: "☁️",
  },
];

function Recursos() {
  return (
    <section id="recursos" className="py-5" style={{ backgroundColor: "var(--jw-bg-light)" }}>

      <Container>
        <h2 className="text-center fw-bold mb-2">Feito para Casas de Apoio</h2>
        <p className="text-center mb-5" style={{ color: "var(--jw-text-muted)" }}>
          Tudo que você precisa para gerenciar pacientes, transporte e parcerias em um só lugar.
        </p>
        <Row className="g-4">
          {recursos.map((item, index) => (
            <Col md={4} key={index}>
              <Card className="h-100 text-center shadow-sm border-0 p-4">
                <div style={{ fontSize: "2.5rem" }}>{item.icone}</div>
                <Card.Body>
                  <Card.Title className="fw-bold" style={{ color: "var(--jw-primary)" }}>
                    {item.titulo}
                  </Card.Title>
                  <Card.Text style={{ color: "var(--jw-text-muted)" }}>{item.descricao}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default Recursos;
