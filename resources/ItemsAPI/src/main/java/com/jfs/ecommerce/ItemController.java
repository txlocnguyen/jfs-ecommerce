package com.jfs.ecommerce;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping( "/item" )
public class ItemController
{

    final ItemService itemService;


    public ItemController( @Autowired ItemService itemService )
    {
        this.itemService = itemService;
    }
    @CrossOrigin
    @GetMapping( "/all" )
    public Iterable<Item> getItems()
    {
        return itemService.all();
    }
    @CrossOrigin
    @PostMapping
    public Item save( @RequestBody ItemDto itemDto )
    {
        return itemService.save( new Item( itemDto ) );
    }
    @CrossOrigin
    @GetMapping( "/{id}" )
    public Item findItemById( @PathVariable Integer id )
    {
        return itemService.findById( id );
    }
    @CrossOrigin
    @PutMapping( "/{id}" )
    public Item update( @PathVariable int id, @RequestParam(required = false) String name,
                        @RequestParam(required = false) String description,
                        @RequestParam(required = false) String imageUrl)
    {
        itemService.updateItem(id, name, description, imageUrl);
        return itemService.findById( id );
    }
    @CrossOrigin
    @DeleteMapping( "/{id}" )
    public void delete( @PathVariable Integer id )
    {
        itemService.delete( id );
    }

}