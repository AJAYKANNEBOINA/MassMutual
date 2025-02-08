import React from 'react';
import { useState } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';  // Import jsPDF
import './Insurance.css';

const InsuranceForm  = () => {
    
    const [insuranceType, setInsuranceType] = useState('');
    const [formData, setFormData] = useState({
        policyNumber: '', nomineeAge: '', phoneNumber:'', policyholderName:'',  additionalProtectionCosts: [],startDate: '', maturityDate: '', sumAssured: '',
        riders: '', policyStatus: '', coverageLimit: '', dependentCoverage: '', networkHospitals: '',
        roomRentLimit: '', daycareCoverage: '', buildingCoverage: '', contentCoverage: '',
        fireProtection: '', theftProtection: '', thirdPartyLiability: '',
    });
     const [premium, setPremium] = useState(0);
    const [tax, setTax] = useState(0);
    const [errors, setErrors] = useState({});
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (!validatePhoneNumber(formData.phoneNumber)) {
                setErrors({
                    ...errors,
                    phoneNumber: 'Invalid phone number. It must be a 10-digit number.'
                });
            } else {
                setErrors({ ...errors, phoneNumber: '' }); // Clear error if valid
            }
        }
    };
    const validatePhoneNumber = (number) => {
        // Example regex for a valid Indian phone number (10 digits)
        const phoneRegex = /^[6-9]\d{9}$/; // Starts with 6, 7, 8, or 9 and followed by 9 digits
        return phoneRegex.test(number);
    };
    // Handle change in insurance type and reset form data
    const handleInsuranceTypeChange = (e) => { setInsuranceType(e.target.value);setFormData({ ...formData, policyNumber: '' });};
    // Handle change in form data inputs
    const handleChange = (event) => { const { name, value } = event.target;  // Correct destructuring here
        setFormData({
          ...formData, [name]: value,  // Use the correct destructured variables
        }); // Add age validation
        if (name === 'nomineeAge') {
          if (value < 18 || value > 100) {
            setErrors({ ...errors, nomineeAge: 'Age must be between 18 and 100' });
          } else {setErrors({ ...errors, nomineeAge: '' });}}
          if (name === 'phoneNumber') {
            setErrors({ ...errors, phoneNumber: '' });
        }
        }; // Clear error if valid
    const calculateTax = (premium, insuranceType) => { let taxRate;
        if (insuranceType === 'life') {
            taxRate = 0.18;  // 18% for Life Insurance
        } else if (insuranceType === 'health') {
            taxRate = 0.12;  // 12% for Health Insurance
        } else {
            taxRate = 0.15;  // 15% for Home Insurance
        }
        return premium * taxRate;
    };
    const lifeRiderCosts = {
        "Critical Illness Rider": 5000,
        "Accidental Death Rider": 2000,
        "Guaranteed Insurability Rider": 4000,
    };
    
    const additionalProtectionCosts = {
        "Fire protection": 2000,         // Example cost for fire protection
        "Theft protection": 3000,        // Example cost for theft protection
        "Third-party liability": 1500,   // Example cost for third-party liability
    };

    // Calculate premium and tax based on selected insurance type
    const calculatePremium = () => {
        let calculatedPremium = 0;
    
        if (insuranceType === 'life') {
            const baseRate = 0.02; // 2% of the sum assured
            let ageFactor = 0;
        
            // Apply age factor only if age is 30 or above
            if (formData.nomineeAge >= 30 && formData.nomineeAge < 40) {
                ageFactor = 0.005; // 0.5% for ages between 30-39
            } else if (formData.nomineeAge >= 40 && formData.nomineeAge < 50) {
                ageFactor = 0.05; // 5% for ages between 40-49
            } else if (formData.nomineeAge >= 50 && formData.nomineeAge < 60) {
                ageFactor = 0.1; // 10% for ages between 50-59
            }
        
            // Calculate premium based on age factor and base rate
            calculatedPremium = (baseRate * formData.sumAssured) + (ageFactor * formData.sumAssured);
        
            // Include riders if any are selected
            if (formData.riders && formData.riders.length > 0) {
                formData.riders.forEach((rider) => {
                    calculatedPremium += lifeRiderCosts[rider] || 0; // Add cost for each selected rider
                });
            }
        
        
    
        } else if (insuranceType === 'health') {
            const baseRate = 5000;
        
            // Ensuring all values are properly parsed as numbers
            const coverageFactor = (Number(formData.coverageLimit) || 0) / 100000;
            const numberOfDependents = Number(formData.numberOfDependents) || 0;
            const roomRentLimit = Number(formData.roomRentLimit) || 0;
            const daycareCoverage = Number(formData.dayCareProcedureCoverage) || 0;
        
            // Calculate the premium using all inputs
            calculatedPremium = 
                (baseRate * coverageFactor) +
                (numberOfDependents * 1500) +
                roomRentLimit +
                daycareCoverage;
        }
        else if(insuranceType==='home'){
        const baseRate = 0.01; // 1% of building coverage
        const contentCoverageFactor = 0.02; // 2% of content coverage
        calculatedPremium = (baseRate * formData.buildingCoverage) + (contentCoverageFactor * formData.contentCoverage);

        // Add additional protection costs for home insurance only
        if (formData.additionalProtectionCosts && formData.additionalProtectionCosts.length > 0) {
            formData.additionalProtectionCosts.forEach((protection) => {
                calculatedPremium += additionalProtectionCosts[protection] || 0; // Add cost for each selected protection
            });
        }
    }
    
        // Set the premium and tax using the calculated values
        const calculatedTax = calculateTax(calculatedPremium, insuranceType);
        setPremium(calculatedPremium);
        setTax(calculatedTax);
    };
    
    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        calculatePremium();
        console.log(formData); // For debugging purposes
    };
    const handleRiderCheckboxChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setFormData((prevData) => ({
                ...prevData,
                riders: [...prevData.riders, value],
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                riders: prevData.riders.filter((rider) => rider !== value),
            }));
        }
    };
    
    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setFormData((prevState) => {
            const updatedCosts = checked
                ? [...prevState.additionalProtectionCosts, value]
                : prevState.additionalProtectionCosts.filter((cost) => cost !== value);

            return {
                ...prevState,
                additionalProtectionCosts: updatedCosts,
            };
        });
    };


    const downloadPDF = () => {
        const doc = new jsPDF('p', 'mm', 'a4');
        const margin = 10;
    
        // Set font style, color, and size for the entire document
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(12);
        doc.setTextColor(50, 50, 50);
    
        // Draw a border around all four sides
        doc.setDrawColor(150, 150, 150);
        doc.setLineWidth(0.5);
        doc.rect(margin, margin, 190, 277);
    
        // Add the MassMutual logo
        const massMutualLogo = '/mm4.png';
        const logoWidth = 25;
        const logoHeight = 15;
        doc.addImage(massMutualLogo, 'PNG', 20, 20, logoWidth, logoHeight);
    
        // Add main title with consistent positioning
        doc.setFontSize(18);
        doc.setTextColor(0, 102, 204);
        doc.text('Insurance Premium Details', 70, 40);
    
        // Subheading for insurance type
        doc.setFontSize(12);
        doc.setTextColor(110, 110, 110);
        doc.text(
            `Insurance Type: ${insuranceType === 'health' ? 'Health' : insuranceType === 'home' ? 'Home' : 'Life'}`,
            70,
            50
        );
    
        // Reset font color for standard text
        doc.setFontSize(12);
        doc.setTextColor(50, 50, 50);
    
        // Section 1: Policyholder Details
        const policyDetailsY = 60;
        const lineSpacing = 8;
    
        // Section Heading: Policyholder Details
        doc.setFontSize(14);
        doc.setTextColor(0, 102, 204);
        doc.text('Policyholder Details', 25, policyDetailsY);
    
        // Policyholder Details Text
        doc.setFontSize(12);
        doc.setTextColor(50, 50, 50);
        doc.text(`Policyholder Name: ${formData.policyholderName}`, 25, policyDetailsY + lineSpacing);
        doc.text(`Phone Number: ${formData.phoneNumber}`, 25, policyDetailsY + lineSpacing * 2);
    
        // Section 2: Policy Details
        let nextYPosition = policyDetailsY + lineSpacing * 4;
    
        // Adjusted Divider line for the top of Section 2
        doc.setDrawColor(150, 150, 150);
        doc.setLineWidth(0.5);
        doc.line(20, nextYPosition - 8, 190, nextYPosition - 8);  // Adjusted Y-position for separation
    
        // Section Heading: Policy Details
        doc.setFontSize(14);
        doc.setTextColor(0, 102, 204);
        doc.text('Policy Details', 25, nextYPosition);
    
        // Policy Details Text
        doc.setFontSize(12);
        doc.setTextColor(50, 50, 50);
        doc.text(
            `Insurance Type: ${insuranceType === 'health' ? 'Health' : insuranceType === 'home' ? 'Home' : 'Life'}`,
            25,
            nextYPosition + lineSpacing
        );
    
        // Only display Start Date and End Date if the insurance type is "Life"
        nextYPosition += lineSpacing * 2;
        const formatDate = (dateString) => {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        };
    
        if (insuranceType === 'life') {
            doc.text(`Policy Start Date: ${formatDate(formData.startDate)}`, 25, nextYPosition);
            nextYPosition += lineSpacing;
            doc.text(`Policy End Date: ${formatDate(formData.maturityDate)}`, 25, nextYPosition);
            nextYPosition += lineSpacing;
    
            // Calculate the number of years between start date and maturity date
            const startDate = new Date(formData.startDate);
            const maturityDate = new Date(formData.maturityDate);
            const yearsDifference = maturityDate.getFullYear() - startDate.getFullYear();
            
            // Ensure yearsDifference is non-negative
            const n = Math.max(yearsDifference, 0);
            const totalPremiumForYears = n * (premium + tax); // Assuming premium includes base premium and tax
    
            doc.text(`Duration: ${n} years`, 25, nextYPosition);
            nextYPosition += lineSpacing;
            doc.text(`Total Premium for ${n} years: ${totalPremiumForYears.toFixed(2)}`, 25, nextYPosition);
            nextYPosition += lineSpacing;
        }
    
        // Section divider line
        doc.setDrawColor(150, 150, 150);
        doc.setLineWidth(0.5);
        doc.line(20, nextYPosition + 5, 190, nextYPosition + 5);
    
        // Section 3: Premium Calculation Breakdown
        const premiumDetailsY = nextYPosition + lineSpacing + 8;
    
        // Section Heading: Premium Calculation Breakdown
        doc.setFontSize(14);
        doc.setTextColor(0, 102, 204);
        doc.text('Premium Calculation Breakdown', 25, premiumDetailsY);
    
        // Premium Details Text
        doc.setFontSize(12);
        doc.setTextColor(50, 50, 50);
        doc.text(`Basic Premium: ${premium.toFixed(2)}`, 25, premiumDetailsY + lineSpacing);
        doc.text(`Total Tax Payable: ${tax.toFixed(2)}`, 25, premiumDetailsY + lineSpacing * 2);
        doc.text(`Total Premium: ${(premium + tax).toFixed(2)} Annually`, 25, premiumDetailsY + lineSpacing * 3);
    
        // Section divider line
        doc.setDrawColor(150, 150, 150);
        doc.setLineWidth(0.5);
        doc.line(20, premiumDetailsY + lineSpacing * 4 + 5, 190, premiumDetailsY + lineSpacing * 4 + 5);
    
        // Section 4: Financial Year
        const financialYearY = premiumDetailsY + lineSpacing * 5 + 8;
        doc.text(`Financial Year: 2024-2025`, 25, financialYearY);
    
        // Footer message
        doc.setFontSize(10);
        doc.setTextColor(120, 120, 120);
        doc.text('Thank you for using our Insurance Premium Calculator!', 20, financialYearY + 20);
    
        // Save PDF
        doc.save('insurance-premium-details.pdf');
    };
    
    
    return (<div className="form-container">
        <h1 className="form-heading">Insurance Premium Calculator</h1>
        <form className="insurance-form" onSubmit={handleSubmit}>
        <div className="form-group">
        <label className="form-label">Name</label>
        <input type="string" className="form-input" name="policyholderName" value={formData.policyholderName || ''} onChange={handleChange} placeholder='Enter Name' autoComplete='off'/>
        {errors.policyholderName && <span className="error-message">{errors.policyholderName}</span>}
    </div>
    <div className="form-group">
  <label className="form-label">PhoneNumber</label>
  <input
    type="text"
    className="form-input"
    name="phoneNumber"
    value={formData.phoneNumber || ''}
    onChange={handleChange}
    onKeyDown={handleKeyDown} // Add keydown event listener
    placeholder="Enter phoneNumber"
    autoComplete='off'
  />
  {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
</div>

           <div className="form-group">
       
<label className="form-label">Insurance Type</label>
<select className="form-input" value={insuranceType} onChange={handleInsuranceTypeChange}>
    <option value="">Select Insurance Type</option>
    <option value="life">Life Insurance</option>
    <option value="health">Health Insurance</option>
    <option value="home">Home Insurance</option>
</select>
</div>

{insuranceType && (
<div className="form-group">
    
</div>
)}

{insuranceType === 'life' && (
<>
    <div className="form-group">
        <label className="form-label">Age</label>
        <input type="number" className="form-input" name="nomineeAge" value={formData.nomineeAge || ''} onChange={handleChange} placeholder='Enter Age' />
        {errors.nomineeAge && <span className="error-message">{errors.nomineeAge}</span>}
    </div>
    <div className="form-group">
      <label className="form-label">Start Date</label>
      <input
        className="form-input"
        type="date"
        name="startDate"
        value={formData.startDate}
        onChange={handleChange}
        required
      />
    </div>
    <div className="form-group">
      <label className="form-label">Maturity Date</label>
      <input
        className="form-input"
        type="date"
        name="maturityDate"
        value={formData.maturityDate}
        onChange={handleChange}
        required
      />
    </div>
    <div className="form-group">
        <label className="form-label">
        <span className="label-text">Sum Assured</span>
        <span className="info-container">
            <i 
            className="material-symbols-outlined info-icon" 
            title="Information about Sum Assured"
            aria-hidden="true"
            >info</i>
                <span className="tooltip">Enter the total amount assured under the policy (e.g., the sum payable on maturity).</span></span></label>
        <input 
        type="number" 
        className="form-input" 
        name="sumAssured" 
        value={formData.sumAssured || ''} 
        onChange={handleChange} />
    </div>
    
    <div className="form-group">
<label className="form-label">Riders<span className="info-container"><i className="material-symbols-outlined info-icon" title="">info</i><span className="tooltip">Enter any riders associated with the policy (e.g., critical illness, accidental death).</span></span></label>
<div className="dropdown">
    <button className="dropdown-button">Select Riders</button>
    <div className="dropdown-content">
        <div className="checkbox-container">
            <label>
                <input
                    type="checkbox"
                    value="Critical Illness Rider"
                    checked={formData.riders.includes("Critical Illness Rider")}
                    onChange={handleRiderCheckboxChange}
                />
                Critical Illness Rider (₹5,000)
            </label>
            <label>
                <input
                    type="checkbox"
                    value="Accidental Death Rider"
                    checked={formData.riders.includes("Accidental Death Rider")}
                    onChange={handleRiderCheckboxChange}
                />
                Accidental Death Rider (₹2,000)
            </label>
            <label>
                <input
                    type="checkbox"
                    value="Guaranteed Insurability Rider"
                    checked={formData.riders.includes("Guaranteed Insurability Rider")}
                    onChange={handleRiderCheckboxChange}
                />
                Guaranteed Insurability Rider (₹4,000)
            </label>
        </div>
    </div>
</div>
</div>

</>
)}

{insuranceType === 'health' && (
<>
    <div className="form-group">
        <label className="form-label">Coverage Limit</label>
        <input 
            type="number" 
            className="form-input" 
            name="coverageLimit" 
            value={formData.coverageLimit || ''} 
            onChange={handleChange} 
            placeholder="Enter Coverage Limit" 
        />
    </div>
    <div className="form-group">
        <label className="form-label">
            Number of Dependents
            <span className="info-container">
                <i className="material-symbols-outlined info-icon" title="">info</i>
                    <span className="tooltip">Number of Dependents refers to the people who rely on you for financial support, like your children or spouse.</span>
                
            </span>
        </label>
        <input 
            type="number" 
            className="form-input" 
            name="numberOfDependents" 
            value={formData.numberOfDependents || ''} 
            onChange={handleChange} 
            autoComplete="off" 
            placeholder="Enter Number of Dependents" 
        />
    </div>
    <div className="form-group">
        <label className="form-label">Room Rent</label>
        <input 
            type="number" 
            className="form-input" 
            name="roomRentLimit" 
            value={formData.roomRentLimit || ''} 
            onChange={handleChange} 
            placeholder="Enter Room Rent Limit" 
        />
    </div>
    <div className="form-group">
        <label className="form-label">
            Day Care Procedure Coverage
            <span className="info-container">
                <i className="material-symbols-outlined info-icon" title="">
                    <span className="tooltip">Day Care Procedure Coverage pays for medical treatments or surgeries that don't require an overnight hospital stay.</span>
                </i>
            </span>
        </label>
        <input 
            type="number" 
            className="form-input" 
            name="dayCareProcedureCoverage" 
            value={formData.dayCareProcedureCoverage || ''} 
            onChange={handleChange} 
            autoComplete="off" 
            placeholder="Enter Day Care Procedure Coverage" 
        />
    </div>
</>
)}
{insuranceType === 'home' && (
                <>
                    <div className="form-group">
<label className="form-label">
    Building Coverage
    <span className="info-container">
        <i
            className="material-symbols-outlined info-icon"
            title=""
        >
            info
        </i>
        <span className="tooltip">
            Building Coverage refers to the amount of insurance that protects the physical structure of your home. 
        </span>
    </span>
</label>
<input
    type="text"
    className="form-input"
    name="buildingCoverage"
    value={formData.buildingCoverage || ''}
    onChange={handleChange}
    autoComplete="off"
    placeholder='Enter Building Coverage'
/>
</div>

<div className="form-group">
<label className="form-label">
    Content Coverage
    <span className="info-container">
        <i
            className="material-symbols-outlined info-icon"
            title=""
        >
            info
        </i>
        <span className="tooltip">
            Content Coverage protects the belongings inside your home, like furniture, electronics, and clothing.
        </span>
    </span>
</label>

<input
    type="text"
    className="form-input"
    name="contentCoverage"
    value={formData.contentCoverage || ''}
    onChange={handleChange}
    autoComplete="off"
    placeholder='Enter Content Coverage'
/>
</div><div className="form-group">
        <label className="form-label">Additional Protections</label>
        <div className="dropdown">
            <button className="dropdown-button">Select Additional Protections</button>
            <div className="dropdown-content">
                <div className="checkbox-container">
                    <label>
                        <input
                            type="checkbox"
                            value="Fire protection"
                            checked={formData.additionalProtectionCosts.includes("Fire protection")}
                            onChange={handleCheckboxChange}
                        />
                        Fire protection
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="Theft protection"
                            checked={formData.additionalProtectionCosts.includes("Theft protection")}
                            onChange={handleCheckboxChange}
                        />
                        Theft protection
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="Third-party liability"
                            checked={formData.additionalProtectionCosts.includes("Third-party liability")}
                            onChange={handleCheckboxChange}
                        />
                        Third-party liability
                    </label>
                </div>
            </div>
        </div>
    </div>
</>
)}

<button type="submit" style={{
backgroundColor: 'white', color: '#003375', border: 'none', padding: '10px 20px', fontSize: '1.2rem', borderRadius: '25px', cursor: 'pointer', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', transition: 'background-color 0.3s ease, transform 0.3s ease'
}} onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'} onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'} onMouseDown={(e) => e.target.style.transform = 'translateY(1px)'} onMouseUp={(e) => e.target.style.transform = 'translateY(-2px)'}>
Calculate Premium
</button>

        </form>

            {/* result */}
            {premium > 0 && (
    <div
        className="result-container"
        style={{
            backgroundColor: '#fff',
            borderRadius: '10px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            padding: '30px',
            maxWidth: '500px',
            margin: 'auto',
            marginTop: '30px',
            textAlign: 'center',
            fontFamily: 'Montserrat, Helvetica, Arial, sans-serif'
        }}
    >
        <h3
            style={{
                fontSize: '24px',
                fontWeight: 'bold',
                marginBottom: '20px',
                color: '#333'
            }}
        >
            Premium Details
        </h3>
        {[
            { label: 'Insurance Type:', value: insuranceType },
            { label: 'Premium:', value: `₹${premium.toFixed(2)}` },
            { label: 'Tax:', value: `₹${tax.toFixed(2)}` },
            { label: 'Total Premium (with Tax):', value: `₹${(premium + tax).toFixed(2)} Annually` }
        ].map(({ label, value }, index) => (
            <div
                key={index}
                style={{
                    marginBottom: index === 3 ? '20px' : '15px',
                    padding: '15px',
                    backgroundColor: '#f8f8f8',
                    borderRadius: '8px',
                    fontSize: '16px',
                    textAlign: 'left',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <strong>{label}</strong>
                <span>{value}</span>
            </div>
        ))}

        <button
            className="pdf-btn"
            onClick={downloadPDF}
            style={{
                backgroundColor: '#007bff',
                color: 'white',
                padding: '12px 30px',
                borderRadius: '5px',
                fontSize: '16px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'background-color 0.3s ease'
            }}
        >
            Download PDF
        </button>
    </div>
)}

</div>
    );
};


export default InsuranceForm; 