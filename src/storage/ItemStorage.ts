export function create(item: any) {
  const localStorageItems = localStorage.getItem("items");
  const currentItems = localStorageItems ? JSON.parse(localStorageItems) : [];
  const id = localStorageItems ? JSON.parse(localStorageItems).length + 1 : 1;
  localStorage.setItem(
    "items",
    JSON.stringify([...currentItems, { id, ...item }])
  );
  return true;
}

export function getAll() {
  const localStorageItems = localStorage.getItem("items");
  return localStorageItems ? JSON.parse(localStorageItems) : [];
}

export function getAllBy(filterBy: (item: any) => void) {
  const localStorageItems = localStorage.getItem("items");
  const currentItems = localStorageItems ? JSON.parse(localStorageItems) : [];
  return currentItems.filter(filterBy);
}

export function update(item: any) {
  if (!item.id) {
    return false;
  }

  const localStorageItems = localStorage.getItem("items");
  const currentItems = localStorageItems ? JSON.parse(localStorageItems) : [];
  const filteredItems = currentItems.filter(
    (currentItem: any) => currentItem.id !== item.id
  );

  localStorage.setItem(
    "items",
    JSON.stringify([...filteredItems, { ...item }])
  );

  return true;
}

export function get(id: number) {
  if (!id) {
    return null;
  }

  const localStorageItems = localStorage.getItem("items");
  const currentItems = localStorageItems ? JSON.parse(localStorageItems) : [];
  const foundItem = currentItems.find(
    (currentItem: any) => currentItem.id === id
  );

  return foundItem;
}

export function remove(id: number) {
  if (!id) {
    return false;
  }

  const localStorageItems = localStorage.getItem("items");
  const currentItems = localStorageItems ? JSON.parse(localStorageItems) : [];
  const filteredItems = currentItems.filter(
    (currentItem: any) => currentItem.id !== id
  );

  localStorage.setItem(
    "items",
    JSON.stringify([...filteredItems])
  );

  return true;
}