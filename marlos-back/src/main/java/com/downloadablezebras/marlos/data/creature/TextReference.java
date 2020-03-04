package com.downloadablezebras.marlos.data.creature;

import lombok.Data;

import javax.persistence.Embeddable;

@Data
@Embeddable
public class TextReference {
    private String book;
    private int pageNumber;
}
