import * as crypto from "crypto";

export default class Crypto {
  /**
   * currently conflicts with nextjs client render
   * this results in same avatar id begin send to the client
   * when loading the /play page directly without navigating to it.
  */
  static uid(): string | undefined {
    return crypto.randomBytes(16).toString("hex");
  }
}