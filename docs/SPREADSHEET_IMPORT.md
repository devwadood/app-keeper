# Spreadsheet import

Upload an XLSX no larger than 10 MB. The preview parser ignores formulas/macros and annual
formula sheets, identifies monthly columns by aliases (including `Compaign`), validates
numbers, records sheet/row/hash provenance, and recalculates outcome through the decimal
finance engine. Review warnings/errors before a separate commit operation. Exports prefix
formula-like cell values to prevent spreadsheet injection.
