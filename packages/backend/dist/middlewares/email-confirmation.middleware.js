"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendConfirmationLinkByEmail = void 0;
const sendConfirmationLinkByEmail = ({ link, description }) => TryCatch(async (req, res, next) => {
    const email = req.params.email;
    next();
});
exports.sendConfirmationLinkByEmail = sendConfirmationLinkByEmail;
//# sourceMappingURL=email-confirmation.middleware.js.map