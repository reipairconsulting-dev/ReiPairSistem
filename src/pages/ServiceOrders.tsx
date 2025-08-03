import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  PencilIcon,
  PrinterIcon,
} from '@heroicons/react/24/outline';

const mockOrders = [
  {
    id: 'OS-2025-001',
    customer: 'João Silva',
    device: 'iPhone 13 Pro',
    issue: 'Tela quebrada',
    status: 'in_repair',
    created_at: '2025-01-15T10:30:00Z',
    total: 450.00,
  },
  {
    id: 'OS-2025-002',
    customer: 'Maria Santos',
    device: 'Samsung Galaxy S23',
    issue: 'Bateria não carrega',
    status: 'pending_approval',
    created_at: '2025-01-15T14:20:00Z',
    total: 280.00,
  },
  {
    id: 'OS-2025-003',
    customer: 'Pedro Costa',
    device: 'iPad Air',
    issue: 'Não liga',
    status: 'completed',
    created_at: '2025-01-14T09:15:00Z',
    total: 320.00,
  },
];

const statusColors = {
  pending_approval: 'bg-yellow-100 text-yellow-800',
  in_analysis: 'bg-blue-100 text-blue-800',
  in_repair: 'bg-orange-100 text-orange-800',
  completed: 'bg-green-100 text-green-800',
  awaiting_pickup: 'bg-purple-100 text-purple-800',
};

const statusLabels = {
  pending_approval: 'Aguardando Aprovação',
  in_analysis: 'Em Análise',
  in_repair: 'Em Reparo',
  completed: 'Finalizado',
  awaiting_pickup: 'Aguardando Retirada',
};

export const ServiceOrders: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.device.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ordens de Serviço</h1>
          <p className="text-gray-600">Gerencie todas as ordens de serviço</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-[#C39C46] hover:bg-[#A8822F] text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Nova OS</span>
        </motion.button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar por cliente, dispositivo ou número da OS..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C39C46] focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <FunnelIcon className="w-5 h-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#C39C46] focus:border-transparent"
            >
              <option value="all">Todos os Status</option>
              <option value="pending_approval">Aguardando Aprovação</option>
              <option value="in_analysis">Em Análise</option>
              <option value="in_repair">Em Reparo</option>
              <option value="completed">Finalizado</option>
              <option value="awaiting_pickup">Aguardando Retirada</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  OS / Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dispositivo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Problema
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ backgroundColor: '#f9fafb' }}
                  className="transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{order.id}</div>
                      <div className="text-sm text-gray-500">{order.customer}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.device}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.issue}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[order.status as keyof typeof statusColors]}`}>
                      {statusLabels[order.status as keyof typeof statusLabels]}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    R$ {order.total.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.created_at).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-[#C39C46] hover:text-[#A8822F] p-1 rounded">
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-800 p-1 rounded">
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-800 p-1 rounded">
                        <PrinterIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">Nenhuma ordem de serviço encontrada</div>
            <p className="text-gray-400 mt-2">Tente ajustar os filtros ou criar uma nova OS</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};