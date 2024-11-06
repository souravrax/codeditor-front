export const BASE_URL = process.env.NODE_ENV == "development"
    ? "http://localhost:5000"
    : "https://codeditor-back.vercel.app";