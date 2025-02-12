export const getDetailById = (list, id) => {
  function flattenList() {
    const result = [];

    function flatten(item) {
      result.push(item);
      if (item?.children) {
        item?.children?.forEach?.((child) => result.push(child));
      }
    }
    list.forEach((item) => flatten(item));
    return result;
  }
  return flattenList()?.find((li) => li.target === id) ?? {};
};
