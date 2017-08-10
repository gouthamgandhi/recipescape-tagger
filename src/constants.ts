const isProd = process.env.NODE_ENV === 'production';
export const BASE_URL = isProd ? 'https://recipe.hyeungshikjung.com' : 'http://localhost:8000';
export const GOOGLE_APP_ID = '163346241513-66r5f3qq8naciu6k3hj11g3i9nq32llr.apps.googleusercontent.com';
