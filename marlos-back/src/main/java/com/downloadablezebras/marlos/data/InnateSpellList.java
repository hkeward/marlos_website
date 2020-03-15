package com.downloadablezebras.marlos.data;

import com.downloadablezebras.marlos.data.spell.Spell;
import lombok.Data;

import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import java.util.ArrayList;
import java.util.List;

@Data
@Embeddable
public class InnateSpellList {
    @ManyToMany
    @JoinTable(name = "creature_innate_at_will")
    private List<Spell> atWill = new ArrayList<>();

    @ManyToMany
    @JoinTable(name = "creature_innate_once")
    private List<Spell> oncePerDay = new ArrayList<>();

    @ManyToMany
    @JoinTable(name = "creature_innate_twice")
    private List<Spell> twicePerDay = new ArrayList<>();

    @ManyToMany
    @JoinTable(name = "creature_innate_thrice")
    private List<Spell> thricePerDay = new ArrayList<>();
}
