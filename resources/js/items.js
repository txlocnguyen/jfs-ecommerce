const itemsController = new ItemsController(0);

function addItemCard(item) {
    const itemHTML = '<div id="' + item.id + '" class="card col-lg-4 col-md-6 col-12" style="width: 18rem;">\n' +
        '    <img src="' + item.imageUrl + '"  alt="product image">\n' +
        '    <div class="card-body">\n' +
        '        <h5 class="card-title">' + item.name + '</h5>\n' +
        '        <p class="card-text">' + item.description + '</p>\n' +
        '        <a href="#" class="btn btn-primary btn-update" title="Edit Item"><i class="fas fa-edit"></i></a>' +
        '        <a href="#" class="btn btn-danger btn-delete" title="Remove Item"><i class="fas fa-trash"></i></a>\n' +
        '    </div>\n' +
        '</div>';
    const itemsContainer = document.getElementById("list-items-row");
    itemsContainer.innerHTML += itemHTML;
    let deleteButton = document.getElementsByClassName("btn-delete");
    for (let i = 0; i < deleteButton.length; i++) {
        let deleteBtn = deleteButton[i];
        deleteBtn.addEventListener("click", () => {
            let item = deleteBtn.parentElement.parentElement;
            itemsController.delete(item.id);
            setTimeout(() => {
                window.location.reload();
            }, 500);
        })
    }
    let updateButton = document.getElementsByClassName("btn-update");
    for (let i = 0; i < updateButton.length; i++) {
        let updateBtn = updateButton[i];
        updateBtn.addEventListener("click", () => {
            let item = updateBtn.parentElement.parentElement;
            window.sessionStorage.setItem("tempId", item.id);
            setTimeout(() => {
                window.location.href = "./update_form.html";
            }, 500);
        })
    }
}

function loadStorageSampleData() {
    if (!localStorage.getItem("items")) {
        const sampleItems = [{
                'name': 'Dress',
                'img': 'https://www.collinsdictionary.com/images/full/dress_31690953_1000.jpg',
                'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin feugiat dui nec enim accumsan, at sodales tortor vestibulum. Etiam blandit vestibulum dolor, eu pharetra nibh interdum eget'
            },
            {
                'name': 'Jeans',
                'img': "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1616602341-re-done-1616602335.jpg?crop=1xw:1xh;center,top&resize=480:*",
                'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin feugiat dui nec enim accumsan, at sodales tortor vestibulum. Etiam blandit vestibulum dolor, eu pharetra nibh interdum eget'
            }
        ];
        localStorage.setItem("items", JSON.stringify(sampleItems));
    }
}

function loadCardsListFromItemsController() {
    for (var i = 0, size = itemsController.items.length; i < size; i++) {
        const item = itemsController.items[i];
        addItemCard(item);
    }
}

function loadItemsFromDatabase() {
    fetch('https://locnguyen-ecommerce-backend.herokuapp.com/item/all')
        .then(response => response.json())
        .then(data => {
            console.log(data.length);
            for (let i = 0; i < data.length; i++) {
                itemsController.items.push(data[i]);
            }
        })
        .then(() => {
            loadCardsListFromItemsController();
        })
        .catch((error) => {
            console.log('Error: ', error);
        })
}
loadStorageSampleData();
loadCardsListFromItemsController();
loadItemsFromDatabase();