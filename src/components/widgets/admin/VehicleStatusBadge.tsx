
type VehicleStatus = 'AVAILABLE' | 'OUT_OF_STOCK' | 'LOW_STOCK' | 'CLEARANCE';

export const VehicleStatusBadge: React.FC<{ status: VehicleStatus }> = ({ status }) => {
  const statusConfig: Record<VehicleStatus, { class: string, label: string }> = {
    AVAILABLE: { 
      class: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
      label: 'Disponible'
    },
    OUT_OF_STOCK: { 
      class: 'bg-rose-50 text-rose-700 ring-rose-600/20',
      label: 'Rupture de stock'
    },
    LOW_STOCK: { 
      class: 'bg-amber-50 text-amber-700 ring-amber-600/20',
      label: 'Stock faible'
    },
    CLEARANCE: { 
      class: 'bg-blue-50 text-blue-700 ring-blue-600/20',
      label: 'Liquidation'
    }
  };

  return (
    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${statusConfig[status].class}`}>
      {statusConfig[status].label}
    </span>
  );
};