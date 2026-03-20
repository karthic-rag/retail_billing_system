package com.software.backend.service;

import com.software.backend.io.ItemRequest;
import com.software.backend.io.ItemResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ItemService {
    ItemResponse add(ItemRequest request, MultipartFile file);

    List<ItemResponse> read();

    void deleteItem(String itemId);
}
