export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'technician' | 'seller' | 'financial';
  created_at: string;
  last_login?: string;
}

export interface Customer {
  id: string;
  name: string;
  document: string; // CPF/CNPJ
  phone: string;
  email?: string;
  address?: string;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  brand: string;
  model: string;
  category: string;
  cost_price: number;
  sale_price: number;
  margin: number;
  quantity: number;
  min_quantity: number;
  serial_number?: string;
  created_at: string;
}

export interface ServiceOrder {
  id: string;
  customer_id: string;
  customer?: Customer;
  device_type: string;
  device_brand: string;
  device_model: string;
  device_serial?: string;
  reported_issue: string;
  technical_diagnosis?: string;
  solution_applied?: string;
  status: 'pending_approval' | 'in_analysis' | 'in_repair' | 'completed' | 'awaiting_pickup';
  total_amount?: number;
  created_at: string;
  updated_at: string;
  technician_id?: string;
  photos_before?: string[];
  photos_after?: string[];
}

export interface Sale {
  id: string;
  customer_id?: string;
  customer?: Customer;
  items: SaleItem[];
  total_amount: number;
  discount: number;
  payment_method: 'cash' | 'debit' | 'credit' | 'pix' | 'installment';
  status: 'completed' | 'pending' | 'cancelled';
  created_at: string;
  seller_id: string;
}

export interface SaleItem {
  id: string;
  product_id: string;
  product?: Product;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface FinancialTransaction {
  id: string;
  type: 'income' | 'expense';
  category: string;
  description: string;
  amount: number;
  due_date: string;
  paid_date?: string;
  status: 'pending' | 'paid' | 'overdue';
  payment_method?: string;
  reference_id?: string; // OS or Sale ID
  created_at: string;
}

export interface DashboardStats {
  total_orders: number;
  pending_orders: number;
  completed_orders: number;
  total_revenue: number;
  monthly_revenue: number;
  low_stock_items: number;
  overdue_payments: number;
}