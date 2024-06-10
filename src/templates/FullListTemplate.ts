import FullList from "../model/FullList";

interface IDOMList {
  ul: HTMLUListElement;
  clear(): void;
  render(fullList: FullList): void;
}

export default class FullListTemplate implements IDOMList {
  ul: HTMLUListElement;

  // Enforce single pattern: only 1 instance of FullListTemplate can exist at a time. We always have 1 instance of FullListTemplate.
  private constructor() {
    this.ul = document.getElementById("listItems") as HTMLUListElement;
  }
  static instance: FullListTemplate = new FullListTemplate();

  // Visually clears all the HTML inside the ul element
  clear(): void {
    this.ul.innerHTML = "";
  }

  // Renders the full list of items
  render(fullList: FullList): void {
    this.clear(); //clear the list before rendering to avoid duplicattion

    fullList.listItems.forEach((item) => {
      const li = document.createElement("li") as HTMLLIElement;
      li.className = "item";

      const check = document.createElement("input") as HTMLInputElement;
      check.type = "checkbox";
      check.id = item.id; //using getters and setters so no need to use _id
      check.tabIndex = 0; // allows the user to navigate to this element using the Tab key
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
