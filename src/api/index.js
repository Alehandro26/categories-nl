import axios from "axios";
import { sleep } from "../lib/tools.js";
import menuTags from "/public/__mocks__/menu-tags.json";
import dataCity from "/public/__mocks__/data-city.json";
import listCities from "/public/__mocks__/list-cities.json";
import products from "/public/__mocks__/products.json";

// const useMock = !import.meta.env?.MODE === "development";
const useMock = true;

const api = axios.create({
  baseURL: "https://nlstar.com/ru/api/catalog3/v1",
});
/**
 *
 * @param {number} cityId
 * @returns
 */
export async function getMenuTags(cityId) {
  if (useMock) {
    await sleep(1500);
    return menuTags;
  }
  const { data } = await api.get("/menutags", {
    params: {
      city_id: cityId,
    },
  });
  return data;
}

export async function getDataCity(id) {
  if (useMock) {
    return dataCity;
  }
  const { data } = await api.get("/city", {
    params: {
      id,
    },
  });

  return data;
}

export async function getListCities(term, country = "ru") {
  if (useMock) {
    return listCities;
  }
  const { data } = await api.get("/city", {
    params: {
      term,
      country,
    },
  });

  return data;
}

export async function getProducts(cityId, slug) {
  if (useMock) {
    await sleep(1000);
    return products;
  }
  const { data } = await api.get(`/menutags/${slug}/`, {
    params: {
      city_id: cityId,
    },
  });

  return data;
}
