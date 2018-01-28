package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.QuestionTemplate;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the QuestionTemplate entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QuestionTemplateRepository extends JpaRepository<QuestionTemplate, Long> {

}
