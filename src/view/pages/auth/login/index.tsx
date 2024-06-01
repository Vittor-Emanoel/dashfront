import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { useForm } from 'react-hook-form';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useAuth } from '@app/hooks/useAuth';
import { authService } from '@app/services/authService';
import { SigninParams } from '@app/services/authService/signin';
import { GoogleIcon } from '@components/icons/Google';
import { cn } from '@components/lib/lib';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Label } from '@radix-ui/react-dropdown-menu';
import { CrossCircledIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../../../../assets/images/logo';
import { EyeIcon } from '../../../components/icons/EyeIcon';

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
    formState,
    register,
    handleSubmit: hookFormSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="w-full h-screen flex lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[600px]">
      <div className="w-full flex items-center justify-center p-6">
        <div className="mx-auto grid w-[350px] gap-6 ">
          <header className="items-center">
            <Logo />
            <h1 className="text-2xl font-semibold leading-none tracking-tight mt-4 text-zinc-800">
              Entrar
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              Crie sua conta e comece a usar os recursos.
            </p>
          </header>
          <form onSubmit={handleSubmit} className="grid gap-2">
            <div className="grid gap-2">
              <Label className="text-sm text-zinc-700">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="Seu email"
                className={cn(
                  'placeholder:text-sm',
                  formState.errors.password &&
                    'border-red-500 placeholder:text-red-500',
                )}
                {...register('email')}
              />
              {formState.errors.email && (
                <span className="text-xs text-red-500 flex gap-2">
                  <CrossCircledIcon />
                  {formState.errors.email.message}
                </span>
              )}
            </div>
            <div className="grid gap-2 ">
              <div className="flex items-center">
                <Label className="text-sm text-zinc-700">Senha</Label>
              </div>

              <div className="grid w-full max-w-sm items-center gap-1.5 relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className={cn(
                    'pr-10 placeholder:text-sm',
                    formState.errors.password &&
                      'border-red-500 placeholder:text-red-500',
                  )}
                  placeholder="Sua senha"
                  {...register('password')}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex  text-gray-500 dark:text-gray-400"
                  onClick={() => setShowPassword((state) => !state)}
                >
                  <EyeIcon size={24} open={showPassword} />
                </button>
              </div>
              {formState.errors.password && (
                <span className="text-xs text-red-500 flex gap-2">
                  <CrossCircledIcon />
                  {formState.errors.password.message}
                </span>
              )}
            </div>
            <Button
              type="submit"
              className="w-full mt-4"
              isLoading={isLoading}
              disabled={isLoading}
            >
              Entrar com o e-mail
            </Button>

            <div className="text-center text-zinc-700">
              <p>ou</p>
            </div>
            <Button variant="outline" className="w-full flex gap-2">
              <GoogleIcon className="w-4 h-4" />
              Entrar com o Google
            </Button>
          </form>
          <div className="flex gap-1 items-center justify-center text-sm text-muted-foreground">
            <p>Já possui uma conta?</p>
            <Link
              to="/register"
              className="underline hover:text-primary transition-colors"
            >
              Entrar
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block"></div>
    </div>
  );
}
