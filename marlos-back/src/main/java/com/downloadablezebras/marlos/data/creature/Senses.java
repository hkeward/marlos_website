package com.downloadablezebras.marlos.data.creature;

import lombok.Data;

import javax.persistence.Embeddable;

@Data
@Embeddable
public class Senses {
    private Boolean blindsight;
    private Boolean darkvision;
    private Boolean tremorsense;
    private Boolean truesight;
    private String other;
}
