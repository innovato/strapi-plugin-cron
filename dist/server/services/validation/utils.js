"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.futureDate = exports.minValue = exports.isRequired = exports.validate = void 0;
const validate = (data, validationRules) => {
    var _a;
    const errors = [];
    for (const [attribute, value] of Object.entries(data)) {
        (_a = validationRules[attribute]) === null || _a === void 0 ? void 0 : _a.some((validation) => {
            const error = validation(value, data);
            if (error) {
                errors.push({
                    path: [attribute],
                    message: error,
                });
                return true;
            }
        });
    }
    return errors.length ? errors : null;
};
exports.validate = validate;
const isRequired = (value) => {
    if (!value) {
        return "This vaule is required";
    }
};
exports.isRequired = isRequired;
const minValue = (minValue) => {
    return (value) => {
        if (value < minValue) {
            return `This value must be greater than or equal to ${minValue}`;
        }
    };
};
exports.minValue = minValue;
const futureDate = (value) => {
    if (value === null) {
        return;
    }
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    if (new Date(value) < now) {
        return "This date must be in the future";
    }
};
exports.futureDate = futureDate;
