import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { importAllFromRequireContext } from '../Helpers/Utilities/RequireContext';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      importAllFromRequireContext(require.context("../Models/Entities/",true)),
    )],
  providers: [
    ...importAllFromRequireContext(require.context("../Services/",true)),
    ...importAllFromRequireContext(require.context("../Daos/",true)),
    ...importAllFromRequireContext(require.context("../WebServices/",true)),
  ],
  controllers: importAllFromRequireContext(require.context("../Controllers/",true)),
  exports: [TypeOrmModule]
})

export class ConcessionaireModule {}