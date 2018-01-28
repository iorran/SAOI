package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.Clazz;

import io.github.jhipster.application.repository.ClazzRepository;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Clazz.
 */
@RestController
@RequestMapping("/api")
public class ClazzResource {

    private final Logger log = LoggerFactory.getLogger(ClazzResource.class);

    private static final String ENTITY_NAME = "clazz";

    private final ClazzRepository clazzRepository;

    public ClazzResource(ClazzRepository clazzRepository) {
        this.clazzRepository = clazzRepository;
    }

    /**
     * POST  /clazzes : Create a new clazz.
     *
     * @param clazz the clazz to create
     * @return the ResponseEntity with status 201 (Created) and with body the new clazz, or with status 400 (Bad Request) if the clazz has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/clazzes")
    @Timed
    public ResponseEntity<Clazz> createClazz(@RequestBody Clazz clazz) throws URISyntaxException {
        log.debug("REST request to save Clazz : {}", clazz);
        if (clazz.getId() != null) {
            throw new BadRequestAlertException("A new clazz cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Clazz result = clazzRepository.save(clazz);
        return ResponseEntity.created(new URI("/api/clazzes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /clazzes : Updates an existing clazz.
     *
     * @param clazz the clazz to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated clazz,
     * or with status 400 (Bad Request) if the clazz is not valid,
     * or with status 500 (Internal Server Error) if the clazz couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/clazzes")
    @Timed
    public ResponseEntity<Clazz> updateClazz(@RequestBody Clazz clazz) throws URISyntaxException {
        log.debug("REST request to update Clazz : {}", clazz);
        if (clazz.getId() == null) {
            return createClazz(clazz);
        }
        Clazz result = clazzRepository.save(clazz);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, clazz.getId().toString()))
            .body(result);
    }

    /**
     * GET  /clazzes : get all the clazzes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of clazzes in body
     */
    @GetMapping("/clazzes")
    @Timed
    public List<Clazz> getAllClazzes() {
        log.debug("REST request to get all Clazzes");
        return clazzRepository.findAllWithEagerRelationships();
        }

    /**
     * GET  /clazzes/:id : get the "id" clazz.
     *
     * @param id the id of the clazz to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the clazz, or with status 404 (Not Found)
     */
    @GetMapping("/clazzes/{id}")
    @Timed
    public ResponseEntity<Clazz> getClazz(@PathVariable Long id) {
        log.debug("REST request to get Clazz : {}", id);
        Clazz clazz = clazzRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(clazz));
    }

    /**
     * DELETE  /clazzes/:id : delete the "id" clazz.
     *
     * @param id the id of the clazz to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/clazzes/{id}")
    @Timed
    public ResponseEntity<Void> deleteClazz(@PathVariable Long id) {
        log.debug("REST request to delete Clazz : {}", id);
        clazzRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
