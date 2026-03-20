package com.software.backend.io;

import lombok.*;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryRequest {

    private String name;

    private String description;

    private String bgColor;

}

