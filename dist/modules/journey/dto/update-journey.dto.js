"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateJourneyDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_journey_dto_1 = require("./create-journey.dto");
class UpdateJourneyDto extends (0, mapped_types_1.PartialType)(create_journey_dto_1.CreateJourneyDto) {
}
exports.UpdateJourneyDto = UpdateJourneyDto;
//# sourceMappingURL=update-journey.dto.js.map