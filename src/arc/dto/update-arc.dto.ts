import { PartialType } from '@nestjs/mapped-types';
import { CreateArcDto } from './create-arc.dto';

export class UpdateArcDto extends PartialType(CreateArcDto) {}
