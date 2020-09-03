package com.downloadablezebras.marlos.data.creature;

import lombok.Data;

import javax.persistence.Embeddable;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Data
@Embeddable
public class SpellcastingMeta {
    @Enumerated(EnumType.STRING)
    private Stat ability;

    private String description;
}
