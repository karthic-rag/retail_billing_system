package com.software.bakend.service.implementation;

import com.software.bakend.entity.CategoryEntity;
import com.software.bakend.entity.ItemEntity;
import com.software.bakend.io.ItemRequest;
import com.software.bakend.io.ItemResponse;
import com.software.bakend.repository.CategoryRepository;
import com.software.bakend.repository.ItemRepository;
import com.software.bakend.service.FileUploadService;
import com.software.bakend.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ItemServiceImplementation implements ItemService {

    private final FileUploadService fileUploadService;
    private final CategoryRepository categoryRepository;
    private final ItemRepository itemRepository;

    @Override
    public ItemResponse add(ItemRequest request, MultipartFile file) {

        ItemEntity newItem = convertToEntity(request,file);
        newItem = itemRepository.save(newItem);
        return convertToResponse(newItem);
    }

    private ItemResponse convertToResponse(ItemEntity newItem) {
        return ItemResponse.builder()
                .itemId(newItem.getItemId())
                .name(newItem.getName())
                .price(newItem.getPrice())
                .description(newItem.getDescription())
                .imgUrl(newItem.getImgUrl())
                .categoryName(newItem.getCategory().getName())
                .categoryId(newItem.getCategory().getCategoryId())
                .createdAt(newItem.getCreatedAt())
                .updatedAt(newItem.getUpdatedAt())
                .build();
    }

    private ItemEntity convertToEntity(ItemRequest request, MultipartFile file) {
        Map<String, String> image = fileUploadService.uploadFile(file);
        CategoryEntity category = categoryRepository.findByCategoryId(request.getCategoryId()).orElseThrow(
                () -> new RuntimeException("category not found")
        );

        return ItemEntity.builder()
                .itemId(UUID.randomUUID().toString())
                .name(request.getName())
                .price(request.getPrice())
                .description(request.getDescription())
                .category(category)
                .imgUrl(image.get("imageUrl"))
                .publicId(image.get("publicId"))
                .build();
    }

    @Override
    public List<ItemResponse> read() {
        return itemRepository.findAll()
                .stream()
                .map(itemEntity -> convertToResponse(itemEntity))
                .collect(Collectors.toList());

    }

    @Override
    public void deleteItem(String itemId) {
        try{

        ItemEntity existingItem = itemRepository.findByItemId(itemId).orElseThrow(
                () -> new RuntimeException("item not found")
        );

        fileUploadService.deleteFile(existingItem.getPublicId());
        itemRepository.delete(existingItem);
        }catch (Exception ex){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "unable to delete item");
        }
    }
}
