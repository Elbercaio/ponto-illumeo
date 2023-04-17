import { createSearchParams, useNavigate } from 'react-router-dom';
import { InputText, SubmitButton } from '../../components/index';
// import { UserService } from "../../services/user.service";
import './index.scss';

export function Home() {
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // const service = new UserService();
    event.preventDefault();
    const target = event.target as typeof event.target & {
      code: { value: string };
    };
    const code = target.code.value;
    const params = { code };
    navigate({
      pathname: '/records',
      search: `?${createSearchParams(params)}`,
    });

    // service
    //   .get(code)
    //   .then((response) => {
    //     console.log(response.data);
    //     navigate({
    //       pathname: "/records",
    //       search: `?${createSearchParams(params)}`,
    //     });
    //   })
    //   .catch((error: Error) => {
    //     console.log(error);
    //   });
  };
  return (
    <div className="home">
      <p>
        Ponto <strong>Ilumeo</strong>
      </p>
      <form onSubmit={handleSubmit}>
        <InputText label="Código do usuário" name="code" />
        <SubmitButton>Confirmar</SubmitButton>
      </form>
    </div>
  );
}
