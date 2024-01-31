//utils

import { useNavigate } from 'react-router-dom';

//components

import { useMembers } from '@app/hooks/useMembers';
import { HeaderPages } from '@components/HeaderPages';
import { cn } from '@components/lib/lib';
import { Button } from '@components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useMediaQuery } from 'usehooks-ts';
import { TableMembers } from './components/Table';
import { MemberTableSkeleton } from './components/Table/tableSkeleton';

export function Members() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { members, isFetching } = useMembers();

  return (
    <div className="w-full">
      <div
        className={cn(
          'flex justify-between items-center',
          isMobile && 'flex-col pb-4 items-start',
        )}
      >
        <HeaderPages
          title="Membros"
          subtitle="Gerencie os membros de sua congregação."
          leftAction={() => navigate('/secretary')}
        />
        <Button
          className={cn(' flex items-center gap-4 h-12 ', isMobile && 'w-full')}
          onClick={() => navigate('/members/new')}
        >
          <PlusCircle size={18} />
          Criar novo
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        {isFetching && <MemberTableSkeleton />}

        {!isFetching && <TableMembers data={members} />}
      </div>
    </div>
  );
}
