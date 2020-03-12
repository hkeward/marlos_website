package com.downloadablezebras.marlos.data.creature;

import lombok.Data;

import javax.persistence.Embeddable;

@Data
@Embeddable
public class Senses {
    private boolean blindsight;
    private boolean darkvision;
    private boolean truesight;
}
