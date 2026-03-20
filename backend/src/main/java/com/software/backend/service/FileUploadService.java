package com.software.backend.service;

import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

public interface FileUploadService {
    Map<String, String> uploadFile(MultipartFile file);

    void deleteFile(String publicId);
}
