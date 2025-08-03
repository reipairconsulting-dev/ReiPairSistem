import React, { useEffect, useState } from 'react';
import { StatsCard } from '../components/Dashboard/StatsCard';
import {
  ClipboardDocumentListIcon,
  CurrencyDollarIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  ChartBarIcon,
  TruckIcon,
} from '@heroicons/react/24/outline';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { motion } from 'framer-motion';
import { DashboardStats } from '../types';

// Mock data - replace with real API calls
const mockStats: DashboardStats = {
  total_orders: 156,
  pending_orders: 23,
  completed_orders: 133,
  total_revenue: 45680.50,
  monthly_revenue: 12340.75,
  low_stock_items: 8,
  overdue_payments: 3,
};

const revenueData = [
  { name: 'Jan', value: 8400 },
  { name: 'Fev', value: 9200 },
  { name: 'Mar', value: 7800 },
  { name: 'Abr', value: 11200 },
  { name: 'Mai', value: 9800 },
  { name: 'Jun', value: 12340 },
];

const ordersData = [
  { name: 'Seg', orders: 12, completed: 8 },
  { name: 'Ter', orders: 15, completed: 12 },
  { name: 'Qua', orders: 8, completed: 6 },
  { name: 'Qui', orders: 18, completed: 15 },
  { name: 'Sex', orders: 22, completed: 18 },
  { name: 'Sáb', orders: 16, completed: 14 },
  { name: 'Dom', orders: 9, completed: 7 },
];

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>(mockStats);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Visão geral do seu negócio</p>
        </div>
        <div className="text-sm text-gray-500">
          Última atualização: {new Date().toLocaleString('pt-BR')}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total de OS"
          value={stats.total_orders}
          icon={ClipboardDocumentListIcon}
          trend={{ value: 12, isPositive: true }}
          color="blue"
        />
        <StatsCard
          title="OS Pendentes"
          value={stats.pending_orders}
          icon={ClockIcon}
          color="yellow"
        />
        <StatsCard
          title="Receita Mensal"
          value={`R$ ${stats.monthly_revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          icon={CurrencyDollarIcon}
          trend={{ value: 8, isPositive: true }}
          color="green"
        />
        <StatsCard
          title="Estoque Baixo"
          value={stats.low_stock_items}
          icon={ExclamationTriangleIcon}
          color="red"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Receita Mensal</h3>
            <ChartBarIcon className="w-5 h-5 text-[#C39C46]" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                formatter={(value) => [`R$ ${value}`, 'Receita']}
                labelStyle={{ color: '#333' }}
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #C39C46',
                  borderRadius: '8px',
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#C39C46"
                strokeWidth={3}
                dot={{ fill: '#C39C46', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Orders Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Ordens de Serviço - Semana</h3>
            <TruckIcon className="w-5 h-5 text-[#C39C46]" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ordersData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #C39C46',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="orders" fill="#C39C46" name="Total" radius={[4, 4, 0, 0]} />
              <Bar dataKey="completed" fill="#0A1A3F" name="Concluídas" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Atividades Recentes</h3>
        <div className="space-y-4">
          {[
            { action: 'Nova OS criada', details: '#OS-2025-001 - iPhone 13 Pro', time: '2 min atrás', type: 'order' },
            { action: 'Pagamento recebido', details: 'R$ 450,00 - OS #OS-2024-156', time: '15 min atrás', type: 'payment' },
            { action: 'Estoque baixo', details: 'Película iPhone 14 - 3 unidades', time: '1h atrás', type: 'warning' },
            { action: 'OS finalizada', details: '#OS-2024-155 - Samsung Galaxy S23', time: '2h atrás', type: 'completed' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className={`w-2 h-2 rounded-full ${
                activity.type === 'order' ? 'bg-blue-500' :
                activity.type === 'payment' ? 'bg-green-500' :
                activity.type === 'warning' ? 'bg-yellow-500' :
                'bg-[#C39C46]'
              }`} />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                <p className="text-sm text-gray-600">{activity.details}</p>
              </div>
              <span className="text-xs text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};