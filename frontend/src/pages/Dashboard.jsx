import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StatsCard from '../components/StatsCard';
import ProgressChart from '../components/ProgressChart';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

import CertificateButton from "../components/CertificateButton";

const TOTAL_HOURS = 16;

export default function Dashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);

  // const student = {
  //   name: useAuth().user.name
  // };

  const fetchProfile = async () => {

    try {

      const { data } = await api.get('/user/me');

      setProfile(data);

    } catch (error) {

      console.error(error);
    }
  };

  useEffect(() => {

    fetchProfile();

  }, []);

  const hoursDone = profile?.hours_done || 0;

  const hoursLeft = TOTAL_HOURS - hoursDone;

  const frequency =
    Math.round((hoursDone / TOTAL_HOURS) * 100);

  const student = {

    id: profile?.id,

    name: profile?.name,

    frequency
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-800">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8 space-y-8">

        {/* Cards de progresso */}
        <section>
          <h2 className="font-display text-2xl font-bold text-slate-200 mb-4">Seu Progresso</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatsCard label="Total de horas/aulas" value={`${TOTAL_HOURS}h`} sub="carga horária total" color="azul" />
            <StatsCard label="Horas concluídas" value={`${hoursDone}h`} sub="horas/aulas assistidas" color="green" />
            <StatsCard label="Horas restantes" value={`${hoursLeft}h`} sub="horas/aulas pendentes" color="amber" />
            <StatsCard label="Sua Frequência" value={`${frequency}%`} sub="cada sábado = 25%" color="blue" />
          </div>
        </section>

        {/* Gráfico de frequência */}
        <section className="grid md:grid-cols-3 gap-4">
          <ProgressChart hoursDone={hoursDone} />

          <div className="md:col-span-2 bg-white rounded-2xl border border-slate-100 p-5 flex flex-col justify-center">
            <CertificateButton
              student={student}
            />
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}