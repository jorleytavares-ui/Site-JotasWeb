import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ParaQuem from "./components/ParaQuem";
import Recursos from "./components/Recursos";
import FormCadastroTrial from "./components/FormCadastroTrial";
import ContatoSection from "./components/ContatoSection";
import Footer from "./components/Footer";
import "./index.css";

function App() {
  const [mostrarForm, setMostrarForm] = useState(false);
  const [empresaJaExiste, setEmpresaJaExiste] = useState(false);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <Hero onIniciarTrial={() => setMostrarForm(true)} />
      <ParaQuem />
      <Recursos />
      {mostrarForm && (
        <FormCadastroTrial onStatusChange={setEmpresaJaExiste} />
      )}
      <ContatoSection esconder={mostrarForm && empresaJaExiste} />
      <Footer />
    </div>
  );
}

export default App;
