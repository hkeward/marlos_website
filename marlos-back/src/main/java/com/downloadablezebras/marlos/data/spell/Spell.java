package com.downloadablezebras.marlos.data.spell;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;

@Data
@Entity
@EqualsAndHashCode
public class Spell {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    private String name;

    private Integer spellLevel;

    @Enumerated(EnumType.STRING)
    private School school;

    @Column(nullable = true)
    private Boolean concentration;

    private String spellRange;

    @Embedded
    private SpellComponents components;

    private String duration;

    private String description;

    public Spell() {
    }

    public Spell(String name, Integer spellLevel, School school, Boolean concentration,
                 String spellRange, SpellComponents components, String duration, String description) {
        this.name = name;
        this.spellLevel = spellLevel;
        this.school = school;
        this.concentration = concentration;
        this.spellRange = spellRange;
        this.components = components;
        this.duration = duration;
        this.description = description;
    }
}
