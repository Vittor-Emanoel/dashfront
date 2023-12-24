import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useMembers } from '../../../MembersContext/useMembers';

const schema = z.object({
  fullName: z.string().nonempty('O nome é obrigatório!'),
  phone: z.string().nonempty('O telefone é obrigatório!'),
  address: z.string().optional(),
  houseNumber: z.string().nonempty('O número é obrigatório!'),
  cep: z.string().nonempty('O cep é obrigatório!'),
  churchId: z.string(),
  officeId: z.string(),
});

type FormData = z.infer<typeof schema>;

export function useNewMemberModalController() {
  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { isNewMemberModalOpen, closeNewMemberModal } = useMembers();

  const handleSubmit = hookFormSubmit((data) => {
    console.log(data);
  });

  return {
    handleSubmit,
    isNewMemberModalOpen,
    closeNewMemberModal,
    errors,
    control,
    reset,
    register,
  };
}