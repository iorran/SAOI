package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Evaluate;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the Evaluate entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EvaluateRepository extends JpaRepository<Evaluate, Long> {

    @Query("select evaluate from Evaluate evaluate where evaluate.user.login = ?#{principal.username}")
    List<Evaluate> findByUserIsCurrentUser();

}
