import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Spinner, Alert } from "react-bootstrap";
import api from "../services/api";

const APP_URL = "https://app.jotasweb.com.br";

function formatarMoeda(valor) {
  return Number(valor || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function PlanosSection() {
  const [planos, setPlanos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    api
      .get("/planos/ativos")
      .then((res) => setPlanos(res.data || []))
      .catch(() => setErro("Não foi possível carregar os planos. Tente novamente mais tarde."))
      .finally(() => setCarregando(false));
  }, []);

  const assinar = (codigoPlano) => {
    window.open(`${APP_URL}/meu-plano?plano=${codigoPlano}`, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="planos" className="py-5" style={{ backgroundColor: "var(--jw-bg-light)" }}>
      <Container>
        <h2 className="text-center fw-bold mb-2" style={{ color: "var(--jw-primary)" }}>
          Escolha o plano ideal para sua Casa de Apoio
        </h2>
        <p className="text-center mb-5" style={{ color: "var(--jw-text-muted)" }}>
          Sem taxa de adesão. Cancele quando quiser.
        </p>

        {carregando && (
          <div className="text-center">
            <Spinner animation="border" style={{ color: "var(--jw-primary)" }} />
          </div>
        )}

        {erro && <Alert variant="danger">{erro}</Alert>}

        {!carregando && !erro && (
          <Row className="g-4 justify-content-center">
            {planos.map((plano) => (
              <Col xs={12} md={6} lg={4} key={plano.codigo}>
                <Card className="h-100 shadow-sm border-0 text-center p-4">
                  <Card.Body className="d-flex flex-column">
                    <Card.Title
                      className="fw-bold mb-1"
                      style={{ color: "var(--jw-primary)", fontSize: "1.2rem" }}
                    >
                      {plano.nome}
                    </Card.Title>

                    <div className="mb-3">
                      <span className="fw-bold" style={{ fontSize: "1.8rem", color: "var(--jw-primary-dark)" }}>
                        {formatarMoeda(plano.valor)}
                      </span>
                      <span style={{ color: "var(--jw-text-muted)" }}>
                        {" "}/ {plano.periodicidade}
                      </span>
                    </div>

                    {plano.descricao && (
                      <Card.Text
                        className="flex-grow-1"
                        style={{ color: "var(--jw-text-muted)", fontSize: "0.92rem", whiteSpace: "pre-line" }}
                      >
                        {plano.descricao}
                      </Card.Text>
                    )}

                    <Button
                      variant="primary"
                      size="lg"
                      className="mt-3"
                      style={{ backgroundColor: "var(--jw-primary)", border: "none" }}
                      onClick={() => assinar(plano.codigo)}
                    >
                      Assinar este plano
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {!carregando && !erro && planos.length === 0 && (
          <p className="text-center" style={{ color: "var(--jw-text-muted)" }}>
            Nenhum plano disponível no momento.
          </p>
        )}
      </Container>
    </section>
  );
}

export default PlanosSection;
