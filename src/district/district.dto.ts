import { IntersectionType, PickType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumberString, Length } from 'class-validator';
import { EqualsAny } from '@/common/decorator/EqualsAny';
import { IsNotSymbol } from '@/common/decorator/IsNotSymbol';
import { SortQuery } from '@/sort/sort.dto';
import { VillageSortQuery } from '../village/village.dto';

export class District {
  @IsNotEmpty()
  @IsNumberString()
  @Length(6, 6)
  code: string;

  @IsNotEmpty()
  @IsNotSymbol("'()-./")
  @Length(3, 255)
  name: string;

  @IsNotEmpty()
  @IsNumberString()
  @Length(4, 4)
  regencyCode: string;
}

export class DistrictSortQuery extends SortQuery {
  @EqualsAny(['code', 'name'])
  readonly sortBy?: 'code' | 'name';
}

export class DistrictFindQueries extends IntersectionType(
  PickType(District, ['name'] as const),
  DistrictSortQuery,
) {}

export class DistrictFindByCodeParams extends PickType(District, [
  'code',
] as const) {}

export class DistrictFindVillageParams extends PickType(District, [
  'code',
] as const) {}

export class DistrictFindVillageQueries extends VillageSortQuery {}
