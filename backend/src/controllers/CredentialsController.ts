import crypto from "crypto";

class CredentialsController {
    static generateId = () => crypto.randomBytes(5).toString();
}

export default CredentialsController;
