package com.downloadablezebras.marlos.data.spell;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Data
@Embeddable
public class SpellComponents {
    private Boolean verbal;

    private Boolean somatic;

    private String materials;
}
