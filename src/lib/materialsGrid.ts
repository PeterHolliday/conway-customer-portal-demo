// src/lib/materialsGrid.ts
/**
 * Shared grid templates for the Materials table.
 * Keep column widths in ONE place so Step3 (edit) and Step4 (review) stay aligned.
 *
 * You can tweak the widths here and both screens will update.
 */

// Base grid utilities (gap + text size). Extend if you need.
export const MATERIALS_GRID_BASE =
  "grid gap-3 text-sm";

/**
 * Editable grid (Step 3): includes an extra last column for the delete button (44px).
 * Columns (left → right):
 *  tonnage | mixType | stoneSize | characteristic | layer | pen | psv | clause | areaCode | otherRef | (delete)
 */
export const MATERIALS_GRID_INPUT =
  "grid grid-cols-[110px_140px_120px_170px_120px_110px_110px_110px_120px_1fr_44px] gap-3";

/**
 * Review grid (Step 4): typically no delete button.
 * Adjust the column list to match what you display in the review screen.
 * Example below includes 11 columns: tonnage..deliveryRate
 */
export const MATERIALS_GRID_REVIEW =
  "grid grid-cols-[80px_100px_70px_130px_110px_110px_110px_110px_110px_110px_110px] gap-3";
