import { Container, Button } from "react-bootstrap";

function Hero({ onIniciarTrial }) {
  const scrollToForm = () => {
    onIniciarTrial();
    setTimeout(() => {
      document.getElementById("cadastro-trial")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const scrollToContato = () => {
    document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="text-white py-5"
      style={{ background: "linear-gradient(135deg, var(--jw-primary), var(--jw-primary-dark))" }}
    >
      <Container className="text-center py-5">
        <h1 className="fw-bold display-5 mb-3">
          Sistema para Casa de Apoio a Pacientes
        </h1>
        <p className="lead mb-4">
          Gestão completa de hospedagem, transporte, exames e diárias de{" "}
          <strong>Tratamento Fora do Domicílio (TFD)</strong>. Organize contratos com
          prefeituras e feche o mês em minutos. Teste grátis por 5 dias, sem compromisso.
        </p>
        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <Button
            size="lg"
            style={{ backgroundColor: "var(--jw-accent)", border: "none", color: "#1c2b2b", fontWeight: 600 }}
            onClick={scrollToForm}
          >
            Começar Teste Gratuito
          </Button>
          <Button variant="outline-light" size="lg" onClick={scrollToContato}>
            Fale com a gente
          </Button>
        </div>
      </Container>
    </section>
  );
}

export default Hero;
