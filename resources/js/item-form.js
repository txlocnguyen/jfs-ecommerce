const itemsController = new ItemsController(0);
const newItemForm = document.querySelector('#newItemForm');
newItemForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const newItemName = document.querySelector('#newItemName');
    const newItemDescription = document.querySelector('#newItemDescription');
    const newItemImageUrl = document.querySelector('#newItemImageUrl');

    // Get the values of the inputs
    const name = newItemName.value;
    const description = newItemDescription.value;
    const imageUrl = newItemImageUrl.value;

    /*
        Validation code here
    */

    // Add the item to the ItemsController
    itemsController.addItem(name, description, imageUrl);

    // Clear the form
    newItemName.value = '';
    newItemDescription.value = '';
    newItemImageUrl.value = '';
})