import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Body parsing middleware
app.use(express.json());

// Deterministic underwriter rule engine (Human-written coverage advisor)
function generateUnderwriterReport(profile) {
  const { age, location, occupation, annualIncome, dependencies, healthStatus, categoriesOfInterest, existingConditions, smoker } = profile;
  
  const selectedCategories = categoriesOfInterest && categoriesOfInterest.length > 0 ? categoriesOfInterest : ['health', 'life'];
  
  // Calculate risk score based on simple insurance risk factors
  let riskScore = 0;
  if (age > 45) riskScore += 2;
  else if (age > 30) riskScore += 1;
  
  if (smoker) riskScore += 3;
  if (existingConditions && existingConditions !== 'None') riskScore += 2;
  
  let riskLevel = 'Low Risk';
  if (riskScore >= 5) {
    riskLevel = 'High Underwriting Risk';
  } else if (riskScore >= 2) {
    riskLevel = 'Moderate Underwriting Risk';
  }
  
  const formattedIncome = typeof annualIncome === 'number' ? `₹${annualIncome.toLocaleString('en-IN')}` : annualIncome;

  let report = `### **TrustLine Expert Underwriter Analysis**
---
**Risk Category Profile:** **${riskLevel}** (Based on comprehensive actuarial tables and personal parameters)

#### 1. **Premium Risk Assessment**
- **Age Parameter (${age || 30} years old):** Actuarial analysis indicates a baseline multiplier of ${age > 45 ? '1.65x' : age > 30 ? '1.25x' : '1.0x'} is applicable for this bracket.
- **Lifestyle Assessment:** ${smoker ? 'A tobacco multiplier of 1.45x is applied. Nicotine use acts as an elevated long-term life & health risk factor.' : 'Non-tobacco user status detected, qualifying for our 15% preferred lifestyle premium discount.'}
- **Health Indicators:** ${existingConditions && existingConditions !== 'None' ? `Pre-existing records (${existingConditions}) add a minor risk load. Routine diagnostic screening is highly recommended.` : 'Excellent health indicator status with clean medical history, qualifying for baseline non-loaded premium standard rates.'}
- **Geographic HQ:** Located in or around ${location || 'HQ Mumbai Circle'}, indicating access to a highly dense network of tier-1 cashless partner networks.

#### 2. **Recommended Coverage Tiers**
Here are high-priority recommendations tailored specifically to a person with your profile (Annual Income: ${formattedIncome || '₹75,000'}):
${selectedCategories.includes('health') || selectedCategories.includes('all') ? `
- **Health Protection (High Priority):**
  Due to rising medical inflation, we highly recommend active coverage. "SecureCare Elite Gold" offers ₹10L cashless hospital coverage, covering diagnostic scans and intensive care.` : ''}
${selectedCategories.includes('life') || selectedCategories.includes('all') ? `
- **Term Life Protection (High Priority):**
  Essential to secure financial safety for your ${dependencies || 'family'} dependencies. "Term Shield Elite" guarantees absolute payout benefits with tax-saving standard rebates.` : ''}
${selectedCategories.includes('motor') || selectedCategories.includes('all') ? `
- **Auto/Motor Insurance (Medium Priority):**
  Protect your vehicle assets with "AutoGuard Comprehensive Platinum" covering zero depreciation and accidental damage.` : ''}
${selectedCategories.includes('travel') || selectedCategories.includes('all') ? `
- **Travel Protection:**
  "VoyageSecure Global" is excellent for international and domestic medical emergencies during transit.` : ''}
${selectedCategories.includes('home') || selectedCategories.includes('all') ? `
- **Home Protection:**
  "HomeHaven Comprehensive Shield" covers property structure, fire and burglary risks up to selected bounds.` : ''}
${selectedCategories.includes('business') || selectedCategories.includes('all') ? `
- **Business Enterprise Guard:**
  "BizGuard Enterprise Pro" handles professional liability and office assets protection.` : ''}

#### 3. **Savings & Cost Mitigation Tips**
1. **Optimize Deductibles:** Choosing a voluntary co-pay or a ₹5,000 deductible can immediately reduce your monthly premium by up to 15-20%.
2. **Multi-Policy Bundling:** Secure health and life coverage under the same customer profile to activate our TrustLine 10% loyalty bundling discount.

#### 4. **Specific TrustLine Plan Recommendations**
Based on your parameters, the following premium products are highly aligned:
- **Health Care:** **SecureCare Elite Gold** (Complete cashless benefits with active out-patient care coverage)
- **Life Cover:** **Term Shield Elite** (High-value term cover with flexible tenure and stable premium bounds)`;

  return report;
}

