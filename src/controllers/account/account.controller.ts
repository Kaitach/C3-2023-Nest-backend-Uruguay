import { Controller, Get, Param, Put, Body, Post } from '@nestjs/common';
import { AccountDtos } from 'src/dtos/accountDtos';
import { AccountEntity } from 'src/persistence';
import { AccountService } from '../../services/account/account.service';

@Controller('account')
export class AccountController {
  constructor(private readonly AccountService: AccountService) {}


  @Post('newAccount')
  createAccount(account: AccountDtos): AccountEntity {
    
    return this.AccountService.createAccount(account)
  }
  @Get('getBalance')
  getBalance(accountId: string): number {
    
    return this.AccountService.getBalance(accountId)
  }
  @Post('AddBalance')
  addBalance(accountId: string, amount: number): void{
    
    return this.AccountService.addBalance(accountId,amount )
  }

  @Post('removeBalance')
  removeBalance(accountId: string, amount: number): void{
    
    return this.AccountService.removeBalance(accountId,amount )
  }

  @Get('getBalance')
  verifyAmountIntoBalance(accountId: string, amount: number): boolean {
    
    return this.AccountService.verifyAmountIntoBalance(accountId, amount)
  }
}
