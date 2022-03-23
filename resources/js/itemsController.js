class ItemsController {
    constructor(currentId = 0) {
        this.items = [];
        this.currentId = currentId;
    }
    addItem(name, description, imageUrl) {
        const item = {
            id: this.currentId++,
            name: name,
            description: description,
            imageUrl: imageUrl
        };
        this.items.push(item);
        localStorage.setItem("items", JSON.stringify(this.items));
        this.save({name, description, imageUrl});
    }
    loadItemsFromLocalStorage() {
        const storageItems = localStorage.getItem("items")
        if (storageItems) {
            const items = JSON.parse(storageItems)
            for (var i = 0, size = items.length; i < size; i++) {
                const item = items[i];
                this.items.push(item);
            }
        }
    }
    save({name, description, imageUrl}){
        const data = { name,  description, imageUrl };

        fetch('https://locnguyen-ecommerce-backend.herokuapp.com/item', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
        console.log('Success:', data);
        })
        .catch((error) => {
        console.error('Error:', error);
        });
    }

    update({name, description, imageUrl}){
        //TODO implement this method
    }

    delete(itemId){
        fetch(`https://locnguyen-ecommerce-backend.herokuapp.com/item/${itemId}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(response => console.log("Success:", response))
        .catch((error) => {
            console.error("Error:", error);
        })
    }

    findById(itemId){
        //TODO implement this method
    }
    
}