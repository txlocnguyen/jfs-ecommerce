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
    public Item update( @RequestBody ItemDto itemDto, @PathVariable Integer id )
    {
        Item item = itemService.findById( id );
        if(itemDto.getName() != ""){
            item.setName( itemDto.getName() );
        } else{
            item.setName(item.getName());
        }
        if(itemDto.getDescription() != ""){
            item.setDescription( itemDto.getDescription() );
        }else{
            item.setDescription(item.getDescription());
        }
        if(itemDto.getImageUrl() != ""){
            item.setImageUrl( itemDto.getImageUrl() );
        }
        else{
            item.setImageUrl( item.getImageUrl() );
        }
        return itemService.save( item );
    }
    @CrossOrigin
    @DeleteMapping( "/{id}" )
    public void delete( @PathVariable Integer id )
    {
        itemService.delete( id );
    }

}