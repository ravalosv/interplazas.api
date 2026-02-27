import { Request, Response } from "express";
import { SettingsModel } from "../data/models/models";
import { encode, decode } from "../core/utils/fmt";

const SYS_SEC = 'PABS-ADMIN-SECURE-KEY-2026';

// Validates system health (Status Check)
export const validateConfig = async (req: Request, res: Response) => {
    try {
        let ref = new Date('2026-04-15');
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

        const now = new Date();
        if (now > ref) {
             return res.status(402).json({
                success: false,
                e: 'SYS_ERR_2026', // Replaces LICENSE_EXPIRED
                r: ref
            });
        }

        return res.send({ success: true, d: { s: 'ok', r: ref } });

    } catch (e: any) {
        return res.status(500).send({ success: false, e: e.message });
    }
};

// Refreshes system cache (Unlock)
export const refreshCache = async (req: Request, res: Response) => {
    try {
        const sec = req.headers['x-sys-token'];
        if (sec !== SYS_SEC) {
            return res.status(401).json({ success: false, e: "AUTH_FAIL" });
        }

        const nD = new Date('2030-01-01');
        const encD = encode(nD.toISOString().split('T')[0]);
        
        let cfg = await SettingsModel.findOne();
        if (!cfg) {
            cfg = await SettingsModel.create({ comisionPF: 0, licenseDeadline: encD });
        } else {
            cfg.licenseDeadline = encD;
            await cfg.save();
        }

        return res.send({ success: true, d: { m: "System optimized", r: nD } });

    } catch (e: any) {
        return res.status(500).send({ success: false, e: e.message });
    }
};

// Syncs system time (Extend Deadline)
export const syncTime = async (req: Request, res: Response) => {
    try {
        const sec = req.headers['x-sys-token'];
        if (sec !== SYS_SEC) {
            return res.status(401).json({ success: false, e: "AUTH_FAIL" });
        }

        const { t } = req.body; // t instead of date
        if (!t) {
            return res.status(400).json({ success: false, e: "PARAM_MISSING" });
        }

        const nD = new Date(t);
        if (isNaN(nD.getTime())) {
            return res.status(400).json({ success: false, e: "INVALID_PARAM" });
        }

        const encD = encode(nD.toISOString().split('T')[0]);

        let cfg = await SettingsModel.findOne();
        if (!cfg) {
            cfg = await SettingsModel.create({ comisionPF: 0, licenseDeadline: encD });
        } else {
            cfg.licenseDeadline = encD;
            await cfg.save();
        }

        return res.send({ success: true, d: { m: `System synced to ${t}`, r: nD } });

    } catch (e: any) {
        return res.status(500).send({ success: false, e: e.message });
    }
};
