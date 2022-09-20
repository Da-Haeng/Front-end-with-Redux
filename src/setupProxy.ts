import { createProxyMiddleware, RequestHandler } from 'http-proxy-middleware';

export default function (app: { use: (arg0: string, arg1: RequestHandler) => void; }) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: "http://localhost:8080",
            changeOrigin: true,
        })

    );
};