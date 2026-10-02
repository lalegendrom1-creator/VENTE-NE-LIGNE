import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export function Layout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-white flex flex-col">{children}</div>;
}

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

interface BreadcrumbItem {
  label: string;
  to?: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex items-center gap-1 text-sm text-slate-500 py-4 overflow-x-auto">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-1 whitespace-nowrap">
          {item.to ? (
            <Link to={item.to} className="hover:text-blue-900 transition-colors">{item.label}</Link>
          ) : (
            <span className="text-slate-900 font-medium">{item.label}</span>
          )}
          {i < items.length - 1 && <ChevronRight className="w-4 h-4 text-slate-300" />}
        </div>
      ))}
    </nav>
  );
}

export function SectionTitle({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="flex items-end justify-between mb-6">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">{title}</h2>
        {subtitle && <p className="text-slate-500 mt-1 text-sm sm:text-base">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function Badge({ children, variant = 'default' }: { children: ReactNode; variant?: 'default' | 'sale' | 'new' | 'best' }) {
  const variants = {
    default: 'bg-slate-100 text-slate-600',
    sale: 'bg-rose-500 text-white',
    new: 'bg-emerald-500 text-white',
    best: 'bg-blue-900 text-white',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${variants[variant]}`}>
      {children}
    </span>
  );
}
