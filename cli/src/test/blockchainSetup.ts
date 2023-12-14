import { Keyring, KeyringPair, Wallet, POINT_01_CTC } from '../lib';

const createSigner = (keyring: Keyring, who: 'lender' | 'borrower' | 'sudo'): KeyringPair => {
    switch (who) {
        case 'lender':
            return keyring.addFromUri('//Alice');
        case 'borrower':
            return keyring.addFromUri('//Bob');
        case 'sudo':
            return keyring.addFromUri('//Alice');
        default:
            throw new Error(`Unexpected value "${who}"`); // eslint-disable-line
    }
};

const setup = () => {
    process.env.NODE_ENV = 'test';

    if ((global as any).CREDITCOIN_CREATE_WALLET === undefined) {
        (global as any).CREDITCOIN_CREATE_WALLET = Wallet.createRandom; // eslint-disable-line
    }

    if ((global as any).CREDITCOIN_CREATE_SIGNER === undefined) {
        (global as any).CREDITCOIN_CREATE_SIGNER = createSigner; // eslint-disable-line
    }

    // WARNING: when setting global variables `undefined' means no value has been assigned
    // to this variable up to now so we fall-back to the defaults.
    // WARNING: don't change the comparison expression here b/c some variables are actually
    // configured to have a true or false value in different environments!

    if ((global as any).CREDITCOIN_API_URL === undefined) {
        const wsPort = process.env.CREDITCOIN_WS_PORT || '9944';
        (global as any).CREDITCOIN_API_URL = `ws://127.0.0.1:${wsPort}`;
    }

    if ((global as any).CREDITCOIN_MINIMUM_TXN_FEE === undefined) {
        (global as any).CREDITCOIN_MINIMUM_TXN_FEE = POINT_01_CTC;
    }

    if ((global as any).CREDITCOIN_HAS_SUDO === undefined) {
        (global as any).CREDITCOIN_HAS_SUDO = true;
    }
};

export default setup;
