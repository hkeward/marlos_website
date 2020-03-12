package com.downloadablezebras.marlos.data.creature;

import com.downloadablezebras.marlos.data.damagemodifier.DamageModifier;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;

@Data
@Entity
@EqualsAndHashCode
public class CreatureDamageModifier {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @JsonIgnore
    private Long id;

    @ManyToOne
    @JsonIgnore
    private Creature creature;

    @ManyToOne
    private DamageModifier damageModifier;

    @Enumerated(EnumType.STRING)
    private DamageModifierType type;

    public CreatureDamageModifier() {
    }

    public CreatureDamageModifier(DamageModifier damageModifier, DamageModifierType type) {
        this.damageModifier = damageModifier;
        this.type = type;
    }
}
