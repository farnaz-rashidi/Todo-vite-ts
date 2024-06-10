import ListItem from "./ListItem";

interface IFullList {
  listItems: ListItem[];
  load(): void;
  saveList(): void;
  clearList(): void;
  addItem(item: ListItem): void;
  removeItem(id: string): void;
}

export default class FullList implements IFullList {
  // Enforce singleton pattern: only 1 instance of FullList can exist at a time. We always have 1 instance of FullList.
  private constructor(private _listItems: ListItem[] = []) {}
  static instance: FullList = new FullList();

  get listItems() {
    return this._listItems;
  }

  load(): void {
    const items: string | null = localStorage.getItem("items");
    if (typeof items !== "string") return;
    const parsedItems: { _id: string; _name: string; _checked: boolean }[] =
      JSON.parse(items);
    parsedItems.forEach((item) => {
      const newListItem = new ListItem(item._id, item._name, item._checked);
      FullList.instance.addItem(newListItem);
    });
  }

  saveList(): void {
    localStorage.setItem("items", JSON.stringify(this._listItems));
  }

  clearList(): void {
    this._listItems = [];
    this.saveList();
  }

  addItem(item: ListItem): void {
    this._listItems.push(item);
    this.saveList();
  }

  removeItem(id: string): void {
    this._listItems = this._listItems.filter((item) => item.id !== id);
    this.saveList();
  }
}
