package com.software.bakend.service;

import com.software.bakend.io.ItemRequest;
import com.software.bakend.io.ItemResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ItemService {
    ItemResponse add(ItemRequest request, MultipartFile file);

    List<ItemResponse> read();

    void deleteItem(String itemId);
}
