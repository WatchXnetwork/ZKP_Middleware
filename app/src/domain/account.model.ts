export class Account {
  first_name!: string;
  last_name!: string;
  constructor(data?: Account) {
    if (data) Object.assign(this, data);
  }
}