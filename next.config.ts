import type { NextConfig } from "next";

// Old WordPress blog posts lived at the site root (with duplicate `-9/-8/-2`
// slug variants). 301 them to the new /blog/ URLs so no link equity is lost.
// Absolute destinations make these single-hop even when they arrive on the
// old taxi-schwechat-transfer.eu domain.
const SITE = "https://jettransfer.sk";
const OLD_POST_SLUGS: [string, string][] = [
  ["ako-zvladnut-rychly-presun-z-viedne-do-bratislavy-bez-cakania", "ako-zvladnut-rychly-presun-z-viedne-do-bratislavy-bez-cakania"],
  ["preco-cestovat-s-fixnou-cenou-pri-letiskovych-transferoch", "preco-cestovat-s-fixnou-cenou-pri-letiskovych-transferoch"],
  ["ranny-transfer-z-bratislavy-na-schwechat-cas-a-pohodlie-bez-stresu", "ranny-transfer-z-bratislavy-na-schwechat-cas-a-pohodlie-bez-stresu"],
  ["ako-si-vybrat-spolahlivu-taxi-sluzbu-prakticke-tipy-pre-cestujucich", "ako-si-vybrat-spolahlivu-taxi-sluzbu-prakticke-tipy-pre-cestujucich"],
  ["ako-si-vybrat-spolahlivu-taxi-sluzbu-prakticke-tipy-a-vyhody", "ako-si-vybrat-spolahlivu-taxi-sluzbu-prakticke-tipy-a-vyhody"],
  ["vip-taxi-sluzba-vieden-bratislava-komfort-a-spolahlivost-na-cestach", "vip-taxi-sluzba-vieden-bratislava-komfort-a-spolahlivost-na-cestach"],
  ["letisko-vieden-schwechat-sprievodca-pre-cestujucich-9", "letisko-vieden-schwechat-sprievodca-pre-cestujucich"],
  ["letisko-vieden-schwechat-sprievodca-pre-cestujucich-8", "letisko-vieden-schwechat-sprievodca-pre-cestujucich"],
  ["cennik-taxi-schwechat-bratislava-prakticky-sprievodca-pre-cestujucich-2", "cennik-taxi-schwechat-bratislava-prakticky-sprievodca-pre-cestujucich"],
  ["taxi-schwechat-bratislava-kompletny-sprievodca-9", "taxi-schwechat-bratislava-kompletny-sprievodca"],
];

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  async redirects() {
    return [
      // old WP post URLs (any host) -> new blog URLs
      ...OLD_POST_SLUGS.map(([oldSlug, newSlug]) => ({
        source: `/${oldSlug}`,
        destination: `${SITE}/blog/${newSlug}`,
        permanent: true,
      })),
      // old privacy-policy slug
      {
        source: "/ochrana-osobnych-udajov-2",
        destination: `${SITE}/ochrana-osobnych-udajov`,
        permanent: true,
      },
      // domain consolidation: taxi-schwechat-transfer.eu -> jettransfer.sk (301, path preserved).
      // Takes effect once the .eu domain is attached to this Cloudflare Pages project.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.taxi-schwechat-transfer.eu" }],
        destination: `${SITE}/:path*`,
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "taxi-schwechat-transfer.eu" }],
        destination: `${SITE}/:path*`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
