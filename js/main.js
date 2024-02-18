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

function onload() {
  setupAddTagsListener();
  setupRemoveTagsListener();
}

function setupAddTagsListener() {
  var el = document.getElementById("add-tag");
  el.addEventListener("click", function listener() {
    const newTag = window.prompt("Add a New Tag", "tag name");
    if (newTag == null) {
      console.log("canceled");
      return;
    }

    if (tags.includes(newTag)) {
      console.log("tag already in list:", newTag);
    } else {
      tags.push(newTag);
      var elAddItemTags = document.getElementById("add-item-tags");
      if (elAddItemTags != null) {
        elAddItemTags.childNodes.forEach((dropdown) => {
          console.log(dropdown);
          dropdown.replaceWith(createDropdown());
        });
      }
    }

    tags.length > 0
      ? (document.getElementById("remove-tag").disabled = false)
      : (document.getElementById("remove-tag").disabled = true);
  });
}

function setupRemoveTagsListener() {
  var el = document.getElementById("remove-tag");
  el.addEventListener("click", function listener() {
    if (tags.length == 0) {
      console.log("no tags");
      return;
    }

    tags.length > 0
      ? (document.getElementById("remove-tag").disabled = false)
      : (document.getElementById("remove-tag").disabled = true);
  });
}

function addItem() {
  var elAddItemButton = document.getElementById("add-item-button");

  var elAddItemCard = document.createElement("div");
  elAddItemCard.classList.add("add-item-card");

  var elAddItemContainer = createAddItemContainer(elAddItemCard);
  var elAddItemButtons = createAddItemButtons(
    elAddItemCard,
    elAddItemButton,
    elAddItemContainer
  );

  elAddItemCard.appendChild(elAddItemContainer);
  elAddItemCard.appendChild(elAddItemButtons);

  elAddItemButton.replaceWith(elAddItemCard);
}

function createAddItemContainer(elAddItemCard) {
  var container = document.createElement("div");
  container.classList.add("add-item-container");
  container.id = "add-item-container";
  var title = document.createElement("input");
  title.placeholder = "Title";
  title.id = "add-item-container-title";
  title.classList.add("add-item-container-title");

  var description = document.createElement("input");
  description.placeholder = "Description";
  description.id = "add-item-container-description";
  description.classList.add("add-item-container-description");

  var elAddItemTagsContainer = document.createElement("div");
  elAddItemTagsContainer.classList.add("add-item-tags-container");
  elAddItemTagsContainer.id = "add-item-tags-container";
  var elAddItemTags = document.createElement("div");
  elAddItemTags.textContent = "+";
  var elAddItemChosenTags = document.createElement("div");
  elAddItemChosenTags.classList.add("add-item-chosen-tags");
  elAddItemChosenTags.id = "add-item-tags";
  elAddItemTags.addEventListener("click", () => {
    if (tags.length > elAddItemChosenTags.childElementCount) {
      var el = createDropdown();
      elAddItemChosenTags.appendChild(el);
    }
  });

  container.appendChild(title);
  container.appendChild(description);
  container.appendChild(elAddItemTags);
  container.appendChild(elAddItemChosenTags);

  return container;
}

function createDropdown() {
  var el = document.createElement("select");
  var elAddItemTagsPlaceholder = document.createElement("option");
  el.classList.add("add-item-tags");
  el.disabled = true;
  el.appendChild(elAddItemTagsPlaceholder);
  if (tags.length > 0) {
    el.disabled = false;
    elAddItemTagsPlaceholder.textContent = "--Choose Tag--";
    elAddItemTagsPlaceholder.disabled = true;
    elAddItemTagsPlaceholder.selected = true;
    elAddItemTagsPlaceholder.hidden = true;
    tags.forEach((tag) => {
      var option = document.createElement("option");
      option.textContent = tag;
      el.options.add(option);
    });
  } else {
    elAddItemTagsPlaceholder.textContent = "Please add a Tag";
  }

  return el;
}

function createAddItemButtons(
  elAddItemCard,
  elAddItemButton,
  elAddItemContainer
) {
  var buttons = document.createElement("div");
  buttons.classList.add("add-item-buttons");
  var ok = document.createElement("div");
  ok.textContent = "OK";
  ok.classList.add("add-item-ok");
  ok.addEventListener("click", () => {
    var title = elAddItemContainer.querySelector(
      "#add-item-container-title"
    ).value;
    var description = elAddItemContainer.querySelector(
      "#add-item-container-description"
    ).value;
    var tagNodes =
      elAddItemContainer.querySelector("#add-item-tags").childNodes;
    var tags = [];
    tagNodes.forEach((tagNode) => {
      tags.push(tagNode.options[tagNode.selectedIndex].text);
    });

    console.log(tags);
    addRegularItem(title, description, tags);
    elAddItemCard.replaceWith(elAddItemButton);
  });

  var ko = document.createElement("div");
  ko.textContent = "Cancel";
  ko.classList.add("add-item-ko");
  ko.addEventListener("click", () => {
    elAddItemCard.replaceWith(elAddItemButton);
  });

  buttons.appendChild(ok);
  buttons.appendChild(ko);

  return buttons;
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
