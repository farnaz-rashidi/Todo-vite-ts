import FullList from "../model/FullList";

interface DOMList {
  ul: HTMLUListElement;
  clear(): void;
  render(fullList: FullList): void;
}

export default class ListTemplate implements DOMList {
  ul: HTMLUListElement;
  // single pattern: only 1 instance of ListTemplate can exist at a time. We always have 1 instance of ListTemplate.
  private constructor() {
    this.ul = document.getElementById("listItems") as HTMLUListElement;
  }

  static instance: ListTemplate = new ListTemplate();

  //clears all the HTML inside the ul element
  clear(): void {
    this.ul.innerHTML = "";
  }

  //renders the full list of items
  render(fullList: FullList): void {
    this.clear();
    fullList.listItems.forEach((item) => {
      const li = document.createElement("li") as HTMLLIElement;
      li.className = "item";

      const check = document.createElement("input") as HTMLInputElement;
      check.type = "checkbox";
      check.id = item.id; //using getters and setters so no need to use _id
      check.tabIndex = 0;
      check.checked = item.checked; //using getters and setters so no need to use _checked
      li.append(check);
      check.addEventListener("change", () => {
        item.checked = !item.checked;
        fullList.saveList();
      });

      const label = document.createElement("label") as HTMLLabelElement;
      label.htmlFor = item.id;
      label.textContent = item.name;
      li.append(label);

      const button = document.createElement("button") as HTMLButtonElement;
      button.className = "button";
      button.textContent = "Delete";
      li.append(button);
      button.addEventListener("click", () => {
        fullList.removeItem(item.id);
        this.render(fullList);
      });

      this.ul.append(li);
    });
  }
}
