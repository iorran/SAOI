package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Clazz;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Clazz entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ClazzRepository extends JpaRepository<Clazz, Long> {
    @Query("select distinct clazz from Clazz clazz left join fetch clazz.students")
    List<Clazz> findAllWithEagerRelationships();

    @Query("select clazz from Clazz clazz left join fetch clazz.students where clazz.id =:id")
    Clazz findOneWithEagerRelationships(@Param("id") Long id);

}
