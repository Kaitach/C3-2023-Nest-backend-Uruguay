import { Injectable, NotFoundException } from '@nestjs/common';

import { DepositEntity } from '../entities';
import { BaseRepository } from './base';
import { DepositRepositoryInterface } from './interfaces/';

@Injectable()
export class DepositRepository
  extends BaseRepository<DepositEntity>
  implements DepositRepositoryInterface
{
  register(entity: DepositEntity): DepositEntity {
    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }

  update(id: string, entity: DepositEntity): DepositEntity {
    const indexCurrentEntity = this.database.findIndex(
      (item) => item.id === id && typeof item.deletedAt === 'undefined',
    );
    if (indexCurrentEntity >= 0)
      this.database[indexCurrentEntity] = {
        ...this.database[indexCurrentEntity],
        ...entity,
        id,
      } as DepositEntity;
    else throw new NotFoundException();
    return this.database[indexCurrentEntity];
  }

  delete(id: string, soft?: boolean): void {
    throw new Error('This method is not implemented');
  }

  private hardDelete(index: number): void {
    throw new Error('This method is not implemented');
  }

  private softDelete(index: number): void {
    throw new Error('This method is not implemented');
  }

  findAll(): DepositEntity[] {
    return this.database.filter(
        (item) => typeof item.deletedAt === 'undefined',
      );  }

  findOneById(id: string): DepositEntity {
    const currentEntity = this.database.find(
        (item) => item.id === id && typeof item.deletedAt === 'undefined',
      );
      if (currentEntity) return currentEntity;
      else throw new NotFoundException();
  }

  findByAccountId(accountId: string): DepositEntity[] {
    throw new Error('This method is not implemented');
  }

  findByDataRange(
    dateInit: Date | number,
    dateEnd: Date | number,
  ): DepositEntity[] {
    throw new Error('This method is not implemented');
  }
}
