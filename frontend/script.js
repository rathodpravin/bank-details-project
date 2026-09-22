const API_URL = "http://localhost:8080/api/bank-details";

const form = document.getElementById("bankForm");


// ======================================================
// 1. SAVE BANK DETAILS - POST
// ======================================================

form.addEventListener("submit", async function (event) {

    event.preventDefault();

    // Get values from HTML form
    const accountHolder =
        document.getElementById("accountHolder").value.trim();

    const accountNumber =
        document.getElementById("accountNumber").value.trim();

    const confirmAccountNumber =
        document.getElementById("confirmAccountNumber").value.trim();

    const ifsc =
        document.getElementById("ifsc").value.trim().toUpperCase();

    const bankName =
        document.getElementById("bankName").value.trim();

    const branch =
        document.getElementById("branch").value.trim();

    const accountType =
        document.getElementById("accountType").value;

    const address =
        document.getElementById("address").value.trim();

    const city =
        document.getElementById("city").value.trim();

    const state =
        document.getElementById("state").value.trim();

    const pincode =
        document.getElementById("pincode").value.trim();


    // ==================================================
    // 2. VALIDATION
    // ==================================================

    if (accountHolder === "") {
        alert("Please enter account holder name.");
        return;
    }

    if (!/^\d+$/.test(accountNumber)) {
        alert("Account number must contain only digits.");
        return;
    }

    if (accountNumber.length < 8) {
        alert("Please enter a valid account number.");
        return;
    }

    if (accountNumber !== confirmAccountNumber) {
        alert("Account number and confirm account number do not match.");
        return;
    }

    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc)) {
        alert("Please enter a valid IFSC code.");
        return;
    }

    if (bankName === "") {
        alert("Please enter bank name.");
        return;
    }

    if (branch === "") {
        alert("Please enter branch.");
        return;
    }

    if (accountType === "") {
        alert("Please select account type.");
        return;
    }

    if (address === "") {
        alert("Please enter address.");
        return;
    }

    if (city === "") {
        alert("Please enter city.");
        return;
    }

    if (state === "") {
        alert("Please enter state.");
        return;
    }

    if (!/^\d{6}$/.test(pincode)) {
        alert("PIN code must contain exactly 6 digits.");
        return;
    }


    // ==================================================
    // 3. CREATE JSON OBJECT
    // ==================================================

    const bankDetails = {

        accountHolder: accountHolder,

        accountNumber: accountNumber,

        confirmAccountNumber: confirmAccountNumber,

        ifsc: ifsc,

        bankName: bankName,

        branch: branch,

        accountType: accountType,

        address: address,

        city: city,

        state: state,

        pincode: pincode
    };


    console.log("Sending data to backend:");
    console.log(bankDetails);


    // ==================================================
    // 4. SEND DATA TO SPRING BOOT
    // ==================================================

    try {

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(bankDetails)
        });


        // Check backend response

        if (!response.ok) {

            const errorMessage = await response.text();

            throw new Error(errorMessage);
        }


        // Convert response to JSON

        const savedData = await response.json();

        console.log("Saved data:");
        console.log(savedData);


        alert(
            "Bank details saved successfully!\n" +
            "Generated ID: " + savedData.id
        );


        // Clear form

        form.reset();


        // Reload records if list exists

        loadBankDetails();

    } catch (error) {

        console.error("Error saving bank details:", error);

        alert(
            "Failed to save bank details.\n\n" +
            "Make sure Spring Boot backend is running on port 8080."
        );
    }

});


// ======================================================
// 5. LOAD ALL BANK DETAILS - GET
// ======================================================

async function loadBankDetails() {

    const bankDetailsList =
        document.getElementById("bankDetailsList");

    if (!bankDetailsList) {
        return;
    }


    try {

        const response = await fetch(API_URL);


        if (!response.ok) {
            throw new Error("Failed to load bank details.");
        }


        const data = await response.json();


        bankDetailsList.innerHTML = "";


        if (data.length === 0) {

            bankDetailsList.innerHTML =
                "<p>No bank details found.</p>";

            return;
        }


        data.forEach(function (bank) {

            const div = document.createElement("div");

            div.className = "bank-card";


            div.innerHTML = `

                <h3>Bank Details</h3>

                <p>
                    <strong>ID:</strong>
                    ${bank.id}
                </p>

                <p>
                    <strong>Account Holder:</strong>
                    ${bank.accountHolder}
                </p>

                <p>
                    <strong>Account Number:</strong>
                    ${bank.accountNumber}
                </p>

                <p>
                    <strong>IFSC:</strong>
                    ${bank.ifsc}
                </p>

                <p>
                    <strong>Bank Name:</strong>
                    ${bank.bankName}
                </p>

                <p>
                    <strong>Branch:</strong>
                    ${bank.branch}
                </p>

                <p>
                    <strong>Account Type:</strong>
                    ${bank.accountType}
                </p>

                <p>
                    <strong>Address:</strong>
                    ${bank.address}
                </p>

                <p>
                    <strong>City:</strong>
                    ${bank.city}
                </p>

                <p>
                    <strong>State:</strong>
                    ${bank.state}
                </p>

                <p>
                    <strong>PIN Code:</strong>
                    ${bank.pincode}
                </p>

                <button
                    type="button"
                    onclick="deleteBankDetails(${bank.id})">
                    Delete
                </button>

                <hr>
            `;


            bankDetailsList.appendChild(div);

        });


    } catch (error) {

        console.error("Error loading bank details:", error);

        bankDetailsList.innerHTML =
            "<p>Unable to load bank details.</p>";
    }
}


// ======================================================
// 6. DELETE BANK DETAILS - DELETE
// ======================================================

async function deleteBankDetails(id) {

    const confirmDelete =
        confirm("Are you sure you want to delete this record?");


    if (!confirmDelete) {
        return;
    }


    try {

        const response = await fetch(
            `${API_URL}/${id}`,
            {
                method: "DELETE"
            }
        );


        if (!response.ok) {
            throw new Error("Failed to delete record.");
        }


        alert("Bank details deleted successfully.");


        // Reload records

        loadBankDetails();


    } catch (error) {

        console.error("Delete error:", error);

        alert("Failed to delete bank details.");
    }
}


// ======================================================
// 7. LOAD DATA WHEN PAGE OPENS
// ======================================================

document.addEventListener("DOMContentLoaded", function () {

    loadBankDetails();

});