# 🧪 Test Cases - Pixelssuite Testing

## 🔹 Manual Test Cases

| Test ID | Scenario | Steps | Expected Result | Actual Result | Status |
|--------|----------|------|----------------|--------------|--------|
| TC_01 | Open homepage | Enter URL in browser | Page loads successfully | Page loaded | Pass |
| TC_02 | Navigation test | Click "Contact" link | Navigate to contact page | Navigated successfully | Pass |
| TC_03 | UI validation | Check layout alignment | Proper alignment | UI looks correct | Pass |
| TC_04 | Invalid input | Enter wrong email | Show error message | Error displayed | Pass |
| TC_05 | Empty submission | Submit empty form | Validation message appears | Works correctly | Pass |

---

## 🔹 Automated Test Cases (Playwright)

| Test ID | Scenario | Description | Status |
|--------|----------|-------------|--------|
| AT_01 | Homepage load | Verify homepage loads correctly | Pass |
| AT_02 | Navigation test | Verify navigation functionality | Pass |
| AT_03 | Stability test | Verify page stability after reload | Pass |