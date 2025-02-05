import { Injectable, NotFoundException } from '@nestjs/common';
import { DepositModel, PaginationModel } from 'src/Data';

import { DepositEntity } from '../entities';
import { BaseRepository } from './base';
import { DepositRepositoryInterface } from './interfaces/';

@Injectable()
export class DepositRepository
  extends BaseRepository<DepositEntity>
  implements DepositRepositoryInterface
{
  searchByAttributesforOne(
    attributes: keyof DepositEntity,
    dataToSearch: string,
  ): DepositEntity {
    const currentEntity = this.database.find(
      (entity) => entity[attributes] === dataToSearch,
    );
    if (currentEntity) return currentEntity;
    else throw new NotFoundException('The data is not in our database');
  }
  searchByAttributes(
    attributes: keyof DepositEntity,
    dataToSearch: string,
  ): DepositEntity[] {
    const currentEntity = this.database.filter(
      (entity) => entity[attributes] === dataToSearch,
    );
    if (currentEntity) return currentEntity;
    else throw new NotFoundException('The data is not in our database');
  }
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
    else throw new NotFoundException('The data is not in our database');
    return this.database[indexCurrentEntity];
  }

  delete(id: string, soft?: boolean): void {
    const index = this.database.findIndex((item) => item.id === id);

    if (soft === true) {
      this.hardDelete(index);
    } else {
      this.softDelete(index);
    }
  }

  private hardDelete(index: number): void {
    this.database.splice(index, 1);
  }

  private softDelete(index: number): void {
    this.database[index].state = false;
    this.database[index].deletedAt = Date.now();
  }

  findAll(): DepositEntity[] {
    return this.database.filter(
      (item) => typeof item.deletedAt === 'undefined',
    );
  }

  findByAccountId(accountId: string): DepositEntity[] {
    console.log(accountId)
    const currentEntity = this.database.filter(
      (item) => item.accountid.id === accountId,
    );
    if (currentEntity) return currentEntity;
    else throw new NotFoundException('The data is not in our database');
  }

  findByDataRange(accountId: string, dateInit: Date | number, dateEnd: Date | number, paginator?: PaginationModel): DepositEntity[] {
    let finded = this.database.filter(
        (item) => 
          item.deletedAt == undefined &&
          item.date_time >= dateInit &&
          item.date_time <= dateEnd && 
          item.accountid.id == accountId
    );
    if (finded == undefined) throw new NotFoundException('The data is not in our database');
    return finded.slice(paginator?.offset, paginator?.limit);
  }



 
}
