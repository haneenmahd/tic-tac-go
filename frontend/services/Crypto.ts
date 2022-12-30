export default class Crypto {
    /**
     * currently conflicts with nextjs client render
     * this results in same avatar id begin send to the client
     * when loading the /play page directly without navigating to it.
    */
    static uid(): string | undefined {
        if (typeof self !== 'undefined' && 'crypto' in self) {
            return self.crypto.randomUUID();
        }
    }
}