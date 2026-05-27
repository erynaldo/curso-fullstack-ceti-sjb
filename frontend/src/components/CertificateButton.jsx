import { useEffect, useState } from 'react';
import ButtonCurtir from '../components/ButtonCurtir';

import api from '../api/axios';

export default function CertificateButton({

  student

}) {

  const [certificateUrl, setCertificateUrl] =
    useState('');

  const [loading, setLoading] =
    useState(true);

  const frequency =
    student?.frequency || 0;

  const canDownload =
    frequency >= 100;

  useEffect(() => {

    const fetchCertificate = async () => {

      try {

        if (!student?.id) return;

        const { data } = await api.get(
          `/certificates/${student.id}`
        );

        setCertificateUrl(data.url);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);
      }
    };

    fetchCertificate();

  }, [student]);

  const downloadCertificate = () => {

    if (!certificateUrl) {

      return alert(
        'O seu certificado não está disponível.\nPor favor, comunique o professor.'
      );
    }

    window.open(certificateUrl, '_blank');
  };

  return (

    <div className="certificate-card">

      <div className="flex flex-col items-center">

        <h2 className="text-3xl font-bold text-slate-700 mb-5">
          Certificado do Curso
        </h2>

        <p className="text-lg text-slate-500 mb-4">
          Sua frequência:
          <strong className="text-blue-500">
            {' '} {frequency}%
          </strong>
        </p>

        <p className="text-sm font-bold text-red-500 mb-3 tracking-wider">
          ATENÇÃO: <span className="text-slate-600 font-medium">Verifique se o seu nome está correto. Se tiver certo <strong>confirme no botão</strong> abaixo. Mas se tiver errado informe o erro ao professor. </span>
        </p>

        <p className="text-xl text-slate-500 mb-3">
          <strong className="">
            {student.name}
          </strong>
        </p>

        <ButtonCurtir userId={student.id} />

      </div>

      {

        !canDownload && (

          <div className="bg-amber-50 border border-amber-200 text-amber-700 rounded-2xl p-4 text-sm tracking-widest mb-4">

            Seu certificado estará disponível para download
            ao final do curso.

          </div>
        )
      }

      <button

        disabled={!canDownload || loading}

        onClick={downloadCertificate}

        className={`px-6 py-4 rounded-2xl font-medium text-white tracking-wider transition-all ${canDownload

          ? 'bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700'

          : 'bg-slate-300 cursor-not-allowed'
          }`}
      >

        {

          canDownload

            ? 'Baixar Certificado'

            : 'Certificado Indisponível'
        }

      </button>

    </div>
  );
}