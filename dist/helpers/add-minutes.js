"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMinutesToDate = void 0;
function addMinutesToDate(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
}
exports.addMinutesToDate = addMinutesToDate;
//# sourceMappingURL=add-minutes.js.map