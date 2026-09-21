import { useState } from "react";
import Navbar from "./components/NavBar";
import Hero from "./components/Hero";
import OProblema from "./components/OProblema";
import ParaQuem from "./components/ParaQuem";
import ComoFunciona from "./components/ComoFunciona";
import Recursos from "./components/Recursos";
import Seguranca from "./components/Seguranca";
import PlanosSection from "./components/PlanosSection";
import FAQ from "./components/FAQ";
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
      <OProblema />
      <ParaQuem />
      <ComoFunciona />
      <Recursos />
      <Seguranca />
      <PlanosSection />
      <FAQ />
      {mostrarForm && (
        <FormCadastroTrial onStatusChange={setEmpresaJaExiste} />
      )}
      <ContatoSection esconder={mostrarForm && empresaJaExiste} />
      <Footer />
    </div>
  );
}

export default App;
