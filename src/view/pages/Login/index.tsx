import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

import { useForm } from 'react-hook-form';

import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { useAuth } from '../../../app/hooks/useAuth';
import { authService } from '../../../app/services/authService';
import { SigninParams } from '../../../app/services/authService/signin';
import img from '../../../assets/images/login.jpg';

const schema = z.object({
  email: z
    .string()
    .nonempty('E-mail é obrigatório')
    .email('Informe um e-mail válido'),
  password: z
    .string()
    .nonempty('Senha é obrigatória')
    .min(8, 'Senha deve conter pelo menos 8 dígitos'),
});

type FormData = z.infer<typeof schema>;

export function Login() {
  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const { signin: signIn } = useAuth();

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (data: SigninParams) => {
      return authService.signin(data);
    },
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      const { accessToken } = await mutateAsync(data);

      signIn(accessToken);
    } catch {
      toast.error('Credenciais inválidas!');
    }
  });

  return (
    <div className="w-full h-screen flex justify-between">
      <div className="w-full bg-slate flex-1 flex items-center text-right justify-center flex-col">
        <h1 className="text-gray-900 text-2xl font-bold tracking-[-1px]">
          Bem vindo!
        </h1>
        <p className="space-x-2 text-gray-700 tracking-[-0.5px] text-base leading-6">
          A plataforma da ADMSA
        </p>

        <form
          onSubmit={handleSubmit}
          action=""
          className="mt-[60px] w-[361px]  flex flex-col gap-4 "
        >
          <Input
            placeholder="Email"
            {...register('email')}
            error={errors.email?.message}
          />
          <Input
            placeholder="Senha"
            {...register('password')}
            error={errors.password?.message}
          />

          <Button
            type="submit"
            className="mt-2 bg-indigo-900 "
            isLoading={isLoading}
          >
            Entrar
          </Button>
        </form>
      </div>

      <div className="w-1/2 bg-indigo-900 ">
        <img
          className="w-full h-screen  object-cover"
          src={img}
          alt="foto de uma mulher com um lindo vestido azul e uma rapaz com um lindo terno cinza"
        />
      </div>
    </div>
  );
}
