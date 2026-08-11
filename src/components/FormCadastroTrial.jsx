import { useState, useEffect } from "react";
import { Container, Form, Button, Alert, Spinner, Row, Col } from "react-bootstrap";
import api from "../services/api";
import ContatoForm from "./ContatoForm";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ESTADOS = [
  "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG",
  "PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"
];

const CAMPOS_SEM_UPPERCASE = ["email", "estado", "codigo_cidade", "codigo_bairro"];

function formatarCnpj(valor) {
  return valor.replace(/\D/g, "").slice(0, 14);
}

function formatarTelefone(valor) {
  const digitos = valor.replace(/\D/g, "").slice(0, 11);
  if (digitos.length <= 10) {
    return digitos.replace(/(\d{2})(\d{4})(\d{0,4})/, (_, a, b, c) =>
      c ? `(${a}) ${b}-${c}` : b ? `(${a}) ${b}` : a ? `(${a}` : ""
    );
  }
  return digitos.replace(/(\d{2})(\d{5})(\d{0,4})/, (_, a, b, c) =>
    c ? `(${a}) ${b}-${c}` : b ? `(${a}) ${b}` : a ? `(${a}` : ""
  );
}

function validarCnpj(cnpj) {
  const c = cnpj.replace(/\D/g, "");
  if (c.length !== 14) return false;
  if (/^(\d)\1{13}$/.test(c)) return false;

  const calcDigito = (base, pesos) => {
    const soma = base
      .split("")
      .reduce((acc, num, i) => acc + parseInt(num) * pesos[i], 0);
    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  };

  const pesos1 = [5,4,3,2,9,8,7,6,5,4,3,2];
  const pesos2 = [6,5,4,3,2,9,8,7,6,5,4,3,2];

  const d1 = calcDigito(c.slice(0, 12), pesos1);
  const d2 = calcDigito(c.slice(0, 12) + d1, pesos2);

  return c.slice(12) === `${d1}${d2}`;
}

