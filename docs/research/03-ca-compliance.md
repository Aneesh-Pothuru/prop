# California Property Management Compliance & Regulatory Map (2026)

> Pilot scope: California residential (SFR + multi-family), commercial, and short-term rentals. Current as of May 2026.
> This document is engineering-facing research, not legal advice. Statutes evolve quickly; primary sources should be re-checked at release time.

## Table of Contents
1. [Licensing & PM Operations](#1-licensing--pm-operations)
2. [Leasing & Tenant Screening](#2-leasing--tenant-screening)
3. [Rent Collection, Late Fees & NSF](#3-rent-collection-late-fees--nsf)
4. [Rent Control & Just-Cause (State + Local Overlays)](#4-rent-control--just-cause-state--local-overlays)
5. [Security Deposits](#5-security-deposits)
6. [Maintenance & Habitability](#6-maintenance--habitability)
7. [Eviction (Unlawful Detainer) Process](#7-eviction-unlawful-detainer-process)
8. [Privacy, Screening Reports & Data](#8-privacy-screening-reports--data)
9. [Short-Term Rentals (STR)](#9-short-term-rentals-str)
10. [Commercial Leases & SB-1103](#10-commercial-leases--sb-1103)
11. [Tax & Reporting](#11-tax--reporting)
12. [Cross-Cutting / Specialty Scope](#12-cross-cutting--specialty-scope)
13. [Master Source List](#13-master-source-list)

---

## 1. Licensing & PM Operations

### Statutory framework
- **CalBRE / DRE** (rebranded from CalBRE back to **California Department of Real Estate**). Anyone who, for compensation, lists, rents, collects rent, or negotiates leases on behalf of others must hold a **real estate broker license** (B&P Code §10131(b)) OR be a licensed salesperson supervised by a broker. The only major exception is a "resident manager" of an apartment building living on-site (B&P §10131.01).
- **Trust funds**: B&P §10145 + Commissioner's Regulations 2830–2835. Any rent, deposit, or owner money received belongs to the owner/tenant — it is *trust* property, not the broker's.
  - Must be deposited within **3 business days** into a neutral escrow OR a trust account at a **California-located federally insured institution**, titled "Broker as Trustee" (or similar).
  - No commingling with operating funds. A maximum of **$200** of broker's own funds may sit in trust for bank charges.
  - Required records: **control journal** of all receipts/disbursements + **separate ledger** for each beneficiary (owner/tenant) + monthly **three-way reconciliation** (bank statement vs. journal vs. sum of ledgers).
  - Designated broker-officer (corporation) — Form RE 218 with DRE.
- **Required onboarding disclosures** (must be delivered before or at lease execution; CAA's leases bundle these in addenda):

| Disclosure | Source | Trigger |
|---|---|---|
| Federal Lead-Based Paint (EPA pamphlet + form) | 42 U.S.C. §4852d, 24 CFR Part 35 | Property built **pre-1978** |
| Megan's Law sex offender registry notice | Civil Code §2079.10a | All residential leases; 8-point type |
| Mold (CDPH booklet "Information on Dampness and Mold for Renters in California") | H&S §26147–26148 | All residential leases |
| Bed Bug disclosure | Civil Code §1954.603 | All residential leases since 7/1/2017 |
| Smoke alarms | H&S §13113.7; Civil Code §1947.9 | All units |
| Carbon Monoxide | H&S §17926 | Any fossil-fuel appliance, fireplace, or attached garage |
| Flood hazard disclosure (8-point type, includes MyHazards URL) | Gov't Code §8589.45 (AB-646, eff. 7/1/2018) | If landlord has actual knowledge — FEMA SFHA, area of potential flooding, owner carries flood insurance, or mortgage requires it |
| Demolition permit notice | Civil Code §1940.6 | Notice received within prior year |
| Death on premises (within last 3 years, unless HIV/AIDS) | Civil Code §1710.2 | Property-specific |
| Pest control (history & ongoing) | Civil Code §1940.8, B&P §8538 | If structural pest treatment scheduled |
| Asbestos | OSHA 8 CCR 1529 | Buildings built pre-1981 with 10+ employees |
| Military ordnance | Civil Code §1940.7 | Within 1 mile of former federal/state ordnance location |
| Methamphetamine / fentanyl contamination | H&S §25400.10–.46 | Order from health official |
| Methane / gas zone | H&S §25406+ | LA designated zones |
| **Mandatory fee disclosure** (SB-611, eff. 4/1/2025 + 7/1/2025) | Civil Code §1950.1 (added) | All advertising + lease — must front-load all mandatory fees (trash, water/sewer pass-through, etc.) |

### Product implications
- **Onboarding wizard** that, given an address + year-built + ZIP, auto-determines which disclosures fire (e.g., flood from FEMA NFHL API, lead from year-built, methane from LA zone GIS). Block lease finalization if any required disclosure unsigned.
- **Trust accounting module** required for any platform handling rent flows on behalf of California brokers: per-owner ledgers, monthly 3-way reconciliation report (one-click PDF for DRE audits), automated $200 broker-funds cap.
- **Document retention**: 3 years on all transaction records (B&P §10148).
- **Broker-of-record field** on every property; salesperson actions must roll up to a supervising broker.

### High-risk landmines
- Holding deposits in operating account or "trust" account at an out-of-state bank → license revocation, restitution.
- Resident-manager exemption only applies if the manager actually lives at the property and is not separately receiving real-estate compensation.
- Missing lead disclosure on pre-1978 property = **$10,000+ federal penalty per violation** plus treble damages.
- Failing the new SB-611 fee transparency rule = unenforceable lease provisions + statutory damages.

Sources:
- [DRE Trust Funds (RE 13)](https://dre.ca.gov/files/pdf/re13.pdf)
- [DRE Opening a Trust Account](https://www.dre.ca.gov/files/pdf/OpeningTrustAccount.pdf)
- [DRE Reference Book Ch. 22 — Property Management](https://www.dre.ca.gov/files/pdf/refbook/ref22.pdf)
- [Nolo: California Required Landlord Disclosures](https://www.nolo.com/legal-encyclopedia/california-required-landlord-disclosures.html)
- [CDPH Real Estate Disclosure & Notification](https://www.cdph.ca.gov/Programs/CCDPHP/DEODC/CLPPB/Pages/LRCrealdisc.aspx)
- [AB-646 (flood) — leginfo](https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=201720180AB646)
- [SB-611 (junk fee transparency) — leginfo](https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202320240SB611)

---

## 2. Leasing & Tenant Screening

### Application & screening fees — Civil Code §1950.6
- **2026 cap: $65.86 per applicant** (CPI-indexed from 2025's $63.90). Re-check annually each January.
- Landlord may only collect the **actual cost** of obtaining the report + reasonable processing time — cap is a ceiling, not an entitlement.
- Must give an **itemized receipt** to every applicant on request.
- Refund any unused portion + refund entirely if the application is not processed.
- **AB-2493 (eff. 1/1/2025)** narrows this further:
  - Two compliant paths only:
    1. **Refund all screening fees** to unsuccessful applicants (regardless of reason), OR
    2. **Publish screening criteria in writing in advance**, process applications in order received, and offer the unit to the first applicant who meets criteria. Only in that case may the fee be retained for genuine criteria failures.
  - Applicants who pay a screening fee must receive a copy of any consumer credit report within **7 days**.
  - If denied based on a screening report, send an **FCRA adverse action notice** (also required by 15 U.S.C. §1681m).
- **AB-2559 (reusable / portable tenant screening reports, eff. 7/1/2023, Civil Code §1950.1)**: Landlords may **opt-in** to accepting PTSRs ≤30 days old. If they advertise that they accept PTSRs, they may not also charge an application fee.

### Source-of-income & protected classes
- **FEHA / Gov't Code §12955** + **SB-329 (eff. 1/1/2020)** make it unlawful to refuse to rent solely because the applicant pays with a **Section 8 voucher** or other lawful, verifiable subsidy. "No Section 8" in ads is per se illegal.
- **SB-222 (2019)** clarified VASH and other federal vouchers are protected.
- Income tests **must include the voucher amount**. The standard 2.5x or 3x rent multiplier can only be applied to the **tenant's portion** of the rent.
- **SB-267 (eff. 1/1/2024, Gov't Code §12955)**: If a landlord uses a credit history check for an applicant relying on a government subsidy, the landlord must offer the applicant the **option to provide alternative evidence of ability to pay** (e.g., bank statements, proof of subsidy).
- **SB-1100 (eff. 1/1/2025)**: Adds protections against discrimination based on **lack of a driver's license / car ownership** — both in housing accommodations and employment. Two-part justification required if a driving requirement is imposed.

### Criminal history — Fair Chance Housing
- **No statewide California ban** as of May 2026. But significant local overlays:
  - **Oakland Fair Chance Housing Ordinance (OMC §8.22.700)**: No criminal background checks at all (except sex-offender registry on family/senior housing).
  - **Berkeley Fair Chance Housing Ordinance** (BMC §13.106): Similar — total ban on criminal screening.
  - **San Francisco Fair Chance Ordinance** (Police Code Art. 49) + Admin Code Ch. 12T: Affordable-housing landlords cannot inquire until conditional offer; individualized assessment required.
  - **Alameda County (unincorporated) Fair Chance Housing Ordinance** (2024) — strongest in nation; total ban on criminal records review.
  - **Los Angeles County Fair Chance Ordinance for Housing** (eff. 2024 unincorporated LA County; expanded to incorporated cities via Renters' Protections Ordinance).
  - **San Diego Fair Chance Ordinance** (Aug 2024).
- For LIHTC + federally-subsidized housing, lifetime sex-offender registry exclusion and methamphetamine-conviction exclusion remain federally required (24 CFR §982.553).

### Mandatory vs. prohibited lease clauses

**Required in lease (or addendum):**
- Names of all owners or agents authorized to receive notices (Civil Code §1962).
- Manner & place rent is to be paid; acceptable payment methods (§1947.3).
- All §1962 owner/agent contact info — failure deprives landlord of right to collect rent during the period of non-compliance.
- Megan's Law notice in 8-point type.
- Bed bug disclosure language (§1954.603).
- Application of AB-1482 (if covered) — **specific 12-point notice required** in the lease itself for tenancies signed/renewed after 7/1/2020 (Civil Code §1946.2(f)).
- Smoking policy disclosure (Civil Code §1947.5).
- Ordnance/methane/flood/death/lead notices as above.

**Prohibited / unenforceable:**
- Waivers of habitability, statutory rights, or "as-is" tenancies (Civil Code §1942.1).
- Late fees not tied to demonstrable actual damages (§1671(d); see *Orozco*).
- "Waiver of jury trial" pre-dispute clauses in residential leases (CCP §631; *Grafton Partners*).
- Mandatory cash-only or EFT-only rent (§1947.3).
- Indemnity for landlord's own negligence (§1953(a)).
- Automatic-renewal traps not meeting B&P §17600+.
- Anti-organizing clauses preventing tenant association activity (Civil Code §1942.5(c)(2)).
- Requiring the tenant to accept a single mandatory renter's insurance carrier; landlord may *require* insurance but must allow choice (B&P concerns + general consumer protection).

### Product implications
- **Application form builder** that enforces the §1950.6 fee cap by jurisdiction (auto-pulls 2026 number, can be city-overridden — e.g., Berkeley has its own cap).
- **Compliance branch logic** at app-launch: landlord must choose AB-2493 Path A (refund all) or Path B (publish criteria + FIFO). Path B exposes a tenant-facing "Screening Criteria" PDF that must be served before fee is taken.
- **Adverse-action notice generator** (templated FCRA + ICRAA) firing automatically on denial.
- **Voucher-aware income calculation**: rent multiplier applied only to tenant share; explicit "alternative evidence" upload path per SB-267.
- **Criminal background toggle**: jurisdiction matrix that disables the criminal check entirely in Oakland/Berkeley/Alameda Co., enforces conditional-offer flow in SF/LA/SD.
- **Lease template engine** with mandatory AB-1482 notice block, signed bed-bug addendum, Megan's Law in 8-pt type. Reject save if any required clause missing.

### High-risk landmines
- Asking about criminal history on the *initial* application in any Fair Chance jurisdiction → strict-liability statutory damages.
- Charging more than $65.86 for screening (even if your actual cost is higher) → refund + penalty + DRE complaint.
- "We don't take Section 8" copy in any listing → DFEH enforcement + civil damages.
- Using a 3x-rent rule against the *gross* rent (vs. tenant share) when the applicant has a voucher → SB-329 violation.
- Failing AB-2493 documentation requirements (no written criteria, no FIFO log) → must refund every screening fee, even valid denials.

Sources:
- [Civil Code §1950.6 — leginfo](https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=1950.6&lawCode=CIV)
- [AB-2493 — leginfo](https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202320240AB2493)
- [AB-2559 — leginfo](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220AB2559)
- [SB-329 — leginfo](https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=201920200SB329)
- [SB-1100 — leginfo](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB1100)
- [CRD Fair Chance Act](https://calcivilrights.ca.gov/fair-chance-act/)
- [Alameda County Fair Chance Housing (AAGLA)](https://members.aagla.org/news/alameda-county-bans-all-criminal-background-checks-for-housing)
- [Berkeley Rent Board — Screening & Application Fees](https://rentboard.berkeleyca.gov/laws-regulations/city-berkeley-ordinances-affecting-rental-properties/tenant-screening-and)

---

## 3. Rent Collection, Late Fees & NSF

### Civil Code §1947.3 — payment methods
- Landlord must allow **at least one form of payment** that is neither cash nor electronic funds transfer (e.g., personal check, cashier's check, money order).
- Cash-only is permitted **only** if a tenant has recently bounced a check or stop-payed, and only for a **3-month window** following written notice.
- No fee may be charged for paying by check.
- Waivers are void as against public policy.

### Late fees — Civil Code §1671(d) + *Orozco v. Casimiro* (2004)
- Late fees are treated as **liquidated damages** in residential leases.
- Enforceable **only** if (a) parties agree in writing, AND (b) it would be impracticable or extremely difficult to fix actual damages.
- The landlord bears the burden of **pleading and proving** validity — late fees are presumed void.
- Industry practice (no statutory number; case law guidance): roughly **5–6% of monthly rent** flat is defensible. Anything ≥10% will almost certainly be struck down. *Orozco* invalidated a $50 fee on $550 rent (≈9%) as a penalty.
- **Grace period**: Not statewide; some cities (e.g., SF — implicit via Rent Board rules) effectively mandate. Common best practice: 3–5 days. Federal Section 8 properties: 5-day grace under HUD rules.
- **SB-611 (2025)**: Bans landlords charging fees for the **preparation/service of notices** (3-day, etc.).

### NSF / returned check fees — Civil Code §1719
- Up to **$25** for the first dishonored check.
- Up to **$35** for each subsequent.
- Cannot stack with the late fee for the same underlying nonpayment — landlord must pick one (Civil Code §1719(a)(6) + AAGLA guidance).
- Must be authorized in the lease.
- Exempt: tenant proves financial-institution error or delayed direct deposit of government benefits.

### Partial rent payments
- Civil Code §1947 lets a landlord refuse partial rent; if accepted, landlord may still proceed with eviction if the lease so provides.
- After service of a 3-day pay-or-quit, accepting partial rent waives the notice unless a clear written reservation of rights is signed (CCP §1161.1).

### Product implications
- **Rent payment ledger** must default-accept at least one non-EFT method (e.g., money order via lockbox or check upload).
- **Late-fee engine**: capped at user-configured %, with a hard ceiling at 6%; configurable per-jurisdiction; auto-disable if the unit is also in a rent-controlled city with its own late-fee rule (SF, Oakland, LA RSO).
- **Grace-period field** with default of 3 days; Section 8 properties auto-set to 5.
- **NSF**: tracked as a sibling fee with cap rule preventing both late fee + NSF on same payment.
- **Junk-fee filter**: hard-block landlord-side fee templates labeled "notice preparation," "3-day fee," "lease-violation processing fee."
- **Partial-pay flow**: warning UX when landlord accepts a partial payment after serving a notice ("Accepting this payment may invalidate the 3-day notice unless you reserve rights in writing").

### High-risk landmines
- Late fee >6% = unenforceable + treble damages risk + UCL (B&P §17200) class exposure.
- Auto-debit lease clauses that disable check payment violate §1947.3 and are void.
- Stacking NSF + late fee = small-claims liability.

Sources:
- [Civil Code §1947.3 — leginfo](https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1947.3.)
- [Civil Code §1719 — FindLaw](https://codes.findlaw.com/ca/civil-code/civ-sect-1719/)
- [Civil Code §1671 — FindLaw](https://codes.findlaw.com/ca/civil-code/civ-sect-1671/)
- [Orozco v. Casimiro (2004) 121 Cal.App.4th Supp. 7](https://caselaw.findlaw.com/court/ca-superior-court/1010356.html)
- [SB-611 — leginfo](https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202320240SB611)

---

## 4. Rent Control & Just-Cause (State + Local Overlays)

### Statewide: AB-1482 (Tenant Protection Act of 2019) as amended by SB-567 (eff. 4/1/2024)

**Coverage**: Most multi-family **and** single-family rentals statewide. Exemptions in Civil Code §1947.12(d) / §1946.2(e):
- Buildings issued certificate of occupancy within the last **15 years** (rolling).
- SFR and condos *only if* (a) not owned by a REIT/corporation/LLC with a corporate member, AND (b) tenant received the written exemption notice in the lease.
- Deed-restricted affordable + below-market housing.
- Dorms, hotels <30 days, owner-occupied duplexes with owner in one unit.
- LIHTC and HUD-assisted units (covered by their own rules).

**Rent cap (Civil Code §1947.12)**: Annual increase ≤ **5% + regional CPI**, hard ceiling **10%**.
- **2025–2026 caps (CAA calculator):**
  - LA region (used for SoCal AB-1482): **8.0%** (5% + 3.0% CPI, Aug 1, 2025 – Jul 31, 2026)
  - Bay Area: **6.3%** (5% + 1.3% CPI)
- Max **2 increases in any 12-month period**.

**Just cause (Civil Code §1946.2)** — applies after **12 months** continuous tenancy (or 24 months if an additional adult occupant joins).
- **SB-567** narrows "no-fault" categories effective 4/1/2024:
  - **Owner / family move-in**: Owner or specified family member must occupy as primary residence **within 90 days** for at least **12 months**. Lease must authorize OR replacement tenant must be the named family member.
  - **Substantial remodel**: Must be work that cannot reasonably be done with tenant in place AND requires permits AND takes ≥30 days. Cosmetic upgrades no longer qualify. Written notice must describe specific work + attach permits.
- **Relocation assistance**: 1 month of rent (paid within 15 days of notice, OR last-month rent waiver). Failure to pay = unlawful detainer is void.
- **SB-567 remedies**: Tenant may sue for **actual damages, treble damages, attorney's fees, and reinstatement**. AG, city attorneys, and tenants can enforce.

### Local rent-control & just-cause overlays (must be applied if more protective)

| Jurisdiction | Cap 2025–26 (Annual GA) | Just-Cause | Coverage (built-before) | Notes |
|---|---|---|---|---|
| **LA City (RSO)** | 3% (4% if owner pays gas+elec) for 7/1/25–6/30/26. Council voted 12/2025: from **7/1/2026 max 4%**, set at **90% of CPI**, no more utility add-on, no more 10% occupant add-on. | Yes (Day 1) | 10/1/1978 | Required RSO registration + per-unit fee. |
| **LA County (RSO/STO unincorporated)** | 3% cap; just-cause applies countywide | Yes | Most rentals | Separate from city. |
| **SF (Admin Code Ch. 37)** | **1.6%** for 3/1/26–2/28/27 (60% of CPI, ceiling 7%) | Yes (Day 1) | Pre-6/13/1979 | Banking allowed; rent board petition process. |
| **Oakland (OMC 8.22)** | **0.8%** AGA 8/1/25–7/31/26 (60% of CPI, max 3%) | Yes | Pre-1/1/1983 multifamily | **Banking** capped at **3× current AGA** as of 1/1/2026. Rent Registration mandatory. |
| **Berkeley (BMC 13.76)** | **1.0%** AGA for 2026 (65% of CPI). No AGA if tenancy started in current calendar year. | Yes | Pre-1980 | Security-deposit interest payable annually (0.9% for 2025). |
| **Santa Monica** | **2.3%** GA Sept 2025; max $60/mo | Yes | Pre-4/10/1979 | MAR (Maximum Allowable Rent) database. |
| **San Jose (ARO + TPO)** | 5% hard cap | Yes (Day 1) | 9/7/1979 multifamily (3+ units) | TPO covers more units than ARO. |
| **West Hollywood** | **2.25%** (Sept 2025–Aug 2026; 75% of CPI, max 3%) | Yes | Pre-1979 | One of the strongest just-cause regimes. |
| **Beverly Hills** | **3%** (7/1/25–6/30/26) | Yes | Pre-2/1/1995 | Ch.6 of BHMC. |
| **Culver City** | **3.25%** (Sept 2025–Aug 2026) | Yes | Pre-2/1/1995 multifamily | Rent registration. |
| **Inglewood** | **3%** (5+ unit buildings, 7/1/25–6/30/26); **8%** for buildings with ≤4 units | Yes | Pre-10/1988 | Tiered cap by building size. |
| **Hayward** | 5% annual cap | Yes | Pre-7/1979 | Residential Rent Stabilization Ord. |
| **Richmond** | 100% of regional CPI | Yes | Pre-2/1995 multifamily | Costa-Hawkins constraints. |
| **Mountain View (CSFRA)** | CPI-based | Yes | Pre-2/1995 multifamily | Voter-enacted 2016. |
| **East Palo Alto** | **2.2%** AGA (80% of CPI, max 10%) | Yes | Pre-1988 | Rent Stabilization Program. |
| **Bell Gardens** | CPI-based local cap | Yes | Most rentals | Adopted 2023. |
| **Pasadena** | CPI-based (Measure H) | Yes | Pre-1995 | Voter ord. 2022. |
| **Antioch / Concord / Larkspur / Alameda / San Pablo etc.** | Various local AGAs | Mostly yes | Varies | Check OAG local-laws PDF. |

### Costa-Hawkins (Civil Code §1954.50+) constraints on local control
- Local rent caps **cannot** apply to:
  - SFRs and condominiums (vacancy decontrol for SFRs).
  - Units with first c/o after **2/1/1995** (or local rent-ord-baked-in date).
- Vacancy decontrol: local ordinances must allow rent to reset on voluntary vacancy.
- Note: Prop 33 (2024) was rejected by voters — so Costa-Hawkins remains.

### Product implications
- **Jurisdiction-aware rent-increase engine**: input address → look up city ordinance, year-built, RSO registration status → output max % allowed this cycle; flag if increase notice must include city-specific language.
- **Increase notice generator**: must include AB-1482 boilerplate, regional CPI, prior-12-month increase log; per-city addenda (LA RSO required disclosure form, Oakland required notice from Rent Adjustment Program, SF must reference Rent Board).
- **Banking tracker** (Oakland): tracks unused AGA quota, caps cumulative banked at 3× current AGA.
- **Just-cause workflow**: at-fault vs. no-fault classifier; if no-fault, force relocation-assistance computation + payment escrow before notice can be served; pre-flight check that owner/family-member move-in is supported by lease language; SB-567 substantial-remodel package builder (permits + scope-of-work doc + tenant notice).
- **AB-1482 exemption certifier**: corporate-ownership flag, deed-restricted flag, year-of-CO field. Display the required 12-pt notice text in lease only if exempt.
- **Local-ordinance registration**: integrate LA RSO, Oakland Rent Registration, SF Rent Board, Berkeley Rent Board APIs (where available) to surface fees and renewal dates.

### High-risk landmines
- Charging an AB-1482 increase but unit is also in a city with a stricter cap → overcharge claim with treble damages.
- Owner move-in eviction without paying relocation up front → void UD + treble damages under SB-567.
- "Substantial remodel" notice missing permits / scope = automatic invalid notice.
- Single-family exemption requires the exemption notice be in the lease — without it, the unit is *de facto* AB-1482-covered.
- Local registration lapse (LA RSO non-payment) → cannot raise rent, cannot evict.

Sources:
- [AB-1482 page — CAA](https://caanet.org/topics/ab-1482/)
- [SB-567 one-pager — LASSD](https://www.lassd.org/wp-content/uploads/2024/04/SB-567-One-Pager-Final-3.12.24.pdf)
- [LAHD RSO Overview](https://housing.lacity.gov/residents/rso-overview)
- [Lucrum — LA 2026 RSO formula change](https://www.lucrumre.com/los-angeles-passes-reduced-rso-rent-increase-formula-2026-update/)
- [SF Admin Code Ch. 37](https://codelibrary.amlegal.com/codes/san_francisco/latest/sf_admin/0-0-0-15928)
- [Oakland OMC 8.22](https://library.municode.com/ca/oakland/codes/code_of_ordinances?nodeId=TIT8HESA_CH8.22REREADEV)
- [Oakland Allowable Annual Rent Increase (8/2025)](https://www.oaklandca.gov/files/assets/city/v/1/housing-comm-dev/documents/tenants/info-sheet_allowable-annual-rent-increase_en_6.10.25_final.pdf)
- [Berkeley AGA 2026 staff report](https://rentboard.berkeleyca.gov/sites/default/files/documents/10-16-2025_RSB_ITEM_8E_ACTION_2026_AGA_Staff_Report_10-16-25.pdf)
- [Santa Monica MAR](https://www.santamonica.gov/maximum-lawful-rent)
- [West Hollywood Rent Stabilization](https://www.weho.org/city-government/rent-stabilization)
- [OAG Local Rent Laws Permissible Increases](https://oag.ca.gov/system/files/media/local-rent-laws-eng.pdf)

---

## 5. Security Deposits

### Civil Code §1950.5 as amended by AB-12 (eff. 7/1/2024)

- **Cap = 1× monthly rent** for unfurnished OR furnished units, regardless of square footage. (Pre-7/1/24 it was 2× / 3×.)
- **Small-landlord exception**: 2× rent allowed if owner is (a) a natural person OR an LLC where **every member is a natural person**, AND (b) owns **≤2 residential rental properties with ≤4 total units**. Exception does **not** apply where the tenant is a **service member** — service members are always capped at 1×.
- Applies to deposits **collected on or after** 7/1/2024 (not retroactive — pre-existing deposits grandfathered).
- Includes any sum however labeled: "last month's rent," cleaning fee, pet deposit, key deposit — all roll into the cap.

### Return mechanics (§1950.5(g))
- Within **21 calendar days** of tenant vacating, landlord must either:
  - Return the full deposit, OR
  - Mail/deliver an itemized statement of deductions + remaining balance + receipts/invoices.
- Receipt rule: any deduction **>$125** requires attached copy of invoice / receipt (or, if landlord did the work, a description, time, and hourly rate).
- If repairs can't reasonably be completed in 21 days, landlord may send a **good-faith estimate** and then send actual receipts within **14 days of completion**.
- **Pre-move-out inspection**: Tenant has a right under §1950.5(f) to request an inspection 2 weeks before move-out so the tenant can cure issues.
- **Allowed deductions only**: unpaid rent, repair of damage beyond ordinary wear, cleaning to return unit to inception-of-tenancy condition, restoration of personal property if so authorized.
- Bad-faith withholding = up to **2× the deposit** in statutory damages (§1950.5(l)).

### Special cases
- **Mobilehome park space rent (Civ. Code §798.39)** — separate 2× rent cap for the park space.
- **Commercial leases**: governed by §1950.7 (see §10) — landlord may waive 30-day return.
- **Section 8/voucher**: subject to PHA limits; usually 1× tenant share.
- **Berkeley**: landlord must pay **interest** on deposit annually (0.9% for 2025).
- **SF**: similar deposit interest rule (rate set annually by Rent Board).
- **LA, West Hollywood, Santa Monica, Watsonville, Hayward**: also have deposit-interest rules.

### Product implications
- **Deposit calculator**: input rent + owner profile (natural person? LLC member structure? unit count?) + tenant status (service member?) → max collectible deposit, with audit trail.
- **Move-out workflow**: 21-day countdown timer; itemized-statement generator with mandatory receipt upload for any line >$125; auto-flag if final number not sent in time.
- **Pre-move-out inspection** request handler (tenant-initiated, scheduled, written report + cure period).
- **Deposit-interest accrual** by city; auto-credit annually for Berkeley, SF, LA, WeHo, SM.
- **Deposit segregation**: held in trust account; many cities now require deposit be in an **interest-bearing account at a CA institution** (Berkeley, SF).

### High-risk landmines
- Charging "pet deposit + security deposit + cleaning deposit" totaling more than 1× rent → automatic statutory damages.
- LLC member who is themselves an LLC or corporation → small-landlord exception fails; you have a 1× cap.
- Service member deposit overcharge → SCRA + state penalties.
- Missing 21-day deadline or no receipts >$125 → tenant entitled to full refund + 2× penalty.

Sources:
- [Civil Code §1950.5 — leginfo](https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1950.5.)
- [AB-12 — leginfo](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB12)
- [TLD Law overview of AB-12](https://tldlaw.com/overview-of-ab-12-new-security-deposit-limitations-for-landlords/)
- [CA Courts Self-Help: Security Deposits](https://selfhelp.courts.ca.gov/guide-security-deposits-california)
- [OAG Know Your Rights — Security Deposits](https://oag.ca.gov/system/files/media/Know-Your-Rights-Security-Deposits-English.pdf)

---

## 6. Maintenance & Habitability

### Implied warranty of habitability — *Green v. Superior Court* (1974) 10 Cal.3d 616
- Every residential lease in California has an implied warranty of habitability — non-waivable.
- Habitability standards drawn from Civil Code §1941.1 + Health & Safety Code §17920.3.

### Civil Code §1941.1 — minimum habitability checklist
A unit is untenantable if any of these fail:
- Effective waterproofing and weather protection of roof and exterior walls;
- Plumbing/gas facilities in good working order;
- Hot/cold running water connected to a sewage disposal system;
- Heating facilities in good working order;
- Electrical lighting + wiring up to applicable code;
- Buildings/grounds free of debris, garbage, rodents, vermin;
- Adequate trash receptacles;
- Floors, stairways, railings maintained in good repair;
- Locking mail-receipt receptacle;
- Working deadbolt on main swinging entry; locking devices on windows.

### Health & Safety Code §17920.3 — "substandard building" definition
Adds: structural hazards, faulty weather protection, fire hazards, **visible mold growth**, infestations of insects/vermin, lack of adequate sanitation, inadequate ventilation, lead-based paint hazards, dampness of habitable rooms.

### Smoke & CO detectors
- **H&S §13113.7 (smoke)**: required in every dwelling; landlord installs and tests at lease start; tenant maintains during tenancy and reports failures.
  - As of 7/1/2014 all new + replacement alarms must be sealed-battery **10-year** alarms.
- **H&S §17926 (CO)**: required in any dwelling with fossil-fuel appliance, fireplace, or attached garage. Single-family compliance deadline 7/1/2011; multi-family 1/1/2013; hotels 1/1/2017.
- Civil Code §1947.9: tenant cannot be charged for routine replacement; willful tenant disabling can be lease violation.

### Entry rights — Civil Code §1954
- Written notice required, **24 hours is presumed reasonable** (rebuttable).
- Allowed reasons: emergency, agreed repairs, showing to prospective purchasers/tenants, court order, tenant abandonment.
- Must enter during **normal business hours** unless tenant consents.
- For sale showings: oral notice OK if written 120-day "for sale" notice already given.
- No emergency / consent / abandonment = no notice required.

### Repair-and-deduct — Civil Code §1942
- Tenant may, after **reasonable notice** (typically 30 days, but less if circumstances justify), have the repair performed AND deduct cost from rent.
- Cap: **1 month's rent per occurrence**; usable **once every 12 months**.
- *Hinson v. Delis* and *Stoiber v. Honeychuck* confirm: tenant may also use rent withholding under §1942(a) if conditions are substantially uninhabitable.

### Retaliation — Civil Code §1942.5
- **180-day** protected window after tenant exercises a habitability/complaint right.
- Landlord may not retaliate by rent increase, service decrease, eviction, or threat.
- Burden shifts to landlord to show non-retaliatory motive.
- Statutory penalty $100–$2,000 per violation + attorney's fees.
- One bite per 12 months.

### Mold (SB-732, H&S §26100+, Toxic Mold Protection Act)
- CDPH-approved booklet must be given to tenants.
- Visible mold growth is automatically substandard under §17920.3(a)(13).

### Bed bugs — Civil Code §1954.600+
- Landlord cannot rent a unit known to have an active infestation.
- Bed-bug disclosure (informational handout) on every new lease since 7/1/2017.
- Tenant must cooperate with inspection/treatment.

### Product implications
- **Maintenance request system** with categories tagged to habitability-critical (heat off, no water, plumbing leak, mold, electrical hazard, lock not working) → SLA timers (24h emergency, 72h urgent, 30d standard) and escalation/auto-assignment.
- **Repair-and-deduct counter** per tenant: log uses against the 1 month/year cap; deduct from rent ledger automatically when tenant files §1942 notice.
- **Notice-to-enter generator** with 24h delivery proof (timestamped door tag photo, SMS, email).
- **Annual safety inspection** scheduler: smoke alarms, CO alarms (compliance log), water heater strap, GFCI test.
- **Retaliation guardrails**: if tenant filed a habitability complaint in last 180 days, lock rent-increase + termination workflows behind a manual override that requires written justification + manager approval (audit trail evidence in case of UD).
- **Mold/bed bug tickets** auto-trigger required habitability response and disclosure obligations to future applicants.

### High-risk landmines
- Entering without 24h notice — even for "checking on a leak" — creates harassment liability + Civil Code §1940.2 violation ($2,000/incident).
- Letting a habitability complaint sit while serving a 3-day notice within 180 days → presumed retaliation, automatic affirmative defense to UD.
- Battery-only smoke alarms (non-sealed) after 7/1/2014 = non-compliance.
- Charging tenant for the "routine" replacement of a smoke alarm.
- Ignoring a §1942 notice → tenant lawful repair + deduct + UD defense.

Sources:
- [Civil Code §1941–1942.5 — leginfo](https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=1942&lawCode=CIV)
- [Green v. Superior Court (1974)](https://scocal.stanford.edu/opinion/green-v-superior-court-30265)
- [H&S §17920.3 — leginfo](https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=17920.3&lawCode=HSC)
- [H&S §13113.7 — smoke](https://codes.findlaw.com/ca/health-and-safety-code/hsc-sect-13113-7/)
- [H&S §17926 — CO](https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=HSC&sectionNum=17926)
- [Civil Code §1954 — leginfo](https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=1954&lawCode=CIV)
- [Civil Code §1942.5 — FindLaw](https://codes.findlaw.com/ca/civil-code/civ-sect-1942-5/)

---

## 7. Eviction (Unlawful Detainer) Process

### Notice phase
- **3-day pay or quit** (CCP §1161(2)): for unpaid rent. Must state precise amount due (no late fees, NSF, junk fees), the person/account to pay, business hours. **Excludes** weekends and judicial holidays from the 3 days.
- **3-day cure or quit**: for fixable lease violation.
- **3-day quit (no cure)**: for non-curable breach (waste, illegal use, nuisance).
- **30-day / 60-day termination** (Civil Code §1946.1): no-fault termination of month-to-month tenancy. **60 days if any tenant has resided ≥1 year**; otherwise 30.
- **90-day Section 8 termination** (Civil Code §1954.535): for HCV/PBV-subsidized units; required for no-fault terminations.
- **Just-cause notice (AB-1482 §1946.2)**: must specify the just cause; for no-fault, must include relocation assistance language + payment.

### AB-2347 — eff. 1/1/2025
- Tenant's response deadline doubled: **10 court days** to file Answer (up from 5).
- Tenant may file Answer, Demurrer, OR Motion to Strike.
- Demurrer/motion-to-strike hearings: within 5–7 court days.
- Plaintiff must file proof of service **3 days** before requesting default judgment.

### CCP §1161+ flow (typical timeline)
1. Notice served (3-day or 30/60/90-day).
2. Notice period expires (excluding weekends + judicial holidays for 3-day).
3. Landlord files UD complaint in Superior Court (limited civil if rent ≤ $35K).
4. Tenant served. Tenant has **10 court days** to respond (AB-2347).
5. If default → request entry of default + writ of possession.
6. If contested → trial set within 20 days (CCP §1170.5).
7. Judgment + writ of possession to sheriff.
8. Sheriff posts 5-day lockout notice.

### Mandatory pre-filing checks
- **AB-1482 covered?** → just-cause notice required + relocation paid (if no-fault).
- **Local just-cause overlay?** → city-specific notice form (e.g., LA RSO Cash for Keys Disclosure; SF Rent Board pre-eviction notice).
- **Sealing**: post-trial UD records are **masked** for 60 days (CCP §1161.2); only become public if landlord prevails. SB-1051 (eff. 1/1/2024) further restricts CRA reporting.

### Relocation assistance
- AB-1482 default: **1 month rent**.
- LA City RSO: tiered, $9,200–$24,200+ depending on tenant type (2025 schedule, indexed annually). Eligible tenant adders for senior/disabled/family with children.
- LA County (unincorporated) RSO: similar tiered.
- SF Ellis Act (Admin Code §37.9A): per-unit relocation, indexed annually (~$8,600+ per tenant in 2026).
- Oakland Ellis Act and OMI: defined relocation schedule.
- West Hollywood, Santa Monica: substantial tiered relocation.

### Product implications
- **UD pre-flight wizard**: determines applicable notice type, computes notice period excluding holidays/weekends, generates the form (3-day/30/60/90, with city-specific addenda), captures proof-of-service.
- **Relocation calculator** by jurisdiction; auto-creates escrow disbursement for relocation payment before notice can be served.
- **AB-2347 timeline tracker**: 10-court-day counter, default-readiness check (proof of service filed ≥3 days prior).
- **Records masking**: do not surface UD records <60 days post-judgment in tenant-screening exports.
- **Local-ordinance gating**: cannot finalize a 60-day notice on an LA RSO unit without the RSO declaration of intent on file with LAHD.

### High-risk landmines
- Including any non-rent items in a 3-day pay-or-quit (late fees, utility charges, NSF) = void notice.
- Demanding more than what's actually owed = void notice; tenants regularly win on this technical defect.
- Section 8 unit: 3-day OK for rent, but no-fault termination needs 90-day notice + HUD documentation.
- Local just-cause registration lapse → cannot file UD.
- Filing UD before relocation assistance is in tenant's hands → void.
- Failing to mask records / reporting UD to credit bureaus before judgment = SB-1051 / FCRA exposure.

Sources:
- [AB-2347 — Fast Eviction Service summary](https://www.fastevictionservice.com/blog/california-ab-2347-what-you-need-to-know-about-the-new-unlawful-detainer-response-timeline/)
- [Hanson Bridgett AB-2347 alert](https://www.hansonbridgett.com/publication/240926-8551-ab2347-gives-defendants-more-time-respond-eviction-lawsuits)
- [CA Courts — Eviction Notice Types](https://selfhelp.courts.ca.gov/eviction-tenant/notice-types)
- [Civil Code §1946.2 — leginfo](https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=1946.2&lawCode=CIV)
- [CCP §1161 / 1170 — California Legislative Information](https://leginfo.legislature.ca.gov/faces/codes_displayText.xhtml?lawCode=CCP&division=&title=&part=3&chapter=4&article=)

---

## 8. Privacy, Screening Reports & Data

### CCPA / CPRA (effective on PM platforms meeting thresholds)
- **Thresholds (Civil Code §1798.140)**: (a) gross revenue >$26.625M; (b) buys/sells/shares PI of ≥100,000 CA consumers/households; (c) derives ≥50% of revenue from selling/sharing PI. Many mid/large PM companies will meet (b) once tenant + applicant counts are aggregated.
- **2026 regulations (CPPA, eff. 1/1/2026):**
  - **Automated Decision-Making Technology (ADMT)** rules: consumers must be given notice of, access to information about, and the right to opt out of automated decisions for **housing**, credit, employment.
    - Applies if a tenant-screening algorithm scores or auto-recommends approve/deny.
  - **Risk assessments** and **cybersecurity audits** required for high-risk processing (large-scale tenant data + sensitive PI).
  - **Honor GPC / browser opt-out signals** as a universal opt-out.
- **Consumer rights**: know / access / correct / delete / portability / opt out of sale-or-sharing / limit use of sensitive PI (which includes SSN, driver's license, immigration status, exact geolocation — all routinely collected on rental apps).

### SSN protection — Civil Code §1798.85
- May not publicly display, encode on cards, transmit unencrypted over the Internet, require SSN to log into a website (without secondary auth).
- Application forms may collect SSN if needed for credit check, but **must use encrypted submission**.
- May not print SSN visible on envelope.

### ICRAA — Civil Code §1786 et seq. (governs "investigative consumer reports")
- Applies to most rental screening reports that include criminal records, reference checks, eviction records, character/reputation info.
- Pre-procurement notice to applicant required: written disclosure that an investigative report is being obtained, name + contact of CRA, applicant's right to receive a copy free upon request.
- 7-year look-back limit (10 years for bankruptcies).
- Statutory damages: actual damages OR **$10,000**, whichever greater, plus attorneys' fees.

### CCRAA — Civil Code §1785 et seq. (credit reports specifically)
- Similar notice + adverse-action notice obligations.
- Free copy of report on request from applicant.

### Other privacy touchpoints
- **Civil Code §1798.82** — breach notification: any breach of unencrypted PI requires notice "in the most expedient time possible and without unreasonable delay."
- **AB-375 + CPRA**: enforced by **California Privacy Protection Agency (CPPA)** with civil penalties up to $7,500 per intentional violation.
- **SB-1162 / pay-data**: not directly housing but relevant for platforms with employees.
- **Civil Code §1799.85 / SB-244**: limit on biometrics.

### Product implications
- **Data inventory + retention schedule**: SSN encrypted at rest with strict access; auto-delete applicant records after a set period (12–24 months recommended) unless converted to tenant.
- **Privacy notice + DSAR portal**: download/delete/correct workflows; California-resident verification step.
- **ADMT disclosure**: if any auto-scoring is in the screening flow, label it, give consumers human-review opt-in, store the score + reason codes.
- **Adverse-action notice generator** that combines FCRA + CCRAA + ICRAA requirements (consumer report contact info, right to dispute, right to free copy within 60 days).
- **Encryption for SSN**: never display in UI without "show" step; never log in plaintext; never put in URLs, emails, or unencrypted documents.
- **GPC handler**: site must recognize the Global Privacy Control header as a do-not-sell/share signal.

### High-risk landmines
- Listing tenant SSN in a confirmation email = §1798.85 + breach notification liability.
- Procuring a criminal background check without the §1786.16 written disclosure + applicant signature = $10K/incident under ICRAA.
- Failing to deliver an adverse action notice on denial = FCRA + ICRAA + AB-2493 violations stacked.
- Aut-scoring of applications without ADMT notice/opt-out (post 1/1/2026) = CPPA enforcement.
- Reporting an unsuccessful UD to a credit bureau = SB-1051 violation.

Sources:
- [Civil Code §1798.85 — leginfo](https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=1798.85.&lawCode=CIV)
- [Civil Code §1786 (ICRAA)](https://leginfo.legislature.ca.gov/faces/codes_displayText.xhtml?lawCode=CIV&division=3.&title=1.6A.&part=4.&chapter=&article=1.)
- [OAG CCPA portal](https://oag.ca.gov/privacy/ccpa)
- [CPPA — CCPA Statute eff. 1/1/2026](https://cppa.ca.gov/regulations/pdf/ccpa_statute_eff_20260101.pdf)
- [Jackson Lewis — CCPA 2026 FAQs](https://www.jacksonlewis.com/insights/navigating-california-consumer-privacy-act-30-essential-faqs-covered-businesses-including-clarifying-regulations-effective-1126)

---

## 9. Short-Term Rentals (STR)

### State-level
California has **no comprehensive statewide STR licensing law**. The closest state touchpoint is **SB-346 (2024)** — requires platforms (Airbnb/Vrbo) to share booking data + host addresses with cities monthly, enabling automatic compliance checking. **Statewide hosts must still comply with all state landlord-tenant rules** for any single stay exceeding 30 consecutive days (which then converts to a §1940 tenancy).

### Major-city overlay snapshot (2026)

| City | Permit required? | Cap | TOT rate | Notes |
|---|---|---|---|---|
| **San Francisco** | Yes — Office of Short-Term Rentals + Business Registration | Host must occupy ≥ 275 nights/year (i.e., primary residence). Unhosted whole-home ≤ 90 nights/yr. Hosted: unlimited. | **14%** | $250 OSTR registration + $925 cert app fee. Platforms file quarterly reports. ~1,800–2,200 active hosts. |
| **Los Angeles (City)** | Yes — Home-Sharing Permit (Planning Dept) | Primary residence; ≤120 nights/yr (extended-stay registration can lift cap). | **14%** | $89 annual permit. Number must appear in listing. SB-346 booking-data sharing live in 2026. |
| **San Diego** | Yes — STRO license (4 tiers) | Tier 3 (whole-home >20 days/yr) capped citywide at ~1% of total housing stock; Mission Beach separate cap. | **10.5%** | Tiered license; lottery for Tier 3/4. |
| **Santa Monica** | Hosted-only allowed; whole-home effectively banned. | n/a | 14% TOT | Registration + TOT licensing required. Strictest in CA. |
| **West Hollywood** | Hosted-only. Whole-home banned. | n/a | 12.5% | Permit required; registration with city. |
| **Palm Springs** | Yes — vacation rental permit | Permit cap (~20% per neighborhood) | **11.5%** (13.5% group meeting hotels) | Strict noise/parking standards; permit enforcement. |
| **Oakland** | Yes — Business Tax + STR registration | Limited by zoning + AB-1482 just-cause overlay if unit is converted from long-term rental. | 14% (Hotel Tax) | Registration with Finance Dept. |

### Common compliance vectors
- **TOT collection + remittance**: every CA STR city imposes one. Airbnb/Vrbo often collect-and-remit in major cities, but smaller jurisdictions require the host to do it directly (monthly or quarterly).
- **Business license / tax certificate** (city-level).
- **State seller's permit** not generally required for STR rental income but required for any additional taxable sales.
- **Insurance**: many cities require ≥$1M liability with STR endorsement.
- **Local rent control overlay**: if the unit is rent-controlled (SF, LA RSO, Oakland), converting to STR is generally **prohibited** as it removes the unit from the rental market — triggers Ellis Act in SF/Oakland.
- **HOA / CC&Rs**: many condo associations ban STRs; not a public-law issue but a contractual one your platform should flag.
- **Building / fire code**: STRs in some cities (LA) require working fire extinguishers, escape signage, hardwired smoke/CO alarms.
- **SB-60 noise nuisance** (2017): cities have authority to penalize STR hosts for noise violations up to $1,500/incident.

### Product implications
- **City compliance module** keyed on lat/lon → returns local STR ordinance (permit type, cap, TOT rate, banking-of-nights rules).
- **TOT collection engine**: configurable per-city; integrate Airbnb/Vrbo collect-and-remit status (so we don't double-charge); generate monthly TOT remittance forms.
- **Night-count tracker** that aggregates across platforms (since SF and LA cap whole-home at 90/120) → block bookings that would exceed the cap.
- **Rent-control conflict detection**: if a unit was on the long-term market and is rent-controlled, raise an explicit warning before converting to STR (Ellis Act notice flow).
- **Permit-status sync** with city APIs where available (SF OSTR, LA Planning) — surface expiration dates.

### High-risk landmines
- Operating without a permit number on the listing — SB-346 makes detection trivial; cities can fine $1K–$5K/day.
- Pulling a rent-controlled unit off the long-term market and listing as STR — triggers Ellis Act in SF/Oakland (10+ year ban on re-letting at market) + relocation payments.
- Failing to remit TOT — joint liability with platform; city can seize.
- Treating a stay >30 days as STR — automatically converts to a §1946.1 tenancy with all its protections (eviction process, deposit limits, just cause).

Sources:
- [SF Planning STR FAQs](https://sfplanning.org/str/faqs-short-term-rentals)
- [SF Guide to opening an STR](https://www.sf.gov/guide-opening-short-term-residential-rental)
- [LA Home-Sharing](https://planning.lacity.gov/project-review/home-sharing)
- [San Diego TOT/TMD](https://www.sandiego.gov/treasurer/taxesfees/tot)
- [Palm Springs TOT](https://www.palmspringsca.gov/government/departments/finance-treasury/transient-occupancy-tax-tot)
- [Awning — California STR City-by-City 2026](https://awning.com/post/california-short-term-rental-laws)
- [Minut — LA STR 2026](https://www.minut.com/blog/los-angeles-short-term-rental-laws)

---

## 10. Commercial Leases & SB-1103

### Civil Code §1950.7 — commercial security deposits
- No statutory cap on commercial deposit amount (unlike residential).
- **30-day return** after landlord recovers possession (if no monetary defaults).
- **Two-week** return of any deposit excess over 1× rent **plus** a "last month's rent" reservation, if landlord's claim is rent-only.
- **Waivable** by lease — and standard commercial leases routinely include a §1950.7 waiver to give landlord broader discretion. (Best-practice modern commercial leases include the waiver to avoid the *Granberry* / *750 Capp Street* line of cases that strictly enforce the 30-day deadline.)

### SB-1103 — Commercial Tenant Protection Act (eff. 1/1/2025)

**Applies only to "qualified commercial tenants" (QCTs):**
- A **microenterprise** (≤5 employees, including the owner), OR
- A **restaurant** with ≤10 employees, OR
- A **nonprofit** with ≤20 employees.
- Tenant must self-certify status in writing **at lease signing and annually**.

**New protections for QCT leases signed/commenced/renewed on or after 1/1/2025:**

1. **Operating expenses & taxes pass-through restrictions (Civil Code §1950.9)**:
   - Landlord may only pass through expenses that are **actually incurred**, **allocated proportionately**, and **substantiated** (e.g., invoice copies).
   - 60-day window for tenant to inspect supporting documentation.
   - Cannot collect for capital improvements/upgrades beyond the QCT's pro-rata share or beyond the lease term's amortization.

2. **Translation requirements (Civil Code §1632)**:
   - If lease negotiated **primarily in Spanish, Chinese, Tagalog, Vietnamese, or Korean**, the landlord must provide a translated copy of the lease before signing.
   - Failure → tenant's right to **rescind**.

3. **Rent-increase notice (Civil Code §827 amended)**:
   - QCT with month-to-month or shorter lease: **30 days' notice** if increase ≤10%; **90 days' notice** if increase >10% within any 12-month period.
   - Notice must be in writing.

4. **Termination of unspecified-duration tenancies**:
   - At least **60 days' notice** if QCT has occupied ≥1 year; **30 days** otherwise. Mirrors residential §1946.

5. **Enforcement**: civil action by tenant; actual damages + reasonable attorney's fees; cities and AG also empowered.

### Other commercial-specific items
- **ADA / Title III**: separate from CA law but California Unruh Civil Rights Act + Disabled Persons Act stack on top — $4,000+ minimum per violation. Strongly recommend a CASp inspection and disclosure (Civil Code §1938) — landlord must state whether premises have been CASp-inspected.
- **AB-2622 (eff. 1/1/2025)**: increases statutory minimums for ADA disability-access lawsuits where landlord has not had a CASp inspection.
- **Property tax pass-through (Prop 13)**: standard NNN allocations.

### Product implications
- **Commercial lease branch**: separate from residential template; QCT flag (self-cert), microenterprise/restaurant/nonprofit selectors with employee-count fields; required language re §1950.7 waiver.
- **CAM / NNN reconciliation tool**: invoice-level breakdown of operating expenses, allocations with pro-rata math, downloadable supporting docs for tenant inspection (60-day window).
- **Rent-increase notice generator**: branch for QCT (30 / 90-day depending on %); residential branch with AB-1482 / city caps.
- **CASp status field**: required by §1938; surface to tenant in lease disclosures.
- **Translation flag**: if tenant primary language is among the 5 covered, lock save until translated lease uploaded.

### High-risk landmines
- Treating a QCT as a "sophisticated commercial party" and waiving §1950.9 → unenforceable; tenant can recover all overcharges + attorney's fees.
- Failure to provide translated lease to a Spanish/Chinese/Tagalog/Vietnamese/Korean-primary-language QCT → lease rescission.
- Hidden CAM charges (especially "administrative fee" 15%) → SB-1103 violation.
- No CASp disclosure (Civil Code §1938) → presumptive defense unavailable in ADA lawsuit.

Sources:
- [SB-1103 — Squire Patton Boggs alert](https://www.squirepattonboggs.com/insights/publications/sb-1103-a-significant-shift-for-california-commercial-landlords-commencing-on-january-1-2025/)
- [SB-1103 — Allen Matkins alert](https://www.allenmatkins.com/real-ideas/what-california-landlords-need-to-know-about-senate-bill-1103.html)
- [Public Counsel SB-1103 PDF](https://publiccounsel.org/wp-content/uploads/2024/11/sb-1103-Alert.pdf)
- [Civil Code §1950.7 — leginfo](https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1950.7.)
- [Schorr Law — §1950.7 Waiver](https://schorr-law.com/the-california-civil-code-section-1950-7-waiver/)

---

## 11. Tax & Reporting

### Federal — IRS 1099 reporting
- **1099-NEC**: required when paying a **service provider** (vendor, contractor, repair vendor) ≥$600/yr who is **not a corporation** (excl. attorneys, who require 1099 regardless). Filing deadline: **Jan 31** (recipient + IRS).
- **1099-MISC**: required when a property manager pays **owners** ≥$600/yr in rent collected on their behalf. Box 1 (Rents). Filing by Feb 28 (paper) or Mar 31 (e-file).
- **Threshold update (OBBBA 2025)**: $600 threshold rises to **$2,000** for tax year 2026 forms (filed in 2027). 2025-year filings still use $600.
- **W-9** required from every owner + vendor before any payment.
- **Backup withholding**: 24% if W-9 missing or TIN mismatched.

### California — FTB Forms 588 / 590 / 592 / 592-B (nonresident withholding)
- Required when paying a **nonresident owner** (individual living outside CA; foreign-domiciled LLC; entity not registered to do business in CA) >$1,500 in a calendar year.
- **Withholding rate: 7%** on the gross payment to owner.
- Quarterly: **Form 592** + payment.
- Annual: **Form 592-B** issued to owner by Jan 31; aggregate **Form 592** filed by Jan 31.
- **Form 588**: waiver request submitted by owner to FTB to reduce/eliminate withholding (owner with CA tax history).
- **Form 590**: certificate of CA residency or qualifying entity status — exempts payer from withholding.

### Local transient occupancy tax (TOT)
- See §9 STR table.
- Long-term residential rentals (>30 days) do **not** owe TOT.

### Sales & use tax (CDTFA)
- Residential rent is **not** subject to sales tax.
- Furnished STR rent (under 30 days) is subject to TOT only (no state sales tax on the rent).
- Tangible personal property (appliances, furniture) bought for the rental: sales tax applies; landlord pays use tax on out-of-state purchases.

### Local business license / gross receipts tax
- Major CA cities require landlords to obtain a business tax certificate:
  - **SF**: Business Registration; gross receipts tax above thresholds.
  - **LA City**: Business Tax Registration Certificate; rental income subject to Commercial Rental classification (rate ~$1.27 per $1K gross receipts).
  - **Oakland**: Business License + Rent Adjustment Program fee per unit.
  - **Berkeley**: Business License + Rent Stabilization Fee.

### Property tax pass-through
- Prop 13 caps annual increases on assessed value.
- **Prop 19 (eff. 2021)**: limits parent-child exclusion; most rental property transfers now trigger reassessment.

### Product implications
- **1099 wizard**: at year-end, aggregate vendor payments + owner rent payouts; auto-generate 1099-NEC / 1099-MISC PDFs with e-file integration (Track1099, Tax1099); W-9 collection portal with TIN matching.
- **Backup withholding** flag when W-9 missing → automatically withhold 24%.
- **CA Form 592** workflow: residency confirmation at owner onboarding (Form 590 capture); if nonresident → 7% auto-withheld each disbursement; quarterly 592 + payment to FTB.
- **TOT module** per STR city.
- **Local business license alerts**: link unit to city → surface required local registrations + annual renewal dates.

### High-risk landmines
- Property manager failing to withhold 7% for nonresident owner — manager is **directly liable** to FTB for the unwithheld tax + penalties.
- Issuing only 1099-MISC and skipping 1099-NEC for vendors → penalties stack ($60–$310 per form).
- W-9 missing + paying anyway = backup-withholding failure.
- Local business license lapse — many cities (LA, Oakland) make this a precondition to evict / raise rent.

Sources:
- [FTB — Withholding on Nonresidents](https://www.ftb.ca.gov/pay/withholding/withholding-on-nonresidents.html)
- [FTB 2025 Instructions for Form 592](https://www.ftb.ca.gov/forms/2025/2025-592-instructions.html)
- [FTB Publication 1017](https://www.ftb.ca.gov/forms/misc/1017.html)
- [Kimball Tirey — CA withholding for rent payments](https://www.kts-law.com/california-tax-withholding-requirements/)
- [IRS Instructions for 1099-MISC and 1099-NEC](https://www.irs.gov/instructions/i1099mec)

---

## 12. Cross-Cutting / Specialty Scope

### A. Mobile-home parks — MRL (Civil Code §798 et seq.)
- Wholly separate body of law applying to mobilehome park space rentals (homeowner owns the home, rents the pad).
- **HCD** enforces park licensing (operating permit), **but not** the MRL — MRL is enforced in civil court.
- Key MRL provisions:
  - **12-month or month-to-month lease offer** mandatory at end of any term (§798.18).
  - **6-month notice** of rule changes if homeowner does not consent (§798.25).
  - **60-day notice** required for any rent increase regardless of building age (§798.30).
  - **Eviction only for specific causes** (§798.55–798.56): nonpayment, rule violation, conviction for nuisance use, etc.
  - **Sales of the home in place**: park may approve/disapprove buyer based on credit + ability to pay; cannot disapprove based on age, family, etc.
  - **Park closure / change of use**: **12-month notice** + relocation impact report (§798.56(g)).
- **AB-1061 (2022) + AB-2031**: park rent cap = AB-1482 5%+CPI for parks not otherwise locally regulated.

### B. Federally-subsidized housing
- **HUD-assisted (Section 8 PBV, PBRA, HCV)**:
  - **HAP contracts** govern; HUD Handbook 4350.3 controls income certs, rent calc, recerts.
  - Eviction: must comply with state law **plus** federal "good cause" (24 CFR §982.310).
  - **90-day notice** required for no-fault termination (Civil Code §1954.535 + HUD).
  - Section 8 tenants: voucher payment standard set by PHA; tenant pays max 30–40% of adjusted income.
- **LIHTC (IRC §42 + CTCAC compliance)**:
  - Annual income recertification of every household.
  - Rent limits per CTCAC tables (county-specific), not local market.
  - **15-year initial compliance period** + extended-use **55 years** in California.
  - Non-compliance findings can trigger IRS recapture of credits — major investor concern.
  - Annual owner cert filed with CTCAC (form C); on-site audits.
- **Affordable-housing covenants** (city / HCD): inclusionary housing units in market-rate buildings often have 30/45/55-year recorded covenants — must apply rent + income limits + HUD-style screening.

### C. Animals — ESA / Service Animal / Pet Policy

| Type | Statute | Pet Fee? | Deposit? | Documentation Landlord Can Require |
|---|---|---|---|---|
| Service animal (ADA Title III/FEHA) | 28 CFR §36.302, Gov't Code §12927 | No | No | Only "is it required for a disability?" + "what task does it perform?" — no documentation. |
| Emotional Support Animal (ESA) | FEHA Gov't Code §12927 + **AB-468** (eff. 2022, Health & Safety Code §122318) | No | No | Valid ESA letter from licensed CA practitioner with ≥30-day client relationship; license number; statement that misrepresenting an ESA as a service animal is illegal. |
| Pet | n/a | Yes (separately, but **no** "pet deposit" — counts toward the 1× cap under §1950.5) | n/a | At landlord's discretion |

- Cannot impose breed / weight / species restrictions on ESAs (absent direct-threat showing).
- Cannot require pet rent or deposit for ESA/service animal.
- May require renter's insurance to cover the animal — but reasonable accommodation analysis required.
- **AB-1881 (2022)**: prohibits "pet rent" for service/support animals.
- **AB-2216 (eff. 1/1/2025)**: A landlord cannot have a blanket "no pets" policy AND cannot ask about a pet's species/size/breed in the rental application. Landlord can only inquire after a conditional rental offer is extended, and may then impose reasonable pet rules.

### D. Utility billing — RUBS, Submeter, Civil Code §1940.9
- **§1940.9**: If utilities serve more than one unit and aren't separately metered, landlord must disclose to tenant **in writing** how the cost is allocated.
- **Markup prohibition**: landlord may only charge what the utility actually bills — no service fee, no administrative markup.
- **Submetering required for new multifamily construction post-1/1/2018** (SB-7, 2016) — applies to **water** specifically.
- **RUBS** (ratio utility billing) is permitted on existing buildings; allocation by sq ft, by occupants, or other reasonable basis must be disclosed.
- **PUC Decision 05-01-058**: protects against electric/gas master-meter disconnect harming end-tenants who paid landlord.
- **SB-998 (Discontinuation Protections, 2018)**: applies to municipal water utilities and tenants in master-metered buildings — protections against shutoff.

### E. Renter's Insurance
- Not state-mandated. Landlord may require by lease.
- May not pick a single carrier; tenant must have free choice.
- Subsidized housing: tenant insurance generally cannot be a condition (HUD Notice H 2013-22).

### F. Local Inspection / Habitability Certification
- **LA City Systematic Code Enforcement Program (SCEP)** — annual fee, every 4-year inspection of rental units.
- **Sacramento Rental Housing Inspection Program** — periodic inspection + permit.
- **Oakland Proactive Rental Inspection (PRI)** — every 3 years, fee per unit.
- **SF Code Enforcement** — DBI complaint-driven + targeted.
- **Berkeley Rental Inspection** — periodic.

### G. Lead-paint disclosure (federal)
- Pre-1978 properties: EPA pamphlet + signed disclosure + lease attachment + records retained for 3 years.
- Renovations $0 to $5,000+: RRP-certified contractor + Renovate Right pamphlet pre-work.

### Product implications
- **Property-type switch**: SFR / multi-family / mobilehome / LIHTC / Section 8 / commercial — each unlocks distinct lease templates, screening rules, rent calc, and eviction notice flows.
- **Animal accommodation workflow**: separate UI path for service animal / ESA / pet; ESA letter validation (license # lookup, 30-day relationship attest, animal-rights checkbox).
- **Utility billing module**: RUBS calculator (sq ft / occupants), submeter ingestion (Modbus / API), no-markup enforcement, mandatory written allocation disclosure attached to lease.
- **LIHTC compliance**: TIC (Tenant Income Certification) at move-in + annual; CTCAC reporting; over-income detection on next available unit; investor reporting dashboard.

### High-risk landmines
- Charging pet deposit for an ESA → automatic FEHA violation.
- Blanket "no pets" advertising (post AB-2216) → discrimination claim.
- Marking up tenants' utility bills → §1940.9 violation; refund + statutory damages.
- LIHTC over-income unit not handled per Next Available Unit Rule → credit recapture exposure.
- Mobilehome park <60-day rent increase notice = void notice + park-resident-rights violation.

Sources:
- [HCD — Mobilehome Park Residency Law page](https://www.hcd.ca.gov/mmh/mac/your-rights-mobilehome-park-resident)
- [2025 MRL Handbook (GSMOL)](https://www.gsmol.org/wp-content/uploads/2025/01/GSMOL-MRL-HANDBOOK-2025.pdf)
- [CTCAC LIHTC Rent Requirement (2024)](https://www.treasurer.ca.gov/ctcac/2024/compliance.pdf)
- [CRD — ESA and Fair Housing FAQ](https://calcivilrights.ca.gov/wp-content/uploads/sites/32/2022/12/Emotional-Support-Animals-and-Fair-Housing-Law-FAQ_ENG.pdf)
- [Civil Code §1940.9 — leginfo](https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1940.9)
- [Bornstein Law — RUBS in CA](https://bornstein.law/california-ratio-utility-billing-systems/)

---

## 13. Master Source List

### Primary statutes & regulations
- [California Legislative Information (leginfo)](https://leginfo.legislature.ca.gov/) — official source for all bills + codes.
- [California Department of Real Estate (DRE)](https://dre.ca.gov/)
- [Housing & Community Development (HCD)](https://www.hcd.ca.gov/)
- [California Office of the Attorney General (OAG) — Housing & Tenant Resources](https://oag.ca.gov/consumers/general/landlord-tenant-issues)
- [Franchise Tax Board (FTB)](https://www.ftb.ca.gov/)
- [California Department of Tax & Fee Administration (CDTFA)](https://www.cdtfa.ca.gov/)
- [California Privacy Protection Agency (CPPA)](https://cppa.ca.gov/)
- [Civil Rights Department (CRD, formerly DFEH)](https://calcivilrights.ca.gov/)
- [California Tax Credit Allocation Committee (CTCAC)](https://www.treasurer.ca.gov/ctcac)

### Major rent-board / city sources
- [LA Housing Department — RSO](https://housing.lacity.gov/residents/rso-overview)
- [SF Rent Board](https://www.sf.gov/departments--rent-board)
- [Oakland Rent Adjustment Program](https://www.oaklandca.gov/topics/rent-adjustment-program)
- [Berkeley Rent Board](https://rentboard.berkeleyca.gov/)
- [Santa Monica Rent Control](https://www.santamonica.gov/departments/rent-control)
- [San Jose Housing Department — TPO / ARO](https://www.sanjoseca.gov/your-government/departments-offices/housing/developers/affordable-housing-plans-policies/tenant-protection)
- [OAG Local Rent Law summary (PDF)](https://oag.ca.gov/system/files/media/local-rent-laws-eng.pdf)

### Plain-English & practitioner summaries
- [Nolo — California Landlord-Tenant](https://www.nolo.com/legal-encyclopedia/california-landlord-tenant)
- [California Apartment Association (CAA)](https://caanet.org/)
- [Kimball Tirey & St. John — landlord legal alerts](https://www.kts-law.com/)
- [Tobener Ravenscroft — tenant-side analysis](https://www.tobenerlaw.com/)
- [Allen Matkins — commercial alerts](https://www.allenmatkins.com/)

### Key bills referenced in this report
- AB-12 (deposit 1×, 2024) — [leginfo](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB12)
- AB-1482 (rent cap / just cause, 2019) — [CAA explainer](https://caanet.org/topics/ab-1482/)
- SB-567 (just-cause tightening, 2024) — [LASSD PDF](https://www.lassd.org/wp-content/uploads/2024/04/SB-567-One-Pager-Final-3.12.24.pdf)
- AB-2347 (UD 10-day response, 2025)
- AB-2493 (screening fee paths, 2025)
- AB-2559 (PTSR, 2023)
- SB-329 / SB-222 (source of income)
- SB-1100 (driver's license discrimination)
- SB-611 (junk fee transparency, 2025)
- SB-1103 (Commercial Tenant Protection Act, 2025)
- AB-468 (ESA documentation)
- AB-2216 (no blanket pet ban, 2025)
- SB-346 (STR platform data sharing, 2025)
- AB-646 (flood disclosure)
- SB-7 (water submetering, 2018)
- SB-1051 (UD masking, 2024)
- AB-12 / AB-2622 / Civil Code §1938 (ADA / CASp)

---

*End of report. Cross-check primary sources before production deployment; statutes are frequently amended each January 1 + July 1 each year.*
