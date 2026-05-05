// pages/index.js
import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, AlertCircle, Clock, TrendingUp, BarChart3, 
  Search, RefreshCw, ExternalLink, Calendar, User, Tag
} from 'lucide-react';
import { formatDistance } from 'date-fns';
import { es } from 'date-fns/locale';

export default function Dashboard() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    done: 0,
    inProgress: 0,
    todo: 0,
    critical: 0
  });
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/jira/issues');
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch issues');
      }

      setIssues(data.issues);
      calculateStats(data.issues);
    } catch (err) {
      setError(err.message);
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (ticketList) => {
    const stats = {
      total: ticketList.length,
      done: ticketList.filter(i => i.status === 'Done').length,
      inProgress: ticketList.filter(i => ['In Progress', 'In Review'].includes(i.status)).length,
      todo: ticketList.filter(i => ['To Do', 'Backlog'].includes(i.status)).length,
      critical: ticketList.filter(i => i.priority === 'Critical').length
    };
    setStats(stats);
  };

  const filteredIssues = issues.filter(issue => {
    const matchesFilter = filter === 'all' || 
      (filter === 'critical' && issue.priority === 'Critical') ||
      (filter === 'inProgress' && ['In Progress', 'In Review'].includes(issue.status)) ||
      (filter === 'done' && issue.status === 'Done');
    
    const matchesSearch = searchTerm === '' || 
      issue.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.key.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'Done': return 'bg-emerald-100 text-emerald-700';
      case 'In Progress':
      case 'In Review': return 'bg-blue-100 text-blue-700';
      case 'To Do':
      case 'Backlog': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityIcon = (priority) => {
    switch(priority) {
      case 'Critical':
      case 'Highest': return '🔴';
      case 'High': return '🟠';
      case 'Medium': return '🟡';
      default: return '🟢';
    }
  };

  const getStatusIcon = (status) => {
    if (status === 'Done') return <CheckCircle className="w-4 h-4" />;
    if (['In Progress', 'In Review'].includes(status)) return <Clock className="w-4 h-4" />;
    return <AlertCircle className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');
        
        * {
          font-family: 'Poppins', sans-serif;
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .stat-card {
          animation: slideUp 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .stat-card:nth-child(1) { animation-delay: 0.1s; }
        .stat-card:nth-child(2) { animation-delay: 0.2s; }
        .stat-card:nth-child(3) { animation-delay: 0.3s; }
        .stat-card:nth-child(4) { animation-delay: 0.4s; }
        .stat-card:nth-child(5) { animation-delay: 0.5s; }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .ticket-row {
          animation: fadeIn 0.5s ease-out forwards;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="gradient-text text-4xl font-bold mb-2">Studio by Tishman</h1>
              <p className="text-gray-400">Project Management Portal</p>
            </div>
            <button
              onClick={fetchIssues}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-300 hover:bg-blue-600/30 disabled:opacity-50 transition"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Actualizar
            </button>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-500/20 border border-red-500/30 text-red-300">
            <p className="font-semibold mb-1">Error al cargar los datos</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Stats Grid */}
        {!error && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            <div className="stat-card backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 p-6 hover:bg-white/15 transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Total</p>
                  <p className="text-3xl font-bold text-white">{stats.total}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </div>

            <div className="stat-card backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 p-6 hover:bg-white/15 transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Completados</p>
                  <p className="text-3xl font-bold text-emerald-400">{stats.done}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-emerald-400" />
                </div>
              </div>
            </div>

            <div className="stat-card backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 p-6 hover:bg-white/15 transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">En Progreso</p>
                  <p className="text-3xl font-bold text-blue-400">{stats.inProgress}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </div>

            <div className="stat-card backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 p-6 hover:bg-white/15 transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Por Hacer</p>
                  <p className="text-3xl font-bold text-yellow-400">{stats.todo}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-yellow-400" />
                </div>
              </div>
            </div>

            <div className="stat-card backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 p-6 hover:bg-white/15 transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Críticos</p>
                  <p className="text-3xl font-bold text-red-400">{stats.critical}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-red-400" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filters and Search */}
        <div className="mb-6 space-y-4">
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg transition ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilter('inProgress')}
              className={`px-4 py-2 rounded-lg transition ${
                filter === 'inProgress'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20'
              }`}
            >
              En Progreso
            </button>
            <button
              onClick={() => setFilter('done')}
              className={`px-4 py-2 rounded-lg transition ${
                filter === 'done'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20'
              }`}
            >
              Completados
            </button>
            <button
              onClick={() => setFilter('critical')}
              className={`px-4 py-2 rounded-lg transition ${
                filter === 'critical'
                  ? 'bg-red-600 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20'
              }`}
            >
              Críticos
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Buscar por ID o descripción..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
            />
          </div>
        </div>

        {/* Issues Table */}
        <div className="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="inline-block">
                <RefreshCw className="w-8 h-8 text-blue-400 animate-spin mb-4" />
              </div>
              <p className="text-gray-400">Cargando tickets...</p>
            </div>
          ) : filteredIssues.length === 0 ? (
            <div className="p-12 text-center">
              <AlertCircle className="w-8 h-8 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">No se encontraron tickets</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="px-6 py-3 text-left text-sm font-semibold text-white/80">ID</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-white/80">Descripción</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-white/80">Estado</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-white/80">Prioridad</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-white/80">Asignado</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-white/80">Vence</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-white/80">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredIssues.map((issue, idx) => (
                      <tr key={idx} className="ticket-row border-b border-white/5 hover:bg-white/5 transition">
                        <td className="px-6 py-4">
                          <span className="font-mono text-blue-400 font-semibold">{issue.key}</span>
                        </td>
                        <td className="px-6 py-4 max-w-xs">
                          <p className="text-white/90 text-sm">{issue.summary}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(issue.status)}`}>
                            {getStatusIcon(issue.status)}
                            {issue.status}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-lg">{getPriorityIcon(issue.priority)}</span>
                        </td>
                        <td className="px-6 py-4 text-white/70 text-sm">
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {issue.assignee}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-white/70 text-sm">
                          {issue.dueDate ? (
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {formatDistance(new Date(issue.dueDate), new Date(), { locale: es, addSuffix: true })}
                            </div>
                          ) : (
                            <span className="text-gray-500">—</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <a
                            href={issue.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 transition"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-4 border-t border-white/10 text-white/60 text-sm">
                Mostrando {filteredIssues.length} de {issues.length} tickets
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Última actualización: {new Date().toLocaleString('es-CL')}</p>
        </div>
      </div>
    </div>
  );
}
