import { SubmitButton } from "../../components/index";
import "./index.scss";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  
  function handleClick() {
    navigate("/clock");
  }

  return (
    <div className="home">
      <p>
        Ponto <strong>Ilumeo</strong>{" "}
      </p>
      <SubmitButton
        width="365px"
        height="47px"
        onClick={handleClick}
        children="Confirmar"
      />
    </div>
  );
}

export default Home;
