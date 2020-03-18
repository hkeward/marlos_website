package com.downloadablezebras.marlos.data.creature;

import com.downloadablezebras.marlos.data.ability.Ability;
import com.downloadablezebras.marlos.data.action.Action;
import com.downloadablezebras.marlos.data.damagemodifier.DamageModifier;
import com.downloadablezebras.marlos.data.spell.Spell;
import com.downloadablezebras.marlos.data.statuscondition.StatusCondition;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@EqualsAndHashCode
public class Creature {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(nullable = true)
    private int level;

    private String size;

    private String type;

    private String alignment;

    @Column(nullable = true)
    private int ac;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "average", column = @Column(name = "average_hp")),
            @AttributeOverride(name = "hit_die", column = @Column(name = "hit_die"))
    })
    private HP hp;

    private String speed;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "strength", column = @Column(name = "strength")),
            @AttributeOverride(name = "dexterity", column = @Column(name = "dexterity")),
            @AttributeOverride(name = "constitution", column = @Column(name = "constitution")),
            @AttributeOverride(name = "intelligence", column = @Column(name = "intelligence")),
            @AttributeOverride(name = "wisdom", column = @Column(name = "wisdom")),
            @AttributeOverride(name = "charisma", column = @Column(name = "charisma"))
    })
    private AbilityScores abilityScores;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "strength", column = @Column(name = "saving_strength")),
            @AttributeOverride(name = "dexterity", column = @Column(name = "saving_dexterity")),
            @AttributeOverride(name = "constitution", column = @Column(name = "saving_constitution")),
            @AttributeOverride(name = "intelligence", column = @Column(name = "saving_intelligence")),
            @AttributeOverride(name = "wisdom", column = @Column(name = "saving_wisdom")),
            @AttributeOverride(name = "charisma", column = @Column(name = "saving_charisma"))
    })
    private AbilityScores savingThrows;

    private String skills;

    @ManyToMany
    @JoinTable(
            name="creature_damage_immunity",
            joinColumns = @JoinColumn(name = "creature_id"),
            inverseJoinColumns = @JoinColumn(name = "damage_modifier_id")
    )
    private List<DamageModifier> damageImmunities = new ArrayList<>();

    @ManyToMany
    @JoinTable(
            name="creature_damage_vulnerability",
            joinColumns = @JoinColumn(name = "creature_id"),
            inverseJoinColumns = @JoinColumn(name = "damage_modifier_id")
    )
    private List<DamageModifier> damageVulnerabilities = new ArrayList<>();


    @ManyToMany
    @JoinTable(
            name="creature_damage_resistance",
            joinColumns = @JoinColumn(name = "creature_id"),
            inverseJoinColumns = @JoinColumn(name = "damage_modifier_id")
    )
    private List<DamageModifier> damageResistances = new ArrayList<>();

    @Embedded
    private InnateSpellList innateSpells;

    @ManyToMany
    @JoinTable(name="creature_spell")
    private List<Spell> spells;

    @ManyToMany
    @JoinTable(
            name="creature_conditionImmunity",
            joinColumns = @JoinColumn(name = "creature_id"),
            inverseJoinColumns = @JoinColumn(name = "condition_immunity_id"))
    private List<StatusCondition> conditionImmunities = new ArrayList<>();

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "blindsight", column = @Column(name = "blindsight")),
            @AttributeOverride(name = "darkvision", column = @Column(name = "darkvision")),
            @AttributeOverride(name = "truesight", column = @Column(name = "truesight"))
    })
    private Senses senses;

    private String languages;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "rating", column = @Column(name = "challenge_rating")),
            @AttributeOverride(name = "experience", column = @Column(name = "experience"))
    })
    private ChallengeRating cr;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride( name = "book", column = @Column(name = "text_reference_book")),
            @AttributeOverride( name = "pageNumber", column = @Column(name = "text_reference_page_number"))
    })
    private TextReference textReference;

    @ManyToMany
    private List<Ability> creatureAbilities = new ArrayList<>();

    @ManyToMany
    private List<Action> actions = new ArrayList<>();

    @ManyToMany
    private List<Action> legendaryActions = new ArrayList<>();

    public Creature() {

    }

    public Creature(String name, int level, String size, String type, String alignment, int ac, HP hp, String speed, AbilityScores abilityScores,
                    AbilityScores savingThrows, String skills, List<DamageModifier> damageImmunities, List<DamageModifier> damageVulnerabilities,
                    List<DamageModifier> damageResistances, List<StatusCondition> conditionImmunities, Senses senses, String languages, ChallengeRating cr,
                    TextReference textReference, List<Ability> creatureAbilities, List<Action> actions, List<Action> legendaryActions) {
        this.name = name;
        this.level = level;
        this.size = size;
        this.type = type;
        this.alignment = alignment;
        this.ac = ac;
        this.hp = hp;
        this.speed = speed;
        this.abilityScores = abilityScores;
        this.savingThrows = savingThrows;
        this.skills = skills;
        this.damageImmunities = damageImmunities;
        this.damageVulnerabilities = damageVulnerabilities;
        this.damageResistances = damageResistances;
        this.conditionImmunities = conditionImmunities;
        this.senses = senses;
        this.languages = languages;
        this.cr = cr;
        this.textReference = textReference;
        this.creatureAbilities = creatureAbilities;
        this.actions = actions;
        this.legendaryActions = legendaryActions;
    }
}
