import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvConfig, validate } from './config/zod.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, validate
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    PokemonModule,
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService<EnvConfig>) => ({
        uri: configService.get('MONGODB')
      })
    }),
    CommonModule,
    SeedModule
  ],
})
export class AppModule { }
