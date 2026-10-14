import { Currency } from '../types';

export const USD_TO_KHR_RATE = 4080;

export function formatPrice(amountUsd: number, currency: Currency): string {
  if (currency === 'KHR') {
    const khrVal = amountUsd * USD_TO_KHR_RATE;
    return `៛ ${khrVal.toLocaleString()}`;
  }
  return `$${amountUsd.toLocaleString()}`;
}

export function formatPriceShort(amountUsd: number, currency: Currency): string {
  if (currency === 'KHR') {
    const khrVal = amountUsd * USD_TO_KHR_RATE;
    if (khrVal >= 1000000000) {
      return `៛ ${(khrVal / 1000000000).toFixed(1)}B`;
    }
    return `៛ ${(khrVal / 1000000).toFixed(0)}M`;
  }
  if (amountUsd >= 1000000) {
    return `$${(amountUsd / 1000000).toFixed(1)}M`;
  }
  return `$${Math.round(amountUsd / 1000)}k`;
}

export function formatApproxKhr(amountUsd: number): string {
  const khr = amountUsd * USD_TO_KHR_RATE;
  return `≈ ៛ ${khr.toLocaleString()} KHR`;
}
