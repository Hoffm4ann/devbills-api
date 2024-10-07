"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParansType = void 0;
exports.validator = validator;
const zod_1 = require("zod");
const app_error_1 = require("../errors/app.error");
const http_status_codes_1 = require("http-status-codes");
var ParansType;
(function (ParansType) {
    ParansType["QUERY"] = "query";
    ParansType["BODY"] = "body";
})(ParansType || (exports.ParansType = ParansType = {}));
function validator(params) {
    return (req, res, next) => {
        const result = zod_1.z.object(params.schema).safeParse(req[params.type]);
        if (!result.success) {
            const errorFormatted = result.error.issues.map((item) => `${item.path.join(".")}: ${item.message}`);
            throw new app_error_1.AppError(errorFormatted, http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY);
        }
        req[params.type] = result.data;
        next();
    };
}
