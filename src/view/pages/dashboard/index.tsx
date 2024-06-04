import { useAuth } from '@app/hooks/useAuth';
import { useMembers } from '@app/hooks/useMembers';
import { getFirstNameAndLastName } from '@app/utils/getFirstNameAndLastName';
import { getPeriodOfDay } from '@app/utils/getPeriodOfDay';
import {
  HeaderPageRoot,
  HeaderPageSubtitle,
  HeaderPageTitle,
} from '@components/HeaderPages';
import { InputMask } from '@components/InputMask';
import { Modal } from '@components/Modal';
import { cn } from '@components/lib/lib';
import { Button } from '@components/ui/button';
import { Input, InputRoot } from '@components/ui/input';
import { Building, CalendarDays, Church, Layers3, Users2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';

export function Dashboard() {
  const { user } = useAuth();
  const periodOfDay = getPeriodOfDay();
  const { members, isFetching } = useMembers();
  const [createOrganizationModal, setCreateOrganizationModal] = useState(false);
  const hasOrganization = user?.own_organizations.length! > 1;

  const totalMembers = members.length;

  useEffect(() => {
    if (!hasOrganization) {
      setCreateOrganizationModal(true);
    }
  }, []);

  return (
    <div className="blur">
      <Modal
        open={createOrganizationModal}
        onClose={() => setCreateOrganizationModal(false)}
        title="Informaçãos da organização"
        className="bg-white"
        rightAction
      >
        <form className="space-y-4">
          <div className="grid gap-2">
            <Input
              id="name"
              type="text"
              placeholder="Nome da organização"
              className={cn('placeholder:text-sm')}
            />
          </div>
          <div className="flex gap-4 ">
            <InputRoot>
              <Input type="text" placeholder="Número" />
            </InputRoot>

            <div className="flex flex-col">
              <InputMask
                type="text"
                mask="99999-999"
                placeholder="CEP"
                className=" "
              />
            </div>
          </div>
          <div className="flex gap-4">
            <InputMask
              type="text"
              mask="99.999.999/9999-99"
              placeholder="CNPJ"
              className=""
            />
          </div>

          <Button type="submit" className="w-full flex items-center gap-2">
            <Building size={18} />
            Criar Organização
          </Button>
        </form>
      </Modal>

      {hasOrganization && (
        <>
          <HeaderPageRoot className="py-8">
            <HeaderPageTitle>
              {`Olá, ${getFirstNameAndLastName(user?.name!)}`}
            </HeaderPageTitle>
            <HeaderPageSubtitle>{`Seja bem vindo, ${periodOfDay}!`}</HeaderPageSubtitle>
          </HeaderPageRoot>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 py-4">
            <Card>
              <CardHeader className="flex flex-row  items-center justify-between">
                <CardTitle className="text-sm bg-primary-foreground p-2 rounded font-normal uppercase ">
                  Membros
                </CardTitle>
                <Users2 size={30} className="text-zinc-300" />
              </CardHeader>
              <CardContent className="space-y-2">
                <div
                  className={cn(
                    'text-3xl font-bold ',
                    isFetching && 'blur transitio',
                  )}
                >
                  {totalMembers}
                </div>
                <p className="text-zinc-500 text-sm text-muted-foreground max-md:text-sm">
                  Número total de membros.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between ">
                <CardTitle className="text-sm bg-primary-foreground p-2 rounded font-normal uppercase ">
                  Obreiros
                </CardTitle>
                <Layers3 size={30} className="text-zinc-300" />
              </CardHeader>
              <CardContent className="space-y-2">
                <div className={cn('text-3xl font-bold ', isFetching && '')}>
                  {totalMembers}
                </div>
                <p className="text-zinc-500 text-sm text-muted-foreground max-md:text-sm">
                  Número total de obreiros.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between ">
                <CardTitle className="text-sm bg-primary-foreground p-2 rounded font-normal uppercase ">
                  congregados
                </CardTitle>
                <Church size={30} className="text-zinc-300" />
              </CardHeader>
              <CardContent className="space-y-2">
                <div
                  className={cn(
                    'text-3xl font-bold ',
                    isFetching && 'blur transitio',
                  )}
                >
                  {totalMembers ?? 0}
                </div>
                <p className="text-zinc-500 text-sm text-muted-foreground max-md:text-sm">
                  Número total de congregados.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between ">
                <CardTitle className="text-sm bg-primary-foreground p-2 rounded font-normal uppercase ">
                  Próx Evento
                </CardTitle>
                <CalendarDays size={30} className="text-zinc-300" />
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-3xl font-bold">Santa Ceia</div>
                <p className="text-zinc-500 text-sm text-muted-foreground max-md:text-sm">
                  Dia 24/01 ás 19:30.
                </p>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
