package com.downloadablezebras.marlos.data.creature;

import lombok.Data;

import javax.persistence.Embeddable;

@Data
@Embeddable
public class Speed {
    private String walk;
    private String burrow;
    private String climb;
    private String fly;
    private String swim;
}
