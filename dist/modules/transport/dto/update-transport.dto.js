"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTransportDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_transport_dto_1 = require("./create-transport.dto");
class UpdateTransportDto extends (0, mapped_types_1.PartialType)(create_transport_dto_1.CreateTransportDto) {
}
exports.UpdateTransportDto = UpdateTransportDto;
//# sourceMappingURL=update-transport.dto.js.map