import { Match } from "ffc-prisma-package/dist/client";

export function parseToZodObject(match: Match) {
  const { matchStartDate, matchEndDate, ...matchObject } = match;
  return {
    ...matchObject,
    matchStartDate: matchStartDate?.toISOString(),
    matchEndDate: matchEndDate?.toISOString(),
  };
}
