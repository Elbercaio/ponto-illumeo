import { Navigate } from "react-router-dom";
import { SubmitButton } from "../../components/index";
import "./index.scss";

export function Home() {
  return (
    <div className="home">
      <p>
        Ponto <strong>Ilumeo</strong>
      </p>
      <SubmitButton
        width="365px"
        height="47px"
        onClick={() => <Navigate to="/records" />}
        children="Confirmar"
      />
    </div>
  );
}
