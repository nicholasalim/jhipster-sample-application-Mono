package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.TblUser;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the TblUser entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TblUserRepository extends JpaRepository<TblUser, Long> {}
