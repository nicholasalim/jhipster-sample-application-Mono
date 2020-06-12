package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.TblUser;
import com.mycompany.myapp.repository.TblUserRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.TblUser}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TblUserResource {
    private final Logger log = LoggerFactory.getLogger(TblUserResource.class);

    private static final String ENTITY_NAME = "tblUser";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TblUserRepository tblUserRepository;

    public TblUserResource(TblUserRepository tblUserRepository) {
        this.tblUserRepository = tblUserRepository;
    }

    /**
     * {@code POST  /tbl-users} : Create a new tblUser.
     *
     * @param tblUser the tblUser to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tblUser, or with status {@code 400 (Bad Request)} if the tblUser has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tbl-users")
    public ResponseEntity<TblUser> createTblUser(@RequestBody TblUser tblUser) throws URISyntaxException {
        log.debug("REST request to save TblUser : {}", tblUser);
        if (tblUser.getId() != null) {
            throw new BadRequestAlertException("A new tblUser cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TblUser result = tblUserRepository.save(tblUser);
        return ResponseEntity
            .created(new URI("/api/tbl-users/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tbl-users} : Updates an existing tblUser.
     *
     * @param tblUser the tblUser to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tblUser,
     * or with status {@code 400 (Bad Request)} if the tblUser is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tblUser couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tbl-users")
    public ResponseEntity<TblUser> updateTblUser(@RequestBody TblUser tblUser) throws URISyntaxException {
        log.debug("REST request to update TblUser : {}", tblUser);
        if (tblUser.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TblUser result = tblUserRepository.save(tblUser);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, tblUser.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tbl-users} : get all the tblUsers.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tblUsers in body.
     */
    @GetMapping("/tbl-users")
    public List<TblUser> getAllTblUsers() {
        log.debug("REST request to get all TblUsers");
        return tblUserRepository.findAll();
    }

    /**
     * {@code GET  /tbl-users/:id} : get the "id" tblUser.
     *
     * @param id the id of the tblUser to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tblUser, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tbl-users/{id}")
    public ResponseEntity<TblUser> getTblUser(@PathVariable Long id) {
        log.debug("REST request to get TblUser : {}", id);
        Optional<TblUser> tblUser = tblUserRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tblUser);
    }

    /**
     * {@code DELETE  /tbl-users/:id} : delete the "id" tblUser.
     *
     * @param id the id of the tblUser to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tbl-users/{id}")
    public ResponseEntity<Void> deleteTblUser(@PathVariable Long id) {
        log.debug("REST request to delete TblUser : {}", id);
        tblUserRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
