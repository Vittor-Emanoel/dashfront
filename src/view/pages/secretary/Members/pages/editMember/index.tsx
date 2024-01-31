import { useChurchs } from '@app/hooks/useChurchs';
import { useOffices } from '@app/hooks/useOffices';
import { Trash } from 'lucide-react';
import { Controller } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useMediaQuery } from 'usehooks-ts';
import { HeaderPages } from '../../../../../components/HeaderPages';
import { CustomInput } from '../../../../../components/Input';
import { Button } from '../../../../../components/ui/button';
import { Input } from '../../../../../components/ui/input';
import { DeleteMemberAlertModal } from '../../components/DeleteMemberAlert';
import { SelectDropdown } from '../../components/Select';
import { EditMemberSkeleton } from '../../components/editMemberFormSkeleton';
import { useEditMemberController } from './useEditMemberController';

export function EditMember() {
  const { id } = useParams();

  const isMobile = useMediaQuery('(max-width: 768px)');
  const {
    register,
    member,
    control,
    errors,
    isLoading,
    isLoadingMember,
    isDeleteModalOpen,
    isLoadingDelete,
    handleDeleteMember,
    handleSubmit,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
  } = useEditMemberController({ memberId: id! });

  const navigate = useNavigate();

  const { church, isFetching: loadingChurchs } = useChurchs();
  const { office, isFetching: loadingOffices } = useOffices();

  return (
    <div className="w-full flex justify-between">
      <DeleteMemberAlertModal
        title="Excluir membro"
        isLoading={isLoadingDelete}
        onOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteMember}
        description={`Tem certeza que deseja excluir o membro "${member?.fullName}"`}
      />
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[550px] md:pr-14 items-center justify-center  "
      >
        <HeaderPages
          title="Editar Membro"
          subtitle="insira as informações abaixo e edite as informações do membro."
          leftAction={() => navigate('/secretary')}
        >
          <Trash
            className="cursor-pointer rounded p-2 hover:bg-muted transition-colors"
            size={38}
            onClick={handleOpenDeleteModal}
          />
        </HeaderPages>

        <div className="space-y-4 ">
          {!isLoadingMember && (
            <>
              <Input
                type="text"
                placeholder="Nome completo"
                error={errors.fullName?.message}
                {...register('fullName')}
              />

              <Controller
                control={control}
                name="phone"
                render={({ field: { value } }) => {
                  return (
                    <CustomInput
                      type="text"
                      value={value}
                      placeholder="Telefone"
                      mask="+55 (99) 99999-9999"
                      error={errors.phone?.message}
                      {...register('phone')}
                    />
                  );
                }}
              />

              <Input
                type="text"
                placeholder="Endereço"
                error={errors.street?.message}
                {...register('street')}
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="text"
                  placeholder="Número"
                  error={errors.houseNumber?.message}
                  {...register('houseNumber')}
                />

                <Controller
                  control={control}
                  name="postalCode"
                  render={({ field: { value } }) => {
                    return (
                      <CustomInput
                        type="text"
                        value={value}
                        mask="99999-999"
                        placeholder="Cep"
                        error={errors.postalCode?.message}
                        {...register('postalCode')}
                      />
                    );
                  }}
                />
              </div>

              <div className="flex gap-4 justify-between">
                <Controller
                  control={control}
                  name="church.name"
                  render={({ field: { onChange, value } }) => {
                    return (
                      <SelectDropdown
                        isLoading={loadingChurchs}
                        placeholder={value}
                        label="Igrejas"
                        onChange={onChange}
                        value={value}
                        options={church}
                      />
                    );
                  }}
                />
                <Controller
                  control={control}
                  name="office.name"
                  render={({ field: { onChange, value } }) => {
                    return (
                      <SelectDropdown
                        isLoading={loadingOffices}
                        placeholder={value}
                        error={'errors.churchId?.message'}
                        label="Cargos"
                        onChange={onChange}
                        value={value}
                        options={office}
                      />
                    );
                  }}
                />
              </div>
            </>
          )}
          {isLoadingMember && <EditMemberSkeleton />}
        </div>

        <Button
          className="w-full h-12 mt-4"
          isLoading={isLoading}
          disabled={isLoading}
        >
          Confirmar
        </Button>
      </form>

      {!isMobile && (
        <div className="py-12 w-full  max-md:none ">
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-lg font-normal text-zinc-100 tracking-tight max-md:text-xl max-md:font-bold">
                "Ora, vocês são o corpo de Cristo, e cada um de vocês,
                individualmente, é membro desse corpo".
              </h2>
              <q className="text-zinc-500 text-base text-muted-foreground max-md:text-sm">
                <strong>A Biblia Sagrada </strong>- 1 Coríntios 12:27
              </q>
            </div>
            <div>
              <h2 className="text-lg font-normal tracking-tight max-md:text-xl max-md:font-bold">
                "Assim como cada um de nós tem um corpo com muitos membros e
                esses membros não exercem todos a mesma função, assim também em
                Cristo nós, que somos muitos, formamos um corpo, e cada membro
                está ligado a todos os outros.".
              </h2>
              <q className="text-zinc-500 text-base text-muted-foreground max-md:text-sm">
                <strong>A Biblia Sagrada </strong>- Romanos 12:4-5
              </q>
            </div>
            <div>
              <h2 className="text-lg font-normal tracking-tight max-md:text-xl max-md:font-bold">
                "Que a paz de Cristo seja o juiz em seu coração, visto que vocês
                foram chamados para viver em paz, como membros de um só corpo. E
                sejam agradecidos.".
              </h2>
              <q className="text-zinc-500 text-base text-muted-foreground max-md:text-sm">
                <strong>A Biblia Sagrada </strong>- Colossenses 3:15
              </q>
            </div>
            <div>
              <h2 className="text-lg font-normal tracking-tight max-md:text-xl max-md:font-bold">
                "Dele todo o corpo, ajustado e unido pelo auxílio de todas as
                juntas, cresce e edifica-se a si mesmo em amor, na medida em que
                cada parte realiza a sua função.".
              </h2>
              <q className="text-zinc-500 text-base text-muted-foreground max-md:text-sm">
                <strong>A Biblia Sagrada </strong>- Efésios 4:16
              </q>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
