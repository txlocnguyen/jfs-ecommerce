package com.jfs.ecommerce;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ItemService {
    private final ItemRepository itemRepository;

    public ItemService(@Autowired ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }


    public Item save(Item item) {
        return itemRepository.save(item);
    }


    public void delete(int itemId) {
        itemRepository.deleteById(itemId);
    }

    public List<Item> all() {
        List<Item> result = new ArrayList<>();
        itemRepository.findAll().forEach(result::add);
        return result;
    }

    public Item findById(int itemId) {
        Optional<Item> itemOptional = itemRepository.findById(itemId);
        if (!itemOptional.isPresent()) {
            throw new IllegalStateException("Item not found.");
        } else {
            return itemOptional.get();
        }
    }
    @Transactional
    public void updateItem(int id, String name, String description, String imageUrl){
        if(itemRepository.existsById(id)){
            Item s = itemRepository.findById(id).get();
            if(s.getName() != name && name != null ){
                s.setName(name);
            }
            if(s.getDescription() != description && description != null){
                s.setDescription(description);
            }
            if(s.getImageUrl() != imageUrl && imageUrl != null ){
                s.setImageUrl(imageUrl);
            }
        } else {
            throw new IllegalStateException("Item not found");
        }
    }
}
