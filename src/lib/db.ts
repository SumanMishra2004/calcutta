import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Helper functions for PostGIS operations
export const postgis = {
  // Create a point from latitude and longitude
  point: (lng: number, lat: number) => {
    return `ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326)`;
  },

  // Calculate distance between two points in meters
  distance: (point1: string, point2: string) => {
    return `ST_Distance(${point1}::geography, ${point2}::geography)`;
  },

  // Check if a point is within a certain distance (in meters)
  withinDistance: (point1: string, point2: string, distanceInMeters: number) => {
    return `ST_DWithin(${point1}::geography, ${point2}::geography, ${distanceInMeters})`;
  },

  // Get coordinates from a geometry
  asGeoJSON: (geom: string) => {
    return `ST_AsGeoJSON(${geom})`;
  },
};
