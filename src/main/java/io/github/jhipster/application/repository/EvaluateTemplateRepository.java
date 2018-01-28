package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.EvaluateTemplate;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the EvaluateTemplate entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EvaluateTemplateRepository extends JpaRepository<EvaluateTemplate, Long> {
    @Query("select distinct evaluate_template from EvaluateTemplate evaluate_template left join fetch evaluate_template.questions")
    List<EvaluateTemplate> findAllWithEagerRelationships();

    @Query("select evaluate_template from EvaluateTemplate evaluate_template left join fetch evaluate_template.questions where evaluate_template.id =:id")
    EvaluateTemplate findOneWithEagerRelationships(@Param("id") Long id);

}
