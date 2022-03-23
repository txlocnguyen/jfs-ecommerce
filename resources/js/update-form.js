const itemsController = new ItemsController(0);
const editItemForm = document.querySelector('#editItemForm');
editItemForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const editItemName = document.querySelector('#editItemName');
    const editItemDescription = document.querySelector('#editItemDescription');
    const editItemImageUrl = document.querySelector('#editItemImageUrl');

    // Get the values of the inputs
    const name = editItemName.value;
    const description = editItemDescription.value;
    const imageUrl = editItemImageUrl.value;

    // Add the item to the ItemsController
    itemsController.update(window.sessionStorage.getItem("tempId"), {
        name,
        description,
        imageUrl
    });

    // Clear the form
    editItemName.value = '';
    editItemDescription.value = '';
    editItemImageUrl.value = '';
    setTimeout(() => {
        window.location.href = "./shop.html";
    }, 500);

})
document.getElementById('btncancel').onclick = function() {
    setTimeout(() => {
        window.location.href = "./shop.html";
    }, 300);
}