// NOVO: recebe callback opcional para avisar o pai sobre duplicidade
function FormCadastroTrial({ onStatusChange }) {
  const [emailValido, setEmailValido] = useState(true);
  const [cnpjValido, setCnpjValido] = useState(true);
  const [form, setForm] = useState({
    nomeEmpresa: "",
    cnpj: "",
    nomeResponsavel: "",
    email: "",
    telefone: "",
    endereco: "",
    estado: "",
    codigo_cidade: "",
    codigo_bairro: "",
  });

  const [cidades, setCidades] = useState([]);
  const [bairros, setBairros] = useState([]);
  const [loadingCidades, setLoadingCidades] = useState(false);
  const [loadingBairros, setLoadingBairros] = useState(false);
  const [erroLocalizacao, setErroLocalizacao] = useState(null);

  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState(null);
  const [erro, setErro] = useState(null);

  const [jaExiste, setJaExiste] = useState(false);
  const [cadastroConcluido, setCadastroConcluido] = useState(false);

  // Avisa o componente pai sempre que o status de duplicidade mudar
  useEffect(() => {
    if (onStatusChange) onStatusChange(jaExiste);
  }, [jaExiste, onStatusChange]);

  function handleChange(e) {
    const { name, value } = e.target;
    let valorFormatado = value;

    if (name === "cnpj") {
      valorFormatado = formatarCnpj(value);
      setCnpjValido(valorFormatado === "" || validarCnpj(valorFormatado));
    } else if (name === "telefone") {
      valorFormatado = formatarTelefone(value);
    } else if (!CAMPOS_SEM_UPPERCASE.includes(name)) {
      valorFormatado = value.toUpperCase();
    }

    if (name === "email") {
      setEmailValido(value === "" || emailRegex.test(value));
    }

    setForm((prev) => ({ ...prev, [name]: valorFormatado }));
  }

  function handleEstadoChange(e) {
    const uf = e.target.value;
    setForm((prev) => ({ ...prev, estado: uf, codigo_cidade: "", codigo_bairro: "" }));
    setCidades([]);
    setBairros([]);
    setErroLocalizacao(null);
  }

  function handleCidadeChange(e) {
    const codigoCidade = e.target.value;
    setForm((prev) => ({ ...prev, codigo_cidade: codigoCidade, codigo_bairro: "" }));
    setErroLocalizacao(null);
  }

  useEffect(() => {
    if (!form.estado) return;

    async function buscarCidades() {
      setLoadingCidades(true);
      setErroLocalizacao(null);
      try {
        const response = await api.get(`/trial/cidades`, { params: { uf: form.estado } });
        setCidades(response.data || []);
      } catch (err) {
        setCidades([]);
        setErroLocalizacao("Não foi possível carregar as cidades. Tente novamente.");
      } finally {
        setLoadingCidades(false);
      }
    }
    buscarCidades();
  }, [form.estado]);

  useEffect(() => {
    if (!form.codigo_cidade) return;
    async function buscarBairros() {
      setLoadingBairros(true);
      setErroLocalizacao(null);
      try {
        const response = await api.get(`/trial/bairros`, { params: { codigo_cidade: form.codigo_cidade } });
        setBairros(response.data || []);
      } catch (err) {
        setBairros([]);
        setErroLocalizacao("Não foi possível carregar os bairros. Tente novamente.");
      } finally {
        setLoadingBairros(false);
      }
    }
    buscarBairros();
  }, [form.codigo_cidade]);

  useEffect(() => {
    if (erro) {
      const el = document.getElementById("cadastro-trial");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [erro]);

  useEffect(() => {
    if (mensagem || erro || jaExiste) {
      document.getElementById("cadastro-trial")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [mensagem, erro, jaExiste]);

  async function handleSubmit(e) {
    e.preventDefault();
    setErro(null);
    setMensagem(null);

    if (!emailRegex.test(form.email)) {
      setEmailValido(false);
      setErro("Informe um e-mail válido.");
      return;
    }

    if (!validarCnpj(form.cnpj)) {
      setCnpjValido(false);
      setErro("Informe um CNPJ válido.");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/trial/cadastrar", form);
      setMensagem(
        response.data.mensagem ||
          "Cadastro realizado! Verifique seu e-mail para acessar o app."
      );

      setForm({
        nomeEmpresa: "",
        cnpj: "",
        nomeResponsavel: "",
        email: "",
        telefone: "",
        endereco: "",
        estado: "",
        codigo_cidade: "",
        codigo_bairro: "",
      });
      setCidades([]);
      setBairros([]);
      setCadastroConcluido(true);
    } catch (err) {
      const status = err.response?.status;
      const mensagemErro = err.response?.data?.erro;

      if (status === 409) {
        setJaExiste(true);
      } else {
        setErro(mensagemErro || "Erro ao processar cadastro. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="cadastro-trial" className="py-5">
      <Container style={{ maxWidth: "600px" }}>
        <h2 className="text-center fw-bold mb-2">Comece seu Teste Gratuito</h2>
        <p className="text-center text-muted mb-4">5 dias grátis, sem necessidade de cartão de crédito.</p>
        {mensagem && <Alert variant="success">{mensagem}</Alert>}
        {erro && <Alert variant="danger">{erro}</Alert>}
        {erroLocalizacao && <Alert variant="warning">{erroLocalizacao}</Alert>}
        {jaExiste && <ContatoForm variante="duplicado" />}
        {!jaExiste && !cadastroConcluido && (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nome da Empresa *</Form.Label>
              <Form.Control type="text" name="nomeEmpresa" value={form.nomeEmpresa} onChange={handleChange} required maxLength={80} style={{ textTransform: "uppercase" }} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>CNPJ *</Form.Label>
              <Form.Control type="text" name="cnpj" value={form.cnpj} onChange={handleChange} required placeholder="Somente números" maxLength={14} isInvalid={!cnpjValido} />
              <Form.Control.Feedback type="invalid">CNPJ inválido.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nome do Responsável *</Form.Label>
              <Form.Control type="text" name="nomeResponsavel" value={form.nomeResponsavel} onChange={handleChange} required maxLength={80} style={{ textTransform: "uppercase" }} />
            </Form.Group>
            <Row>
              <Col md={7}>
                <Form.Group className="mb-3">
                  <Form.Label>E-mail *</Form.Label>
                  <Form.Control type="email" name="email" value={form.email} onChange={handleChange} required maxLength={80} isInvalid={!emailValido} />
                  <Form.Control.Feedback type="invalid">Digite um e-mail válido.</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={5}>
                <Form.Group className="mb-3">
                  <Form.Label>Telefone/WhatsApp</Form.Label>
                  <Form.Control type="text" name="telefone" value={form.telefone} onChange={handleChange} maxLength={15} placeholder="(00) 00000-0000" />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Endereço</Form.Label>
              <Form.Control type="text" name="endereco" value={form.endereco} onChange={handleChange} maxLength={100} placeholder="Rua, número, complemento" style={{ textTransform: "uppercase" }} />
            </Form.Group>
            <Row>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Estado *</Form.Label>
                  <Form.Select name="estado" value={form.estado} onChange={handleEstadoChange} required>
                    <option value="">UF</option>
                    {ESTADOS.map((uf) => (
                      <option key={uf} value={uf}>{uf}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={5}>
                <Form.Group className="mb-3">
                  <Form.Label>Cidade *</Form.Label>
                  <Form.Select name="codigo_cidade" value={form.codigo_cidade} onChange={handleCidadeChange} required disabled={!form.estado || loadingCidades}>
                    <option value="">{loadingCidades ? "Carregando..." : "Selecione"}</option>
                    {cidades.map((c) => (
                      <option key={c.codigo} value={c.codigo}>{c.nomecidade}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Bairro</Form.Label>
                  <Form.Select name="codigo_bairro" value={form.codigo_bairro} onChange={handleChange} disabled={!form.codigo_cidade || loadingBairros}>
                    <option value="">{loadingBairros ? "Carregando..." : "Selecione"}</option>
                    {bairros.map((b) => (
                      <option key={b.codigo} value={b.codigo}>{b.nomebairro}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Button type="submit" variant="primary" size="lg" className="w-100" disabled={loading}>
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Processando...
                </>
              ) : (
                "Criar Conta Teste"
              )}
            </Button>
          </Form>
        )}
      </Container>
    </section>
  );
}

export default FormCadastroTrial;
