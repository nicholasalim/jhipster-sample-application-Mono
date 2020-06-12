package com.mycompany.myapp.domain;

import java.io.Serializable;
import java.time.Instant;
import javax.persistence.*;

/**
 * A TblUser.
 */
@Entity
@Table(name = "tbl_user")
public class TblUser implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    @Column(name = "user_role")
    private String userRole;

    @Column(name = "last_login")
    private Instant lastLogin;

    @Column(name = "delete_dt")
    private Instant deleteDt;

    @Column(name = "delete_by")
    private String deleteBy;

    @Column(name = "create_by")
    private String createBy;

    @Column(name = "create_dt")
    private Instant createDt;

    @Column(name = "upd_by")
    private String updBy;

    @Column(name = "last_timestp")
    private Instant lastTimestp;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public TblUser username(String username) {
        this.username = username;
        return this;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public TblUser password(String password) {
        this.password = password;
        return this;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public TblUser name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public TblUser email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUserRole() {
        return userRole;
    }

    public TblUser userRole(String userRole) {
        this.userRole = userRole;
        return this;
    }

    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }

    public Instant getLastLogin() {
        return lastLogin;
    }

    public TblUser lastLogin(Instant lastLogin) {
        this.lastLogin = lastLogin;
        return this;
    }

    public void setLastLogin(Instant lastLogin) {
        this.lastLogin = lastLogin;
    }

    public Instant getDeleteDt() {
        return deleteDt;
    }

    public TblUser deleteDt(Instant deleteDt) {
        this.deleteDt = deleteDt;
        return this;
    }

    public void setDeleteDt(Instant deleteDt) {
        this.deleteDt = deleteDt;
    }

    public String getDeleteBy() {
        return deleteBy;
    }

    public TblUser deleteBy(String deleteBy) {
        this.deleteBy = deleteBy;
        return this;
    }

    public void setDeleteBy(String deleteBy) {
        this.deleteBy = deleteBy;
    }

    public String getCreateBy() {
        return createBy;
    }

    public TblUser createBy(String createBy) {
        this.createBy = createBy;
        return this;
    }

    public void setCreateBy(String createBy) {
        this.createBy = createBy;
    }

    public Instant getCreateDt() {
        return createDt;
    }

    public TblUser createDt(Instant createDt) {
        this.createDt = createDt;
        return this;
    }

    public void setCreateDt(Instant createDt) {
        this.createDt = createDt;
    }

    public String getUpdBy() {
        return updBy;
    }

    public TblUser updBy(String updBy) {
        this.updBy = updBy;
        return this;
    }

    public void setUpdBy(String updBy) {
        this.updBy = updBy;
    }

    public Instant getLastTimestp() {
        return lastTimestp;
    }

    public TblUser lastTimestp(Instant lastTimestp) {
        this.lastTimestp = lastTimestp;
        return this;
    }

    public void setLastTimestp(Instant lastTimestp) {
        this.lastTimestp = lastTimestp;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TblUser)) {
            return false;
        }
        return id != null && id.equals(((TblUser) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TblUser{" +
            "id=" + getId() +
            ", username='" + getUsername() + "'" +
            ", password='" + getPassword() + "'" +
            ", name='" + getName() + "'" +
            ", email='" + getEmail() + "'" +
            ", userRole='" + getUserRole() + "'" +
            ", lastLogin='" + getLastLogin() + "'" +
            ", deleteDt='" + getDeleteDt() + "'" +
            ", deleteBy='" + getDeleteBy() + "'" +
            ", createBy='" + getCreateBy() + "'" +
            ", createDt='" + getCreateDt() + "'" +
            ", updBy='" + getUpdBy() + "'" +
            ", lastTimestp='" + getLastTimestp() + "'" +
            "}";
    }
}
