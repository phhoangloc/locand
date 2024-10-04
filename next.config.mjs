/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: "buoncf.jp",
                port: "",
                pathname: "/locand/**"
            },
        ],
    },
    env: {
        api_url: "http://localhost:4000/",
        ftp_url: "https://buoncf.jp/locand/",

    }
};
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
export default nextConfig;
