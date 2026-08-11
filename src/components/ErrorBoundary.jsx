import { Component } from "react";
import { Container, Alert, Button } from "react-bootstrap";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary capturou um erro:", error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Container className="py-5 text-center" style={{ maxWidth: "600px" }}>
          <Alert variant="danger">
            <Alert.Heading>Ops! Algo deu errado.</Alert.Heading>
            <p>
              Ocorreu um erro inesperado na aplicação. Por favor, recarregue a
              página. Se o problema persistir, contate o suporte.
            </p>
            <Button variant="outline-danger" onClick={this.handleReload}>
              Recarregar página
            </Button>
          </Alert>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
