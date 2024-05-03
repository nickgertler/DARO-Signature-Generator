// Function to generate the email signature HTML
function generateSignatureHTML(fullName, pronouns, jobTitle, phone, email, address, land, seperator) {
    const nameWithPronouns = pronouns ? `${fullName} (${pronouns})` : fullName;
    return `
        <table cellspacing="0" cellpadding="0">
            <tr>
                <td>
                    <img style="max-width: 100px;" src="DARO_Seal_Evergreen_Web.png" alt="DARO Logo">
                </td>
                <td>
                    <h1>${nameWithPronouns}</h1>
                    <h2>${jobTitle} at <a href="https://wearedaro.com">DARO</a></h2>
                    <hr>
                    <h3>${phone}${seperator}<a href="mailto:${email}">${email}</a></h3>
                    <br>
                    <h3>${address}</h3>
                    <p><i class="small-text">${land}</i></p>
                </td>
            </tr>
        </table>
    `;
}

// Function to update the signature output live as the user inputs information
function updateSignatureOutput() {
    const fullName = document.getElementById('fullName').value;
    const jobTitle = document.getElementById('jobTitle').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const pronouns = document.getElementById('pronouns').value;

    const selectedCountry = document.getElementById('country').value;

    // Update address based on selected country
    let address;
    let land;
    if (selectedCountry === 'Canada') {
        address = '1892 Rue Payette, Montréal, QC H3J 1P3';
        land = 'DARO is located on unceded Kanien’kehá:ka territory.\<br\>DARO est situé sur le territoire traditionnel non cédé Kanien\'kehá:ka.'
    } else if (selectedCountry === 'US') {
        address = '24285 Katy Freeway, Suite 300, Katy, Texas 77494';
        land = ''
    } else {
        address = '';
        land = '';
    }

    let seperator;

    if (phone && email) {
        seperator = " | ";
    } else {
        seperator = "";
    }
    const signatureHTML = generateSignatureHTML(fullName, pronouns, jobTitle, phone, email, address, land, seperator);

    // Display the updated signature HTML
    document.getElementById('signatureOutput').innerHTML = signatureHTML;
}

// Add event listeners to input fields to update signature output live
const inputFields = document.querySelectorAll('#signatureForm input');
inputFields.forEach(input => {
    input.addEventListener('input', updateSignatureOutput);
});

// Add event listener for the country dropdown (select)
const countrySelect = document.getElementById('country');
countrySelect.addEventListener('change', updateSignatureOutput);

// Initial update of signature output when page loads
updateSignatureOutput();

// Function to copy signature HTML to clipboard
function copySignatureToClipboard() {
    // Get the signature output container
    const signatureOutput = document.getElementById('signatureOutput');

    // Create a range and selection for the signature output container
    const range = document.createRange();
    range.selectNode(signatureOutput);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);

    // Copy the selection to the clipboard
    try {
        const successful = document.execCommand('copy');
        const message = successful ? 'Signature Copied!' : 'Copy failed. Please try again.';
        const copyButton = document.getElementById('copySignatureButton');
        copyButton.textContent = message;
        setTimeout(() => {
            copyButton.textContent = 'Copy Signature to Clipboard';
        }, 2000); // Reset button text after 2 seconds
    } catch (err) {
        console.error('Copy failed:', err);
        alert('Copy failed. Please try again.');
    }

    // Clear the selection
    window.getSelection().removeAllRanges();
}

// Event listener for "Copy to Clipboard" button
const copyButton = document.getElementById('copySignatureButton');
copyButton.addEventListener('click', copySignatureToClipboard);
