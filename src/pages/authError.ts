import axios from 'axios';

function messageFromValue(value: unknown): string | undefined {
  if (typeof value === 'string' && value.trim()) return value.trim();
  if (Array.isArray(value)) {
    const messages = value.map(messageFromValue).filter((item): item is string => Boolean(item));
    return messages.length ? messages.join(' ') : undefined;
  }
  if (value && typeof value === 'object') {
    const payload = value as Record<string, unknown>;
    for (const key of ['message', 'detail', 'error', 'title']) {
      const message = messageFromValue(payload[key]);
      if (message) return message;
    }
    if (payload.errors && typeof payload.errors === 'object') {
      const messages = Object.values(payload.errors).map(messageFromValue).filter((item): item is string => Boolean(item));
      if (messages.length) return messages.join(' ');
    }
  }
  return undefined;
}

export function getAuthErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    const responseMessage = messageFromValue(error.response?.data);
    if (responseMessage) return responseMessage;
    if (error.code === 'ERR_NETWORK') return 'Unable to reach the server. Check your connection and try again.';
    if (error.response) return `${error.response.status} ${error.response.statusText || 'Request failed'}`;
    if (error.code === 'ECONNABORTED') return 'The request timed out. Please try again.';
  }

  if (error instanceof Error && error.message) return error.message;
  return fallback;
}

export const getRequestErrorMessage = getAuthErrorMessage;
