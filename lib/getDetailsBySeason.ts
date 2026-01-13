import config from "@payload-config";
import { getPayload } from "payload";
import type { Payload } from "payload";

let cachedPayload: Payload | null = null;

async function getPayloadInstance(): Promise<Payload> {
  if (cachedPayload) {
    return cachedPayload;
  }

  cachedPayload = await getPayload({ config });
  return cachedPayload;
}

export async function getDetailsBySeason(season: string) {
  try {
    const normalizedSeason = season.toLowerCase().trim();
    const payload = await getPayloadInstance();

    const seasonDetails = await payload.findGlobal({
      slug: "season-details",
      depth: 3,
    });

    if (!seasonDetails) {
      return null;
    }

    const common = (seasonDetails as any).common;
    const availableKeys = Object.keys(seasonDetails).filter(
      (key) =>
        !key.startsWith("_") &&
        key !== "id" &&
        key !== "updatedAt" &&
        key !== "createdAt" &&
        key !== "common"
    );

    const seasonData = (seasonDetails as any)[normalizedSeason];

    if (!seasonData) {
      const matchingKey = availableKeys.find(
        (key) => key.toLowerCase() === normalizedSeason
      );

      if (matchingKey) {
        const matchedSeasonData = (seasonDetails as any)[matchingKey];
        return mergeSeasonData(common, matchedSeasonData);
      }

      return null;
    }

    return mergeSeasonData(common, seasonData);
  } catch (error) {
    return null;
  }
}

function mergeSeasonData(common: any, seasonData: any) {
  if (!common && !seasonData) {
    return null;
  }

  if (!common) {
    return seasonData;
  }

  if (!seasonData) {
    return common;
  }

  return {
    ...seasonData,
    buttons: common.buttons || seasonData.buttons,
    content: common.content || seasonData.content,
    packages: {
      silverPackage: {
        ...(common.packages?.silverPackage || {}),
        ...(seasonData.packages?.silverPackage || {}),
        title:
          common.packages?.silverPackage?.title ||
          seasonData.packages?.silverPackage?.title,
        buttonText:
          common.packages?.silverPackage?.buttonText ||
          seasonData.packages?.silverPackage?.buttonText,
        price: seasonData.packages?.silverPackage?.price,
        features: seasonData.packages?.silverPackage?.features,
      },
      goldPackage: {
        ...(common.packages?.goldPackage || {}),
        ...(seasonData.packages?.goldPackage || {}),
        title:
          common.packages?.goldPackage?.title ||
          seasonData.packages?.goldPackage?.title,
        buttonText:
          common.packages?.goldPackage?.buttonText ||
          seasonData.packages?.goldPackage?.buttonText,
        price: seasonData.packages?.goldPackage?.price,
        features: seasonData.packages?.goldPackage?.features,
      },
    },
  };
}
