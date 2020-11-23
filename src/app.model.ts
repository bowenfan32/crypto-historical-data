import * as mongoose from 'mongoose';

export const CoinSchema = new mongoose.Schema({
    currency: { type: String, lowercase: true },
    date: { type: Date, lowercase: true },
    open: { type: String, lowercase: true },
    high: { type: String, lowercase: true },
    low: { type: String, lowercase: true },
    close: { type: String, lowercase: true },
    volume: { type: String, lowercase: true },
    marketcap: { type: String, lowercase: true },
});

export interface Coin extends mongoose.Document {
    id: string;
    currency: string;
    date: Date;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
    marketcap: string;
}
