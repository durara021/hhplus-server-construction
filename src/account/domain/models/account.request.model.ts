export class AccountRequestModel {
    userId: number;
    balance: number;
    amount: number;
    status: string;
    createdAt: Date;
  
    updateAmount(newAmount: number): void {
      this.amount = newAmount;
    }

    updateBalance(newBalance: number): void {
      this.balance = newBalance;
    }

    updateStatus(newStatus: string): void {
      this.status = newStatus;
    }
  }
  