'use client';
import { useState } from 'react';

export default function useInputData() {
  const [inputData, setInputData] = useState<Record<string, any>[]>([
    {
      id: '1',
      blood_oxygen: 30,
      pulse: 20,
    },
    {
      id: '2',
      blood_oxygen: 20,
      pulse: 10,
    },
    {
      id: '3',
      blood_oxygen: 22,
      pulse: 14,
    },
  ]);
  return [inputData, setInputData];
}
