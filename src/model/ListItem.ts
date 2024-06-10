interface IListItem {
  id: string;
  name: string;
  checked: boolean;
}

export default class ListItem implements IListItem {
  constructor(
    private _id: string = "",
    private _name: string = "",
    private _checked: boolean = false
  ) {}

  get id() {
    return this._id;
  }

  set id(id: string) {
    this._id = id;
  }

  get name() {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get checked() {
    return this._checked;
  }

  set checked(checked: boolean) {
    this._checked = checked;
  }
}
