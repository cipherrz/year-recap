export const API_BASE = 'https://year-recap-server-production.up.railway.app';

export async function fetchStats() {
    const res = await fetch(`${API_BASE}/stats`);
    if (!res.ok) throw new Error('Failed to fetch stats');
    return res.json();
}

export async function fetchWishes(limit = 50) {
    const res = await fetch(`${API_BASE}/wishes?limit=${limit}`);
    if (!res.ok) throw new Error('Failed to fetch wishes');
    return res.json();
}

export async function postWish(text: string, nick: string, captchaToken: string) {
    const res = await fetch(`${API_BASE}/wishes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, nick, captchaToken })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to post wish');
    return data;
}

export async function trackVisit() {
    try {
        await fetch(`${API_BASE}/track/visit`, { method: 'POST' });
    } catch (e) {
        console.error('Failed to track visit', e);
    }
}
