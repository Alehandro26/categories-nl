/**
 * Возвращает промис, который зарезолвится через заданное количество милисекунд
 * @param {number} time - время в милисекундах
 * @returns {Promise<unknown>}
 */
export function sleep(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}
