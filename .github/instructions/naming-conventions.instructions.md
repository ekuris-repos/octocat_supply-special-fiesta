---
description: "Use when generating, reviewing, or refactoring TypeScript or JavaScript code. Enforces camelCase naming conventions for variables, functions, parameters, and object properties."
applyTo: "**/*.{ts,tsx,js,jsx}"
---
# Naming Conventions

Use **camelCase** for:
- Variables: `itemCount`, `isActive`
- Functions and methods: `getSupplier()`, `calculateTotal()`
- Parameters: `orderId`, `supplierName`
- Object properties and interface fields: `{ createdAt, updatedAt }`

Use **PascalCase** for:
- Classes: `OrderDetail`, `BranchRepository`
- Interfaces and type aliases: `SupplierModel`, `ApiResponse`
- React components: `SupplierList`, `OrderForm`
- Enums: `OrderStatus`, `DeliveryType`

Use **UPPER_SNAKE_CASE** for:
- Constants: `MAX_RETRIES`, `DEFAULT_PAGE_SIZE`
- Enum members: `OrderStatus.IN_PROGRESS`

Never use `snake_case` or `kebab-case` for identifiers in TypeScript/JavaScript code. File names may use kebab-case per existing project conventions.
