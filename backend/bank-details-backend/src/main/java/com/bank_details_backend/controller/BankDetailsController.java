package com.bank_details_backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bank_details_backend.entity.BankDetails;
import com.bank_details_backend.service.BankDetailsService;

@RestController
@RequestMapping("/api/bank-details")
@CrossOrigin(origins = "*")
public class BankDetailsController {
	
	private final BankDetailsService service;

	public BankDetailsController(BankDetailsService service) {
		this.service = service;
	}

	// CREATE Banke Details
	@PostMapping
	public BankDetails createBankDetails(@RequestBody BankDetails bankDetails) {
		if (!bankDetails.getAccountNumber()
				.equals(bankDetails.getConfirmAccountNumber())) {
			throw new RuntimeException("Account number and confirm account number do not match ");
		}
		return service.saveBankDetails(bankDetails);
	}

	// Read all bank details
	@GetMapping
	public List<BankDetails> getAllBankDetails() {
		return service.getAllBankDetails();
	}

	// Read bank details by id
	@GetMapping("/{id}")
	public BankDetails getBankDetailsById(@PathVariable Long id) {
		return service.getBankDetailsById(id);
	}

	// Delete bank details by id
	@DeleteMapping("/{id}")
	public String deleteBankDetails(@PathVariable Long id) {
		service.deleteBankDetails(id);
		return "Bank details deleted successfully";
	}
}
