/** routeReplace
 *  @description Заменяет ключи на значения
 *  @param route {string} - Маршрут
 *  @param key {string} - заменяемый ключ
 *  @param value {string} - значение
 *  @return {string}
 */
export function routeReplace(
  route : string,
  key : string,
  value : string
) : string{
  /** TODO: В идеале побольше проверок */
  return route.replace(':'+key, value);
}

/** routeListReplace
 * @description Заменяем список ключей на список значений. Размеры списков должны совпадать
 * @param {string} route
 * @param {string[]} keys
 * @param {string[]} values
 * @return {string}
 */
export function routeListReplace(
  route : string,
  keys : string[],
  values : string[]
) : string{
  /** TODO: В идеале побольше проверок */
  if(keys.length !== values.length){
    throw new Error('Массив ключей не совпадает с массивом значений');
  }

  keys.forEach((key, id) => {
    let value = values[id];
    route = routeReplace(route, key, value);
  })

  return route;
}
