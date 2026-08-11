import { Card, Row, Col } from "react-bootstrap";
import { FaWhatsapp, FaEnvelope, FaPhone } from "react-icons/fa";

const TELEFONE = "(62) 98346-4537";
const TELEFONE_WHATSAPP = "5562983464537";
const EMAIL_CONTATO = "contato@jotasweb.com.br";

function ContatoForm({ variante = "padrao" }) {
  const textos = {
    padrao: {
      titulo: "Fale com a nossa equipe",
      descricao: "Tire suas dúvidas, solicite uma demonstração ou saiba mais sobre o JotasWeb.",
    },
    duplicado: {
      titulo: "Já somos parceiros!",
      descricao:
        "Identificamos que sua empresa (ou e-mail) já possui cadastro em nosso sistema. Fale com a nossa equipe para regularizar seu acesso.",
    },
  };

  const { titulo, descricao } = textos[variante] || textos.padrao;

  return (
    <Card className="p-4 shadow-sm border-0" style={{ backgroundColor: "var(--jw-bg-light)" }}>
      <Card.Body className="text-center">
        <h4 className="fw-bold mb-3" style={{ color: "var(--jw-primary)" }}>{titulo}</h4>
        <p className="mb-4" style={{ color: "var(--jw-text-muted)" }}>{descricao}</p>

        <Row className="justify-content-center gy-3">
          <Col xs={12} md={4}>
            <div className="d-flex flex-column align-items-center">
              <FaEnvelope size={24} className="mb-2" style={{ color: "var(--jw-primary)" }} />
              <a href={`mailto:${EMAIL_CONTATO}`} style={{ color: "var(--jw-primary-dark)" }}>
                {EMAIL_CONTATO}
              </a>
            </div>
          </Col>
          <Col xs={12} md={4}>
            <div className="d-flex flex-column align-items-center">
              <FaPhone size={24} className="mb-2" style={{ color: "var(--jw-primary)" }} />
              <a href={`tel:+55${TELEFONE_WHATSAPP}`} style={{ color: "var(--jw-primary-dark)" }}>
                {TELEFONE}
              </a>
            </div>
          </Col>
          <Col xs={12} md={4}>
            <div className="d-flex flex-column align-items-center">
              <FaWhatsapp size={24} className="mb-2" style={{ color: "var(--jw-accent)" }} />
              <a
                href={`https://wa.me/${TELEFONE_WHATSAPP}`}
                target="_blank"
                rel="noopener noreferrer"
                className="fw-semibold"
                style={{ color: "var(--jw-accent)" }}
              >
                Conversar no WhatsApp
              </a>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default ContatoForm;
