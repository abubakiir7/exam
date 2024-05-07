"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTripDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_trip_dto_1 = require("./create-trip.dto");
class UpdateTripDto extends (0, mapped_types_1.PartialType)(create_trip_dto_1.CreateTripDto) {
}
exports.UpdateTripDto = UpdateTripDto;
//# sourceMappingURL=update-trip.dto.js.map