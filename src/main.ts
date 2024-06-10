import FullList from "./model/FullList";
import ListItem from "./model/ListItem";
import FullListTemplate from "./templates/FullListTemplate";

const initApp = (): void => {
  const fullList = FullList.instance;
  const template = FullListTemplate.instance;

  const form = document.getElementById("itemEntryForm") as HTMLFormElement;

  form.addEventListener("submit", (e: SubmitEvent): void => {
    e.preventDefault();
    const input = document.getElementById("newItem") as HTMLInputElement;
    const newEntryText = input.value.trim();
    if (!newEntryText) return;

    const itemId: number = fullList.listItems.length
      ? parseInt(fullList.listItems[fullList.listItems.length - 1].id) + 1
      : 1;

    const newItem = new ListItem(itemId.toString(), newEntryText, false);
    fullList.addItem(newItem);
    template.render(fullList);

    form.reset();
  });

  const clearItems = document.getElementById(
    "clearItemsButton"
  ) as HTMLButtonElement;
  clearItems.addEventListener("click", (): void => {
    fullList.clearList();
    template.clear();
  });

  fullList.load();
  template.render(fullList);
};

//Alternatively you can defer inside the html script tag
document.addEventListener("DOMContentLoaded", initApp);
