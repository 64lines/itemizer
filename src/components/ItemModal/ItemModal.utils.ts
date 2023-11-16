import { update, create } from "../../storage/ItemStorage";

export function saveItem(currentItem: any) {
  return currentItem.id ? update(currentItem) : create(currentItem);
}
