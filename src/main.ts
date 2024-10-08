import {ClassSerializerInterceptor, ValidationPipe, VersioningType} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {NestFactory, Reflector} from '@nestjs/core';
import {useContainer} from 'class-validator';
import {AppModule} from './app.module';
import validationOptions from './utils/validation-options';
import {AllConfigType} from './config';
import {MailService} from './mail';
import {GlobalExceptionFilter} from './utils';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {cors: true});
    useContainer(app.select(AppModule), {fallbackOnErrors: true});
    const configService = app.get(ConfigService<AllConfigType>);
    const mailService = app.get(MailService);

    app.enableShutdownHooks();
    app.setGlobalPrefix(configService.getOrThrow('app.apiPrefix', {infer: true}), {
        exclude: ['/']
    });
    app.enableVersioning({
        type: VersioningType.URI
    });
    app.useGlobalPipes(new ValidationPipe(validationOptions));
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
    app.useGlobalFilters(new GlobalExceptionFilter(configService, mailService));

    await app.listen(configService.getOrThrow('app.port', {infer: true}));
}
void bootstrap();
