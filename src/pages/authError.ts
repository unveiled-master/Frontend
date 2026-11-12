import axios from 'axios';

export function getAuthErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    const data: unknown = error.response?.data;
    if (data && typeof data === 'object') {
      const payload = data as Record<string, unknown>;
      for (const key of ['message', 'detail', 'error']) {
        const value = payload[key];
        if (typeof value === 'string' && value.trim()) return value;
      }
      const errors = payload.errors;
      if (Array.isArray(errors)) {
        const first = errors.find((item) => typeof item === 'string');
        if (typeof first === 'string') return first;
      }
    }
    if (error.code === 'ERR_NETWORK') return 'Unable to reach the server. Check your connection and try again.';
  }

  return fallback;
}
