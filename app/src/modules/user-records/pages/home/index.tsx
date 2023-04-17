import { useMemo } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { InputText, SubmitButton } from '../../components/index';
import { UserService } from '../../services/user.service';
import './index.scss';

export function Home() {
  const navigate = useNavigate();
  const service = useMemo(() => {
    return new UserService();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      code: { value: string };
    };
    const code = target.code.value || 'undefined';
    const params = { code };
    await service
      .get(code)
      .then(() => {
        navigate({
          pathname: '/records',
          search: `?${createSearchParams(params)}`,
        });
      })
      .catch((error) => {
        toast.error(`${error.response.status} - ${error.response.data}`);
      });
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
      <ToastContainer />
    </div>
  );
}
