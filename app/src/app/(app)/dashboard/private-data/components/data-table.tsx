'use client';
import { ColumnDef } from '@tanstack/react-table';

import { useHealthDataStore } from '@/stores/health-data.store';

import { DataTable } from '@/app/(app)/dashboard/components/data-table';
import { DataTableColumnHeader } from '@/app/(app)/dashboard/components/data-table-column-header';
import { HealthData } from '@/domain/data/health-data.model';

export default function PrivateDataTable() {
  const { healthData } = useHealthDataStore();

  const columns: ColumnDef<HealthData>[] = [
    {
      accessorKey: 'id',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Id' />
      ),
      cell: ({ row }) => <div className='w-[80px]'>{row.getValue('id')}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'blood_oxygen',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Blood Oxygen' />
      ),
      cell: ({ row }) => (
        <div className='w-[80px]'>{row.getValue('blood_oxygen')}</div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'pulse',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Pulse' />
      ),
      cell: ({ row }) => (
        <div className='w-[80px]'>{row.getValue('pulse')}</div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];

  return <DataTable data={healthData} columns={columns} />;
}
