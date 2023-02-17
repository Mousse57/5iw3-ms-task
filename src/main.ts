import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: `0.0.0.0:${process.env.PORT}`,
        package: 'task.v1alpha',
        protoPath: join(
          __dirname,
          process.env.PROTO_PATH || './proto/task/v1alpha/task.proto',
        ),
      },
    },
  );

  await app.listen();
}
bootstrap();
