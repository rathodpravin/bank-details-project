package com.bank_details_backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.bank_details_backend.entity.BankDetails;
import com.bank_details_backend.repository.BankDetailsRepository;

@Service 
public class BankDetailsService {

    private final BankDetailsRepository repository;
    public BankDetailsService(BankDetailsRepository repository){
        this.repository=repository;
    }

    //save bank details
    public BankDetails saveBankDetails(BankDetails bankDetails){
       return repository.save(bankDetails);
    }
    //get bank all details
    public List<BankDetails> getAllBankDetails(){
        return repository.findAll();
    }

    // get bank details by id
    public BankDetails getBankDetailsById(Long id){
        return repository.findById(id).orElseThrow(()->new RuntimeException("Bank details not found with id:"+id));
    }

    // delete bank details
    public void deleteBankDetails(Long id){
        repository.deleteById(id);
    }
}
