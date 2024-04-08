'use client';
import Papa from 'papaparse';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useHealthDataStore } from '@/stores/health-data.store';
import { useUserStore } from '@/stores/user.store';

import { HealthData } from '@/domain/data/health-data.model';

function hashData(data: string): Buffer {
  // const hash = new Hash();
  // hash.update(data);
  // return hash.digest();
  return new Buffer(data);
}

export default function PrivateDataFileInput() {
  const { setHealthData } = useHealthDataStore();
  const user = useUserStore((state) => state.user);
  const parseCsvFile = (file: any) =>
    new Promise((resolve, reject) => {
      Papa.parse(file, {
        complete: (result) => {
          if (!result.data) reject(result.errors);
          resolve(result.data);
        },
        header: true,
      });
    });
  const handleFileChange = async (event: any) => {
    const file = event.target.files[0];
    const data = (await parseCsvFile(file)) as any[];
    const filteredData = data
      .filter((item) => item.blood_oxygen)
      .map((item) => ({
        ...item,
        id: user.wallet_id,
        first_name: hashData(user.first_name).toString('hex'),
        last_name: hashData(user.last_name).toString('hex'),
      })) as HealthData[];
    setHealthData(filteredData);
  };
  return (
    <div className='grid w-full max-w-sm items-center gap-1.5'>
      <Label htmlFor='picture'>Upload input data file</Label>
      <Input
        id='picture'
        type='file'
        accept='.csv'
        onChange={handleFileChange}
      />
    </div>
  );
}
