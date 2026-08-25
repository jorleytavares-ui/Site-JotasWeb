// src/components/Navbar.jsx
import { useState } from "react";
import { Navbar as BsNavbar, Nav, Container, Button } from "react-bootstrap";

export default function Navbar() {
  const [expanded, setExpanded] = useState(false);

  return (
    <BsNavbar
      expand="md"
      className="shadow-sm sticky-top"
      style={{ backgroundColor: "#fff" }}
      expanded={expanded}
      onToggle={(val) => setExpanded(val)}
    >
      <Container>
        <BsNavbar.Brand href="/" className="d-flex align-items-center gap-2">
  <img src="/logo.png" alt="JotasWeb" className="logo-hero" style={{ height: "50px" }}/>
  <span style={{ fontWeight: "bold", color: "var(--jw-primary)" }}>JotasWeb</span>
</BsNavbar.Brand>


        <BsNavbar.Toggle
          aria-controls="main-navbar"
          style={{ borderColor: "var(--jw-primary)" }}
        />

        <BsNavbar.Collapse id="main-navbar">
          <Nav className="ms-auto align-items-center gap-3">
            <Nav.Link
              href="#para-quem"
              onClick={() => setExpanded(false)}
              className="nav-link-jw"
            >
              Para Quem
            </Nav.Link>
            
            <Nav.Link
              href="#recursos"
              onClick={() => setExpanded(false)}
              className="nav-link-jw"
            >
              Recursos
            </Nav.Link>
            <Nav.Link
  href="#planos"
  onClick={() => setExpanded(false)}
  className="nav-link-jw"
>
  Planos
</Nav.Link>

            <Nav.Link
              href="#contato"
              onClick={() => setExpanded(false)}
              className="nav-link-jw"
            >
              Contato
            </Nav.Link>
            <Button
  href="https://app.jotasweb.com.br"
  target="_blank"
  rel="noopener noreferrer"
>
  Entrar
</Button>

          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
}
