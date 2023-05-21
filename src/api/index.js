import axios from "axios";

const api = axios.create({
  baseURL: "https://nlstar.com/ru/api/catalog3/v1",
});
/**
 *
 * @param {number} cityId
 * @returns
 */
export async function getMenuTags(cityId) {
  const { data } = await api.get("/menutags", {
    params: {
      city_id: cityId,
    },
  });

  return data;
}

export async function getDataCity(id) {
  const { data } = await api.get("/city", {
    params: {
      id,
    },
  });

  return data;
}

export async function getListCities(term, country = "ru") {
  const { data } = await api.get("/city", {
    params: {
      term,
      country,
    },
  });

  return data;
}
