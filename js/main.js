class DataModel {
  Id;
  Title;
  Description;
  Tags;

  constructor(
    id = "default-id",
    title = "default-title",
    description = "default-description",
    tags = ["tag1", "tag2", "tag3"]
  ) {
    this.Id = id;
    this.Title = title;
    this.Description = description;
    this.Tags = tags;
  }
}

var items = [];
var tags = [];

function addItem() {
  var elAddItemContainer = document.getElementById("add-item-container");
  var elAddItemButton = document.getElementById("add-item-button");

  var elAddItemCard = document.createElement("div");

  var elAddItemTitle = document.createElement("input");
  elAddItemTitle.placeholder = "Title";

  var elAddItemDescription = document.createElement("input");
  elAddItemDescription.placeholder = "Description";

  var elAddItemTags = createTagDropdown();

  var elAddItemTagsAdd = document.createElement("div");
  elAddItemTagsAdd.textContent = "Create a New Tag";
  elAddItemTagsAdd.addEventListener("click", () => {
    const newTag = window.prompt("Add a New Tag", "tag name");
    if (tags.includes(newTag)) {
      console.log("tag already in list:", newTag);
    } else {
      tags.push(newTag);
      elAddItemCard.replaceChild(
        createTagDropdown(),
        document.getElementById("add-item-tags")
      );
    }
  });

  var elAddItemOK = document.createElement("div");
  elAddItemOK.textContent = "OK";
  elAddItemOK.classList.add("add-item-ok");
  elAddItemOK.addEventListener("click", () => {
    addRegularItem(elAddItemTitle.value, elAddItemDescription.value);
    elAddItemContainer.replaceChild(elAddItemButton, elAddItemCard);
  });

  var elAddItemKO = document.createElement("div");
  elAddItemKO.textContent = "KO";
  elAddItemKO.classList.add("add-item-ko");
  elAddItemKO.addEventListener("click", () => {
    elAddItemContainer.replaceChild(elAddItemButton, elAddItemCard);
  });

  elAddItemCard.appendChild(elAddItemTitle);
  elAddItemCard.appendChild(elAddItemDescription);
  elAddItemCard.appendChild(elAddItemTags);
  elAddItemCard.appendChild(elAddItemTagsAdd);
  elAddItemCard.appendChild(elAddItemOK);
  elAddItemCard.appendChild(elAddItemKO);

  elAddItemContainer.replaceChild(elAddItemCard, elAddItemButton);
}

function createTagDropdown() {
  var elAddItemTags = document.createElement("select");
  var elAddItemTagsPlaceholder = document.createElement("option");
  elAddItemTags.id = "add-item-tags";
  elAddItemTags.disabled = true;
  elAddItemTags.appendChild(elAddItemTagsPlaceholder);
  if (tags.length > 0) {
    elAddItemTags.disabled = false;
    elAddItemTagsPlaceholder.textContent = "--Choose Tag--";
    tags.forEach((tag) => {
      var el = document.createElement("option");
      el.textContent = tag;
      elAddItemTags.options.add(el);
    });
  } else {
    elAddItemTagsPlaceholder.textContent = "Please add a Tag";
  }
  return elAddItemTags;
}

function addTestItem() {
  var item = new DataModel(uuidv4());
  items.push(item);
  document.getElementById("item-container").append(createItem(item));
}

function addRegularItem(title, description, tags) {
  var item = new DataModel(uuidv4(), title, description, tags);
  items.push(item);
  document.getElementById("item-container").append(createItem(item));
}

function createItem(item) {
  var elItemCard = document.createElement("div");
  elItemCard.classList.add("item-card");
  elItemCard.id = item.Id;
  var elItem = document.createElement("div");
  elItem.classList.add("item");
  elItem.addEventListener("click", () => {
    var detailsContainer = document.getElementById("details-container");
    var details = document.getElementById("details");
    var el = createDetails(item);
    detailsContainer.replaceChild(el, details);
  });
  elItem.appendChild(document.createTextNode(item.Title));

  var elItemRemove = document.createElement("div");
  elItemRemove.classList.add("item-remove");
  elItemRemove.textContent = "X";
  elItemRemove.addEventListener("click", () => {
    elItemCard.remove();
  });

  elItemCard.appendChild(elItem);
  elItemCard.appendChild(elItemRemove);

  return elItemCard;
}

function createDetails(item) {
  var el = document.createElement("div");
  el.id = "details";
  var elTitle = document.createElement("div");
  elTitle.textContent = item.Title;
  var elDescription = document.createElement("div");
  elDescription.textContent = item.Description;

  var elTagGroup = createTagGroup(item);

  el.appendChild(elTitle);
  el.appendChild(elDescription);
  el.appendChild(elTagGroup);

  return el;
}

function createTagGroup(item) {
  var elTagGroup = document.createElement("div");
  elTagGroup.classList.add("tag-group");
  item.Tags.forEach((tag) => {
    var el = document.createElement("div");
    el.textContent = tag;
    elTagGroup.appendChild(el);
    el.classList.add("tag");
  });

  return elTagGroup;
}

function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}
