import https from 'https';

export const agent = new https.Agent({
    rejectUnauthorized: false,
});