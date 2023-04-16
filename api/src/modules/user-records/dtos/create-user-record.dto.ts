import { IUserRecord, UserRecordType } from '@shared';
import { IsDate, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserRecordDto implements IUserRecord {
  @IsNotEmpty({ message: 'Código do Usuário não pode ser vazio.' })
  @IsString({ message: 'Código do Usuário: Campo numérico.' })
  userCode!: string;

  @IsNotEmpty({ message: 'Tipo de registro não pode ser vazio.' })
  @IsEnum(UserRecordType)
  recordType!: UserRecordType;

  @IsNotEmpty({ message: 'Tempo não pode ser vazio.' })
  @IsDate({ message: 'Tempo: Precisa ser um dado de tempo.' })
  timestamp!: Date;
}
