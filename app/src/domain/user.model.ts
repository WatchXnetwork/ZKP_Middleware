export default class User {
  first_name!: string;
  last_name!: string;
  wallet_id!: string;
  constructor(data?: User) {
    if (data) Object.assign(this, data);
  }
}


export type UserStore = {
  hydrated: boolean;
  user: User;
  setUser: (data: Partial<User>) => void;
}