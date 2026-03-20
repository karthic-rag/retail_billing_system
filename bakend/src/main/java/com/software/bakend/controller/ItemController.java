package com.software.bakend.controller;

import com.software.bakend.io.ItemRequest;
import com.software.bakend.io.ItemResponse;
import com.software.bakend.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import tools.jackson.databind.ObjectMapper;

import java.util.List;

@RestController
@RequestMapping("/items")
@RequiredArgsConstructor
public class ItemController {
    private final ItemService itemService;

    @PostMapping("/add")
    @PreAuthorize("hasRole('ADMIN')")
    @ResponseStatus(HttpStatus.CREATED)
    public ItemResponse addItem(@RequestPart("item")String itemString,
                                @RequestPart("file")MultipartFile file){
        ObjectMapper objectMapper = new ObjectMapper();
        ItemRequest request = null;
        try{
            request = objectMapper.readValue(itemString, ItemRequest.class);
            if(request != null){

            return itemService.add(request, file);
            }else {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Exception while parsing the Json");
            }
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Exception while parsing the Json");
        }
    }

    @GetMapping("/get/all")
    @ResponseStatus(HttpStatus.OK)
    public List<ItemResponse> getAllItems(){
        return itemService.read();
    }

    @DeleteMapping("/delete/{itemId}")
    @PreAuthorize("hasRole('ADMIN')")
    @ResponseStatus(HttpStatus.OK)
    public String deleteCategory(@PathVariable String itemId){
        try{
            itemService.deleteItem(itemId);
            return "item deleted Successfully";
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }
}
