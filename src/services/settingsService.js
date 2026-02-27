import api from "@/lib/api";

export const ADS_SETTING_KEYS = [
  "ads_position_one",
  "ads_position_two",
  "ads_position_three",
];

function toKeyValueMap(items = []) {
  return items.reduce((acc, item) => {
    if (!item || typeof item !== "object") return acc;
    const key = item.key ?? item.name ?? item.setting_key;
    if (!key) return acc;
    acc[key] = item.value ?? item.setting_value ?? item.data ?? null;
    return acc;
  }, {});
}

/**
 * Fetch settings values from `settings/getbykey`.
 * @param {string[]} keys
 * @returns {Promise<{ raw: any, items: any[], values: Record<string, any> }>}
 */
export async function fetchSettingsByKeys(keys = []) {
  if (!Array.isArray(keys) || keys.length === 0) {
    return { raw: null, items: [], values: {} };
  }

  const res = await api.post("/settings/getbykey", { keys });
  const raw = res?.data ?? null;

  const items = Array.isArray(raw?.data)
    ? raw.data
    : Array.isArray(raw)
      ? raw
      : [];

  return {
    raw,
    items,
    values: toKeyValueMap(items),
  };
}

/**
 * Convenience helper for ads settings keys.
 * @returns {Promise<{ raw: any, items: any[], values: Record<string, any> }>}
 */
export async function fetchAdsSettings() {
  return fetchSettingsByKeys(ADS_SETTING_KEYS);
}

