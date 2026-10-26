export interface TechnologyBrand {
  icon: string;
  color: string;
  monochrome?: boolean;
}

export const technologyBrands: Record<string, TechnologyBrand> = {
  "Node.js": {
    icon: "/icons/technologies/nodejs.svg",
    color: "#5fa04e",
    monochrome: false,
  },
  TypeScript: {
    icon: "/icons/technologies/typescript.svg",
    color: "#007acc",
    monochrome: false,
  },
  JavaScript: {
    icon: "/icons/technologies/javascript.svg",
    color: "#f0db4f",
    monochrome: false,
  },
  Express: {
    icon: "/icons/technologies/express.svg",
    color: "#444",
    monochrome: true,
  },
  React: {
    icon: "/icons/technologies/react.svg",
    color: "#61dafb",
    monochrome: false,
  },
  "Next.js": {
    icon: "/icons/technologies/nextjs.svg",
    color: "#000",
    monochrome: true,
  },
  Zustand: {
    icon: "/icons/technologies/zustand.svg",
    color: "#443e38",
    monochrome: false,
  },
  MySQL: {
    icon: "/icons/technologies/mysql.svg",
    color: "#00618a",
    monochrome: false,
  },
  Redis: {
    icon: "/icons/technologies/redis.svg",
    color: "#d82c20",
    monochrome: false,
  },
  "Knex.js": {
    icon: "/icons/technologies/knexjs.svg",
    color: "#e16426",
    monochrome: false,
  },
  "Socket.io": {
    icon: "/icons/technologies/socketio.svg",
    color: "#010101",
    monochrome: true,
  },
  Docker: {
    icon: "/icons/technologies/docker.svg",
    color: "#019bc6",
    monochrome: false,
  },
  "GitHub Actions": {
    icon: "/icons/technologies/githubactions.svg",
    color: "#2088FF",
    monochrome: false,
  },
  AWS: {
    icon: "/icons/technologies/amazonwebservices.svg",
    color: "#f90",
    monochrome: false,
  },
  Cloudflare: {
    icon: "/icons/technologies/cloudflare.svg",
    color: "#F38020",
    monochrome: false,
  },
  Linux: {
    icon: "/icons/technologies/linux.svg",
    color: "#000000",
    monochrome: false,
  },
  NixOS: {
    icon: "/icons/technologies/nixos.svg",
    color: "#5277C3",
    monochrome: false,
  },
  NestJS: {
    icon: "/icons/technologies/nestjs.svg",
    color: "#df234f",
    monochrome: false,
  },
  PostgreSQL: {
    icon: "/icons/technologies/postgresql.svg",
    color: "#336791",
    monochrome: false,
  },
  Prisma: {
    icon: "/icons/technologies/prisma.svg",
    color: "#2D3748",
    monochrome: true,
  },
  Java: {
    icon: "/icons/technologies/java.svg",
    color: "#EA2D2E",
    monochrome: false,
  },
  Python: {
    icon: "/icons/technologies/python.svg",
    color: "#ffd845",
    monochrome: false,
  },
  TypeORM: {
    icon: "/icons/technologies/typeorm.svg",
    color: "#FE0803",
    monochrome: true,
  },
};
