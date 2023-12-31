import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Country } from 'src/country/entity/country.entity';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { Sector } from '../sector/sector.entity';
import { EmissionReductioDraftDataEntity } from './entity/emission-reductio-draft-data.entity';

@Injectable()
export class EmissionReductionDraftdataService extends TypeOrmCrudService<EmissionReductioDraftDataEntity> {
  constructor(
    @InjectRepository(EmissionReductioDraftDataEntity)
    repo: Repository<EmissionReductioDraftDataEntity>,

    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {
    super(repo);
  }

  async getEmissionEeductionDraftDataForCountry(
    countryIdFromTocken: number,
    sectorIdFromTocken: number,
  ): Promise<EmissionReductioDraftDataEntity> {
    let filter = '';
    if (countryIdFromTocken != 0) {
      if (filter) {
        filter = `${filter}  and ert.countryId = :countryIdFromTocken`;
      } else {
        filter = `ert.countryId = :countryIdFromTocken`;
      }
    }

    if (sectorIdFromTocken) {
      if (filter) {
        filter = `${filter}  and ert.sectorId = :sectorIdFromTocken`;
      } else {
        filter = `ert.sectorId = :sectorIdFromTocken`;
      }
    } else {
      if (filter) {
        filter = `${filter}  and ert.sectorId is  null `;
      } else {
        filter = `ert.sectorId is  null`;
      }
    }

    const data = this.repo
      .createQueryBuilder('ert')
      .leftJoinAndMapOne(
        'ert.country',
        Country,
        'con',
        'con.id = ert.countryId',
      )
      .leftJoinAndMapOne('ert.sector', Sector, 'sec', 'sec.id = ert.sectorId')
      .where(filter, { countryIdFromTocken, sectorIdFromTocken });
    const result = await data.getOne();

    if (sectorIdFromTocken && !result) {
      return this.getEmissionEeductionDraftDataForCountry(
        countryIdFromTocken,
        undefined,
      );
    }

    if (result) {
      return result;
    }
  }

  async getEmissionReductionDraftDataForReport(
    sectorId: number,
    countryIdFromTocken: number,
    sectorIdFromTocken: number,
  ): Promise<EmissionReductioDraftDataEntity> {
    let filter = '';
    if (countryIdFromTocken != 0) {
      if (filter) {
        filter = `${filter}  and ert.countryId = :countryIdFromTocken`;
      } else {
        filter = `ert.countryId = :countryIdFromTocken`;
      }
    }

    if (sectorIdFromTocken) {
      if (filter) {
        filter = `${filter}  and ert.sectorId = :sectorIdFromTocken`;
      } else {
        filter = `ert.sectorId = :sectorIdFromTocken`;
      }
    } else if (sectorId != 0) {
      if (filter) {
        filter = `${filter}  and ert.sectorId = sectorId `;
      } else {
        filter = `ert.sectorId =  sectorId`;
      }
    } else {
      if (filter) {
        filter = `${filter}  and ert.sectorId is  null `;
      } else {
        filter = `ert.sectorId is  null`;
      }
    }

    const data = this.repo
      .createQueryBuilder('ert')
      .leftJoinAndMapOne('ert.country',
        Country,
        'con',
        'con.id = ert.countryId')
      .leftJoinAndMapOne('ert.sector',
        Sector,
        'sec',
        'sec.id = ert.sectorId')
      .where(filter, { countryIdFromTocken, sectorIdFromTocken, sectorId })
      .orderBy('ert.id', 'ASC');

    const result = await data.getOne();

    if (sectorIdFromTocken && !result) {
      return this.getEmissionReductionDraftDataForReport(
        0,
        countryIdFromTocken,
        undefined,
      );
    }

    if (result) {
      return result;
    }
  }
}
