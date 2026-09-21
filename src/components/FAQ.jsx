import { Container, Accordion } from "react-bootstrap";

const perguntas = [
  { q: "Preciso trocar minha planilha atual?", a: "Não. Ajudamos você a migrar seus dados da planilha atual sem custo adicional." },
  { q: "Funciona para casas pequenas?", a: "Sim, temos planos escaláveis conforme o tamanho da sua casa de apoio." },
  { q: "Serve para contrato com prefeitura e particular?", a: "Sim, os dois modelos são gerenciados no mesmo sistema." },
  { q: "Preciso de cartão de crédito para testar?", a: "Não. O teste gratuito de 5 dias não exige cartão de crédito." },
];

function FAQ() {
  return (
    <section className="py-5" style={{ backgroundColor: "var(--jw-bg-light)" }}>
      <Container style={{ maxWidth: "700px" }}>
        <h2 className="text-center fw-bold mb-5" style={{ color: "var(--jw-primary)" }}>
          Perguntas frequentes
        </h2>
        <Accordion>
          {perguntas.map((item, i) => (
            <Accordion.Item eventKey={String(i)} key={i}>
              <Accordion.Header>{item.q}</Accordion.Header>
              <Accordion.Body style={{ color: "var(--jw-text-muted)" }}>{item.a}</Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </Container>
    </section>
  );
}

export default FAQ;
