import { IsDate, IsEnum, IsInt, IsNotEmpty, IsNumber } from 'class-validator';
import { IUserRecord, UserRecordType } from '@shared';

export class CreateUserRecordDto implements IUserRecord {
  @IsNotEmpty({ message: 'Id do Usuário não pode ser vazio.' })
  @IsNumber({}, { message: 'Id do Usuário: Campo numérico.' })
  @IsInt({ message: 'Id do Usuário: Valor precisa ser um número inteiro.' })
  userId!: number;

  @IsNotEmpty({ message: 'Tipo de registro não pode ser vazio.' })
  @IsEnum(UserRecordType)
  recordType!: UserRecordType;

  @IsNotEmpty({ message: 'Tempo não pode ser vazio.' })
  @IsDate({ message: 'Tempo: Precisa ser um dado de tempo.' })
  timestamp!: Date;
}
