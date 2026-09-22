package com.bank_details_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bank_details_backend.entity.BankDetails;

@Repository
public interface BankDetailsRepository extends JpaRepository<BankDetails, Long> {

}
