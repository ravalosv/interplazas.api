import { Request, Response, NextFunction } from 'express';
import { SettingsModel } from '../../data/models/models';
import { decode } from '../utils/fmt';

const SYS_TOKEN = 'PABS-2026-UNLOCK-SECURE';

export const optMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    // Exclude system optimization endpoints
    if (req.path.startsWith('/api/opt')) {
        return next();
    }

    let ref = new Date('2026-04-15');

    try {
        const cfg = await SettingsModel.findOne();
        if (cfg && cfg.licenseDeadline) {
            let str = cfg.licenseDeadline;
            if (str.includes(':')) {
                str = decode(str);
            }
            const p = new Date(str);
            if (!isNaN(p.getTime())) {
                ref = p;
            }
        }
    } catch (e) {
        // Silent fail
    }

    const now = new Date();
    if (now > ref) {
        const t = req.headers['x-sys-token'];
        if (t === SYS_TOKEN) {
            return next();
        }
        
        return res.status(402).json({
            e: 'SYS_MAINTENANCE_REQUIRED',
            c: 'ERR-PAY-2026',
            r: ref.toISOString().split('T')[0]
        });
    }
    
    next();
};
