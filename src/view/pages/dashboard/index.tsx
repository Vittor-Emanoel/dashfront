import { CalendarDays, Church, Layers3, Users2 } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';

export function Dashboard() {
  return (
    <>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="pb-4">
          <h2 className="text-2xl tracking-tight max-md:text-xl max-md:font-bold">
            Olá, Vittor
          </h2>
          <p className="text-base text-muted-foreground max-md:text-sm">
            Aqui estão as principais informações sobre a congregação.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total de membros
              </CardTitle>
              <Users2 size={20} className="text-zinc-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">50</div>
              <p className="text-xs text-muted-foreground">
                Esse é baseado nos membros cadastrados
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total de obreiros
              </CardTitle>
              <Layers3 size={20} className="text-zinc-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">50</div>
              <p className="text-xs text-muted-foreground">
                Esse é baseado nos obreiros cadastrados
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total de congregados
              </CardTitle>
              <Church size={20} className="text-zinc-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">10</div>
              <p className="text-xs text-muted-foreground">
                Esse é baseado nos cadastro dos membros não batizados
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Próx. evento
              </CardTitle>
              <CalendarDays size={20} className="text-zinc-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Santa Ceia geral</div>
              <p className="text-xs text-muted-foreground">
                Na igreja Sede, às 19:00
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
