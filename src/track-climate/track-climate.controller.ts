import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Country } from 'src/country/entity/country.entity';
import { ProjectService } from 'src/project/project.service';
import { TokenDetails, TokenReqestType } from 'src/utills/token_details';
import { In } from 'typeorm';
import { TrackcaEntity } from './entity/trackca.entity';
import { TrackClimateService } from './track-climate.service';

@Crud({
  model: {
    type: TrackcaEntity,
  },
  query: {
    join: {
      climateAction: {
        eager: true,
      },
    },
  },
})
@Controller('track-climate')
export class TrackClimateController implements CrudController<TrackcaEntity> {
  constructor(
    public service: TrackClimateService,
    public climateservice: ProjectService,
    private readonly tokenDetails: TokenDetails,
  ) {}

  get base(): CrudController<TrackcaEntity> {
    return this;
  }

  @UseGuards(JwtAuthGuard)
  @Get('getTrackClimateActionDetails')
  async getTrackClimateActionDetails(@Request() request): Promise<any> {
    let countryIdFromTocken: number;
    [countryIdFromTocken] = this.tokenDetails.getDetails([
      TokenReqestType.countryId,
    ]);
    const country = new Country();
    country.id = countryIdFromTocken;
    const projects = await this.climateservice.find({
      select: ['id'],
      where: { country: country },
    });
    let projectIdlist: number[] = [];
    projectIdlist = projects.map(obj => obj.id)

    return this.service.find({
      where: {
        projectId: In(projectIdlist),
      },
      select: ['flag', 'years', 'createdOn', 'achieved', 'expected']
    })
  }

}
