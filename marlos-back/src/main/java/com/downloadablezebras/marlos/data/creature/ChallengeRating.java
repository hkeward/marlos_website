package com.downloadablezebras.marlos.data.creature;

import lombok.Data;

import javax.persistence.Embeddable;

@Data
@Embeddable
public class ChallengeRating {
    private int rating;
    private int experience;
}
