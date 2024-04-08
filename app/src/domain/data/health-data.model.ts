export class HealthData {
  id = "";
  first_name = "";
  last_name = "";
  blood_oxygen = 0;
  pulse = 0;
  constructor(data?: HealthData) {
    if (data) Object.assign(this, data)
  }
}

export type HealthDataStore = {
  hydrated: boolean;
  healthData: HealthData[];
  setHealthData: (data: HealthData[]) => void;
  addHealthData: (data: HealthData) => void;
  clearData: () => void;
}