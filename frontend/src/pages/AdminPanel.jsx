import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
// import apis from '../services/api';

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [saving, setSaving] = useState(null);

  // const [studentId, setStudentId] =
  //   useState('');

  const [file, setFile] =
    useState(null);

  const [message, setMessage] = useState('');

  const fetchUsers = async () => {
    const { data } = await api.get('/admin/users');
    setUsers(data);

    // Ordena os usuários pelo nome em ordem alfabética crescente
    const sortedUsers = data.sort((a, b) => a.name.localeCompare(b.name));
    setUsers(sortedUsers);
  };

  useEffect(() => { fetchUsers(); }, []);


  const handleUpload = async (
    studentId,
    selectedFile
  ) => {

    try {

      if (!selectedFile) {

        return setMessage(
          'Selecione um PDF'
        );
      }

      const formData = new FormData();

      formData.append(
        'certificate',
        selectedFile
      );

      formData.append(
        'studentId',
        studentId
      );

      await api.post(

        '/certificates/upload',

        formData,

        {

          headers: {

            'Content-Type':
              'multipart/form-data',
          },
        }
      );

      setMessage(
        'Certificado enviado com sucesso!'
      );

    } catch (error) {

      console.error(error);

      setMessage(
        'Erro ao enviar certificado'
      );
    }
  };



  const updateHours = async (userId, hours) => {
    setSaving(userId);
    try {
      await api.patch(`/admin/users/${userId}/hours`, { hours_done: Number(hours) });
      setMessage('Horas atualizadas com sucesso!');
      fetchUsers();
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setSaving(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-1 mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display text-xl font-bold text-slate-800 mb-1">Painel Administrativo</h2>
            <p className="text-sm text-slate-500 mb-2">Atualize a frequência dos alunos e envie os certificados</p>
            {/* Campo que mostra o total de usuários */}
            <span className="bg-green-200 text-slate-700 text-xs font-bold px-2.5 py-1 rounded-full">
              {users.length-21} administrador
            </span>
            <span className="bg-orange-200 text-slate-700 text-xs font-bold ml-8 px-2.5 py-1 rounded-full">
              {users.length-1} alunos cadastrados
            </span>
          </div>
          <Link to="/dashboard" className="text-sm text-brand-600 hover:underline">← Voltar</Link>
        </div>

        {message && (
          <div className="mb-4 p-3 bg-green-50 border border-green-100 rounded-xl text-green-700 text-sm">
            {message}
          </div>
        )}

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-slate-500 text-xs font-extrabold uppercase tracking-wide">
                <th className="text-left p-3 font-extrabold">Nome</th>
                <th className="text-left p-3 font-extrabold">Matrícula</th>
                <th className="text-left p-3 font-extrabold">Perfil</th>
                <th className="text-center p-3 font-extrabold">Horas concluídas</th>
                <th className="text-center p-3 font-extrabold">Frequência</th>
                <th className="text-center p-3 font-extrabold">Upload</th>
                <th className="text-center p-3 font-extrabold">Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={u.id} className={`border-b border-slate-50 ${i % 2 === 0 ? '' : 'bg-slate-50/50'}`}>
                  <td className="px-2 w-80 font-medium text-slate-800">{u.name}</td>
                  <td className="px-2 text-slate-700 font-mono">{u.matricula}</td>
                  <td className="px-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${u.role === 'admin' ? 'bg-green-200 text-slate-700' : 'bg-orange-200 text-slate-700'}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-2 text-center">
                    <select
                      defaultValue={u.hours_done}
                      onChange={e => updateHours(u.id, e.target.value)}
                      disabled={saving === u.id}
                      className="border border-slate-200 rounded-lg px-2 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500/30 bg-white"
                    >
                      {[0, 4, 8, 12, 16].map(h => (
                        <option key={h} value={h}>{h}h</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-2 text-center">
                    <span className="font-medium text-brand-700">
                      {Math.round((u.hours_done / 16) * 100)}%
                    </span>
                  </td>
                  <td className="px-2 text-center text-slate-600">
                    <button>
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => {

                          const selectedFile =
                            e.target.files[0];

                          if (selectedFile) {

                            handleUpload(
                              u.id,
                              selectedFile
                            );
                          }
                        }}
                        className="text-xs border border-blue-500 rounded p-1 hover:bg-blue-500 hover:text-white cursor-pointer"
                      />
                    </button>
                    {/* </div> */}
                  </td>

                  <td className="px-2 text-center text-slate-400 text-xs">
                    {saving === u.id ? 'Salvando...' : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </div>
  );
}