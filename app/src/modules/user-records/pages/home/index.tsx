import { createSearchParams, useNavigate } from "react-router-dom";
import { InputText, SubmitButton } from "../../components/index";
import { UserService } from "../../services/user.service";
import "./index.scss";

export function Home() {
  const service = new UserService();
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      code: { value: string };
    };
    const code = target.code.value;
    service
      .get(code)
      .then((response) => {
        console.log(response.data);
        const params = { code: "date" };
        navigate({
          pathname: "/records",
          search: `?${createSearchParams(params)}`,
        });
      })
      .catch((error: Error) => {
        console.log(error);
      });
  };
  return (
    <div className="home">
      <p>
        Ponto <strong>Ilumeo</strong>
      </p>
      <form onSubmit={handleSubmit}>
        <InputText
          label="Código do usuário"
          width="365px"
          height="60px"
          name="code"
        />
        <SubmitButton width="365px" height="47px" children="Confirmar" />
      </form>
    </div>
  );
}
