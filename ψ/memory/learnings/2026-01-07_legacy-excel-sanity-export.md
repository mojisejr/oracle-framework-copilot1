# Learning: Legacy Excel Export Pattern with Sanity CMS
**Timestamp:** 2026-01-07
**Context:** Exporting complex categorized data to pre-formatted `.xls` templates.

## 1. The Challenge of Legacy Formats
When dealing with `.xls` (not `.xlsx`) templates, standard modern libraries like `pandas` or `openpyxl` often fail.
- **Problem**: `df.to_excel` overwrites the entire file, destroying existing headers, fonts, and borders.
- **Solution**: Use the `xlrd + xlutils.copy + xlwt` stack.
    - `xlrd`: Open with `formatting_info=True`.
    - `xlutils.copy`: Bridges the readable workbook to a writable one while preserving styles.
    - `xlwt`: Write to specific cells without affecting the surrounding structure.

## 2. String Matching Pitfalls (The "Male/Female" Trap)
In Python, using `if 'male' in sex.lower():` will return `True` for both "male" and "female".
- **Pattern**: Always check for the more specific substring first (e.g., `female`) or use exact matching if possible.
- **Safe Regex/Check**: 
  ```python
  is_female = 'female' in s or 'เมีย' in s
  is_male = not is_female and ('male' in s or 'ผู้' in s)
  ```

## 3. Sanity Join Strategy (Event Register Context)
For "Royal Form" exports, data is often spread across multiple Sanity document types.
- **Pattern**: Use GROQ to fetch child documents (Address, Approvals) by referencing the parent ID in the sub-query.
- **Query Snippet**:
  ```groq
  *[_type == "eventRegister"] {
    ...,
    "address": *[_type=="eventAddress" && eventRegister._ref == ^._id][0],
    "approval": *[_type=="approvment" && eventRegister._ref == ^._id][0]
  }
  ```

## 4. Oracle Lab Methodology
Building complex export tools as standalone Python/Node scripts in `ψ/lab/` is superior to immediate project integration.
- **Pros**: Zero pollution of project dependencies, fast iteration, and clean Git history.
- **Transfer**: Once perfected, the logic can be ported to the main app as a Lambda function or a specific API route.

---
**Oracle Status**: Pattern distilled. Added to central memory.
