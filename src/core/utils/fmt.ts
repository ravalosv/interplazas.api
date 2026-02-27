import crypto from 'crypto';

// System format utility
const ALG = 'aes-256-cbc';
const K_SRC = 'PABS-INTERNAL-SECURE-KEY-2026'; // Internal salt
const S_KEY = crypto.scryptSync(K_SRC, 'salt', 32);
const IV_L = 16;

export const encode = (val: string): string => {
    const iv = crypto.randomBytes(IV_L);
    const c = crypto.createCipheriv(ALG, S_KEY, iv);
    let e = c.update(val);
    e = Buffer.concat([e, c.final()]);
    return iv.toString('hex') + ':' + e.toString('hex');
};

export const decode = (val: string): string => {
    try {
        const p = val.split(':');
        const iv = Buffer.from(p.shift() as string, 'hex');
        const et = Buffer.from(p.join(':'), 'hex');
        const d = crypto.createDecipheriv(ALG, S_KEY, iv);
        let dt = d.update(et);
        dt = Buffer.concat([dt, d.final()]);
        return dt.toString();
    } catch (err) {
        return '2020-01-01'; // Default safe fallback
    }
};