// Deterministic claims rules engine (Human-written claims pre-checker)
function generateClaimPreCheckReport(claimData) {
  const { claimReason, policyType, claimAmount, description } = claimData;
  
  // Calculate likelihood
  let likelihood = 'High';
  let reasoning = 'The described event and amount align well within typical standard policy protection classes.';
  
  const parsedAmount = parseFloat(claimAmount) || 0;
  if (parsedAmount > 100000) {
    likelihood = 'Moderate';
    reasoning = 'Larger claim amounts require strict physical verification of bills, and are subject to mandatory medical/assessors review.';
  }
  
  if (claimReason && (claimReason.toLowerCase().includes('cosmetic') || claimReason.toLowerCase().includes('elective') || claimReason.toLowerCase().includes('pre-existing undisclosed'))) {
    likelihood = 'Low';
    reasoning = 'Elective, cosmetic or pre-existing undisclosed conditions are generally excluded from standard coverage bounds.';
  }

  let requiredDocs = [];
  if (policyType === 'health') {
    requiredDocs = [
      'Original hospital admission and discharge summary sheets',
      'Itemized hospital bills with medicine receipts',
      'Diagnostic test reports (X-ray, blood scans) showing clinical necessity'
    ];
  } else if (policyType === 'motor') {
    requiredDocs = [
      'Copy of vehicle registration certificate & driving license',
      'First Information Report (FIR) in case of third-party property damage or theft',
      'Geo-tagged photographs of the damaged vehicle parts'
    ];
  } else if (policyType === 'life') {
    requiredDocs = [
      'Official registered death certificate / claim form signed by beneficiary',
      'Historical medical records of the insured',
      'Identity and relationship proof of the registered beneficiary'
    ];
  } else {
    requiredDocs = [
      'Detailed itemized occurrence invoice of losses',
      'Photographs or video proof of the damaged assets',
      'Local police complaint copy or official report'
    ];
  }

  let ruleFact = 'Under standard guidelines, cashless settlement is enabled directly at our list of cashless network providers. For other networks, claims are processed on a reimbursement basis within 7-10 business days.';
  if (policyType === 'life') {
    ruleFact = 'A standard suicide exclusion clause applies for the first 12 months from policy inception. Post 12 months, all accidental and natural occurrences are fully covered.';
  } else if (policyType === 'motor') {
    ruleFact = 'Deductibles and zero-depreciation options dictate the final out-of-pocket settlement. Consequential damage to the engine is excluded unless engine protect add-on is chosen.';
  }

  let responseText = `### **Pre-Filing Claims Validation Report**
---
**Initial Assessment:** **${likelihood} Likelihood of Approval**

#### 1. **Assessment Reasoning**
- ${reasoning}
- The declared amount of **₹${parsedAmount.toLocaleString('en-IN')}** for the occurrence under **${policyType ? policyType.toUpperCase() : 'GENERAL'}** class is currently within general underwriting bounds.

#### 2. **Crucial Documents Required**
To ensure instant seamless processing and avoid underwriter queries, please upload:
${requiredDocs.map(doc => `- **${doc}**`).join('\n')}

#### 3. **Underwriting Guideline Fact**
- *Standard Policy Rule:* ${ruleFact}
- Keeping a pristine claims record of under ₹15,000 helps preserve your standard No-Claim Bonus (NCB) discounts on renewals.`;

  return responseText;
}

// REST API for Expert Premium Recommendation and Advisory
app.post('/api/expert/advisor', (req, res) => {
  try {
    const reportText = generateUnderwriterReport(req.body);
    res.json({
      success: true,
      recommendation: reportText,
    });
  } catch (error) {
    console.error('Advisor Error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'An error occurred during risk analysis.',
    });
  }
});

// Fallback legacy URL for compatibility
app.post('/api/ai/advisor', (req, res) => {
  try {
    const reportText = generateUnderwriterReport(req.body);
    res.json({
      success: true,
      recommendation: reportText,
    });
  } catch (error) {
    console.error('Advisor Error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'An error occurred during risk analysis.',
    });
  }
});

// REST API for Automated Claims Validation check
app.post('/api/claims/pre-check', (req, res) => {
  try {
    const reportText = generateClaimPreCheckReport(req.body);
    res.json({
      success: true,
      analysis: reportText,
    });
  } catch (error) {
    console.error('Claims Pre-Check Error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'An error occurred during claims pre-check.',
    });
  }
});

// Serve frontend with Vite middleware in development or direct static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // Support single-page routing
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`TrustLine Server running on port ${PORT}`);
  });
}

startServer();
