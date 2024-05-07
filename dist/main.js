"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const factory_1 = require("./logger/factory");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { logger: (0, factory_1.LoggerFactory)('exam') });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Your API Title')
        .setDescription('API description')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map