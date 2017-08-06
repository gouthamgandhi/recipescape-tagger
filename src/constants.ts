const isProd = process.env.NODE_ENV === 'production';
export const FB_APP_ID = '474796816217493';
export const BASE_URL = isProd ? 'https://play.hyeungshikjung.com' : 'http://localhost:8000';
