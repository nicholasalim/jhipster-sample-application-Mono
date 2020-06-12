package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.JhipsterMonolithicApp;
import com.mycompany.myapp.domain.TblUser;
import com.mycompany.myapp.repository.TblUserRepository;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link TblUserResource} REST controller.
 */
@SpringBootTest(classes = JhipsterMonolithicApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class TblUserResourceIT {
    private static final String DEFAULT_USERNAME = "AAAAAAAAAA";
    private static final String UPDATED_USERNAME = "BBBBBBBBBB";

    private static final String DEFAULT_PASSWORD = "AAAAAAAAAA";
    private static final String UPDATED_PASSWORD = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_USER_ROLE = "AAAAAAAAAA";
    private static final String UPDATED_USER_ROLE = "BBBBBBBBBB";

    private static final Instant DEFAULT_LAST_LOGIN = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_LAST_LOGIN = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_DELETE_DT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DELETE_DT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_DELETE_BY = "AAAAAAAAAA";
    private static final String UPDATED_DELETE_BY = "BBBBBBBBBB";

    private static final String DEFAULT_CREATE_BY = "AAAAAAAAAA";
    private static final String UPDATED_CREATE_BY = "BBBBBBBBBB";

    private static final Instant DEFAULT_CREATE_DT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATE_DT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_UPD_BY = "AAAAAAAAAA";
    private static final String UPDATED_UPD_BY = "BBBBBBBBBB";

    private static final Instant DEFAULT_LAST_TIMESTP = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_LAST_TIMESTP = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private TblUserRepository tblUserRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTblUserMockMvc;

    private TblUser tblUser;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TblUser createEntity(EntityManager em) {
        TblUser tblUser = new TblUser()
            .username(DEFAULT_USERNAME)
            .password(DEFAULT_PASSWORD)
            .name(DEFAULT_NAME)
            .email(DEFAULT_EMAIL)
            .userRole(DEFAULT_USER_ROLE)
            .lastLogin(DEFAULT_LAST_LOGIN)
            .deleteDt(DEFAULT_DELETE_DT)
            .deleteBy(DEFAULT_DELETE_BY)
            .createBy(DEFAULT_CREATE_BY)
            .createDt(DEFAULT_CREATE_DT)
            .updBy(DEFAULT_UPD_BY)
            .lastTimestp(DEFAULT_LAST_TIMESTP);
        return tblUser;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TblUser createUpdatedEntity(EntityManager em) {
        TblUser tblUser = new TblUser()
            .username(UPDATED_USERNAME)
            .password(UPDATED_PASSWORD)
            .name(UPDATED_NAME)
            .email(UPDATED_EMAIL)
            .userRole(UPDATED_USER_ROLE)
            .lastLogin(UPDATED_LAST_LOGIN)
            .deleteDt(UPDATED_DELETE_DT)
            .deleteBy(UPDATED_DELETE_BY)
            .createBy(UPDATED_CREATE_BY)
            .createDt(UPDATED_CREATE_DT)
            .updBy(UPDATED_UPD_BY)
            .lastTimestp(UPDATED_LAST_TIMESTP);
        return tblUser;
    }

    @BeforeEach
    public void initTest() {
        tblUser = createEntity(em);
    }

    @Test
    @Transactional
    public void createTblUser() throws Exception {
        int databaseSizeBeforeCreate = tblUserRepository.findAll().size();
        // Create the TblUser
        restTblUserMockMvc
            .perform(post("/api/tbl-users").contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(tblUser)))
            .andExpect(status().isCreated());

        // Validate the TblUser in the database
        List<TblUser> tblUserList = tblUserRepository.findAll();
        assertThat(tblUserList).hasSize(databaseSizeBeforeCreate + 1);
        TblUser testTblUser = tblUserList.get(tblUserList.size() - 1);
        assertThat(testTblUser.getUsername()).isEqualTo(DEFAULT_USERNAME);
        assertThat(testTblUser.getPassword()).isEqualTo(DEFAULT_PASSWORD);
        assertThat(testTblUser.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testTblUser.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testTblUser.getUserRole()).isEqualTo(DEFAULT_USER_ROLE);
        assertThat(testTblUser.getLastLogin()).isEqualTo(DEFAULT_LAST_LOGIN);
        assertThat(testTblUser.getDeleteDt()).isEqualTo(DEFAULT_DELETE_DT);
        assertThat(testTblUser.getDeleteBy()).isEqualTo(DEFAULT_DELETE_BY);
        assertThat(testTblUser.getCreateBy()).isEqualTo(DEFAULT_CREATE_BY);
        assertThat(testTblUser.getCreateDt()).isEqualTo(DEFAULT_CREATE_DT);
        assertThat(testTblUser.getUpdBy()).isEqualTo(DEFAULT_UPD_BY);
        assertThat(testTblUser.getLastTimestp()).isEqualTo(DEFAULT_LAST_TIMESTP);
    }

    @Test
    @Transactional
    public void createTblUserWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tblUserRepository.findAll().size();

        // Create the TblUser with an existing ID
        tblUser.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTblUserMockMvc
            .perform(post("/api/tbl-users").contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(tblUser)))
            .andExpect(status().isBadRequest());

        // Validate the TblUser in the database
        List<TblUser> tblUserList = tblUserRepository.findAll();
        assertThat(tblUserList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTblUsers() throws Exception {
        // Initialize the database
        tblUserRepository.saveAndFlush(tblUser);

        // Get all the tblUserList
        restTblUserMockMvc
            .perform(get("/api/tbl-users?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tblUser.getId().intValue())))
            .andExpect(jsonPath("$.[*].username").value(hasItem(DEFAULT_USERNAME)))
            .andExpect(jsonPath("$.[*].password").value(hasItem(DEFAULT_PASSWORD)))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)))
            .andExpect(jsonPath("$.[*].userRole").value(hasItem(DEFAULT_USER_ROLE)))
            .andExpect(jsonPath("$.[*].lastLogin").value(hasItem(DEFAULT_LAST_LOGIN.toString())))
            .andExpect(jsonPath("$.[*].deleteDt").value(hasItem(DEFAULT_DELETE_DT.toString())))
            .andExpect(jsonPath("$.[*].deleteBy").value(hasItem(DEFAULT_DELETE_BY)))
            .andExpect(jsonPath("$.[*].createBy").value(hasItem(DEFAULT_CREATE_BY)))
            .andExpect(jsonPath("$.[*].createDt").value(hasItem(DEFAULT_CREATE_DT.toString())))
            .andExpect(jsonPath("$.[*].updBy").value(hasItem(DEFAULT_UPD_BY)))
            .andExpect(jsonPath("$.[*].lastTimestp").value(hasItem(DEFAULT_LAST_TIMESTP.toString())));
    }

    @Test
    @Transactional
    public void getTblUser() throws Exception {
        // Initialize the database
        tblUserRepository.saveAndFlush(tblUser);

        // Get the tblUser
        restTblUserMockMvc
            .perform(get("/api/tbl-users/{id}", tblUser.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(tblUser.getId().intValue()))
            .andExpect(jsonPath("$.username").value(DEFAULT_USERNAME))
            .andExpect(jsonPath("$.password").value(DEFAULT_PASSWORD))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL))
            .andExpect(jsonPath("$.userRole").value(DEFAULT_USER_ROLE))
            .andExpect(jsonPath("$.lastLogin").value(DEFAULT_LAST_LOGIN.toString()))
            .andExpect(jsonPath("$.deleteDt").value(DEFAULT_DELETE_DT.toString()))
            .andExpect(jsonPath("$.deleteBy").value(DEFAULT_DELETE_BY))
            .andExpect(jsonPath("$.createBy").value(DEFAULT_CREATE_BY))
            .andExpect(jsonPath("$.createDt").value(DEFAULT_CREATE_DT.toString()))
            .andExpect(jsonPath("$.updBy").value(DEFAULT_UPD_BY))
            .andExpect(jsonPath("$.lastTimestp").value(DEFAULT_LAST_TIMESTP.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTblUser() throws Exception {
        // Get the tblUser
        restTblUserMockMvc.perform(get("/api/tbl-users/{id}", Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTblUser() throws Exception {
        // Initialize the database
        tblUserRepository.saveAndFlush(tblUser);

        int databaseSizeBeforeUpdate = tblUserRepository.findAll().size();

        // Update the tblUser
        TblUser updatedTblUser = tblUserRepository.findById(tblUser.getId()).get();
        // Disconnect from session so that the updates on updatedTblUser are not directly saved in db
        em.detach(updatedTblUser);
        updatedTblUser
            .username(UPDATED_USERNAME)
            .password(UPDATED_PASSWORD)
            .name(UPDATED_NAME)
            .email(UPDATED_EMAIL)
            .userRole(UPDATED_USER_ROLE)
            .lastLogin(UPDATED_LAST_LOGIN)
            .deleteDt(UPDATED_DELETE_DT)
            .deleteBy(UPDATED_DELETE_BY)
            .createBy(UPDATED_CREATE_BY)
            .createDt(UPDATED_CREATE_DT)
            .updBy(UPDATED_UPD_BY)
            .lastTimestp(UPDATED_LAST_TIMESTP);

        restTblUserMockMvc
            .perform(
                put("/api/tbl-users").contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(updatedTblUser))
            )
            .andExpect(status().isOk());

        // Validate the TblUser in the database
        List<TblUser> tblUserList = tblUserRepository.findAll();
        assertThat(tblUserList).hasSize(databaseSizeBeforeUpdate);
        TblUser testTblUser = tblUserList.get(tblUserList.size() - 1);
        assertThat(testTblUser.getUsername()).isEqualTo(UPDATED_USERNAME);
        assertThat(testTblUser.getPassword()).isEqualTo(UPDATED_PASSWORD);
        assertThat(testTblUser.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testTblUser.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testTblUser.getUserRole()).isEqualTo(UPDATED_USER_ROLE);
        assertThat(testTblUser.getLastLogin()).isEqualTo(UPDATED_LAST_LOGIN);
        assertThat(testTblUser.getDeleteDt()).isEqualTo(UPDATED_DELETE_DT);
        assertThat(testTblUser.getDeleteBy()).isEqualTo(UPDATED_DELETE_BY);
        assertThat(testTblUser.getCreateBy()).isEqualTo(UPDATED_CREATE_BY);
        assertThat(testTblUser.getCreateDt()).isEqualTo(UPDATED_CREATE_DT);
        assertThat(testTblUser.getUpdBy()).isEqualTo(UPDATED_UPD_BY);
        assertThat(testTblUser.getLastTimestp()).isEqualTo(UPDATED_LAST_TIMESTP);
    }

    @Test
    @Transactional
    public void updateNonExistingTblUser() throws Exception {
        int databaseSizeBeforeUpdate = tblUserRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTblUserMockMvc
            .perform(put("/api/tbl-users").contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(tblUser)))
            .andExpect(status().isBadRequest());

        // Validate the TblUser in the database
        List<TblUser> tblUserList = tblUserRepository.findAll();
        assertThat(tblUserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTblUser() throws Exception {
        // Initialize the database
        tblUserRepository.saveAndFlush(tblUser);

        int databaseSizeBeforeDelete = tblUserRepository.findAll().size();

        // Delete the tblUser
        restTblUserMockMvc
            .perform(delete("/api/tbl-users/{id}", tblUser.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TblUser> tblUserList = tblUserRepository.findAll();
        assertThat(tblUserList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
