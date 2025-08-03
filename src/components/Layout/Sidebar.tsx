import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  CubeIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  ShoppingCartIcon,
  ChatBubbleLeftRightIcon,
  UsersIcon,
  ChartBarIcon,
  CogIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Ordens de Serviço', href: '/orders', icon: ClipboardDocumentListIcon },
  { name: 'Estoque', href: '/inventory', icon: CubeIcon },
  { name: 'Financeiro', href: '/financial', icon: CurrencyDollarIcon },
  { name: 'Notas Fiscais', href: '/invoices', icon: DocumentTextIcon },
  { name: 'Vendas', href: '/sales', icon: ShoppingCartIcon },
  { name: 'WhatsApp/CRM', href: '/crm', icon: ChatBubbleLeftRightIcon },
  { name: 'Usuários', href: '/users', icon: UsersIcon },
  { name: 'Relatórios', href: '/reports', icon: ChartBarIcon },
  { name: 'Configurações', href: '/settings', icon: CogIcon },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed inset-y-0 left-0 z-50 w-64 bg-[#0A1A3F] shadow-xl lg:translate-x-0 lg:static lg:inset-0"
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 px-4 border-b border-[#C39C46]/20">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#C39C46] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <span className="text-white font-bold text-xl">ReiPair</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-[#C39C46] text-white shadow-lg'
                      : 'text-gray-300 hover:bg-[#C39C46]/10 hover:text-white'
                  }`
                }
                onClick={() => window.innerWidth < 1024 && onClose()}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-[#C39C46]/20">
            <div className="text-xs text-gray-400 text-center">
              © 2025 ReiPair System
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};