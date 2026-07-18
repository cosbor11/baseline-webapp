import { expect, test, type Locator, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

async function waitForAnimations(locator: Locator) {
  await locator.evaluate(async (element) => {
    await Promise.allSettled(
      element
        .getAnimations({ subtree: true })
        .map((animation) => animation.finished),
    );
  });
}

async function expectNoBlockingAccessibilityViolations(
  page: Page,
  options?: Readonly<{ include?: string }>,
) {
  let builder = new AxeBuilder({ page });
  if (options?.include) {
    // Portaled menus/selects hide the page with aria-hidden; scan the overlay.
    builder = builder.include(options.include);
  }

  const accessibilityScan = await builder.analyze();
  const blockingViolations = accessibilityScan.violations.filter(
    (violation) =>
      violation.impact === "serious" || violation.impact === "critical",
  );

  expect(blockingViolations).toEqual([]);
}

test("navigates the shell and exercises baseline client tools", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Overview" })).toBeVisible();

  await page.getByRole("button", { name: "Show notification" }).click();
  await expect(page.getByText("Example notification sent")).toBeVisible();

  await page.getByRole("button", { name: "Compact" }).click();
  await expect(page).toHaveURL(/\?view=compact$/);
  await expect(page.getByText("Current value: compact")).toBeVisible();

  await page.getByRole("link", { name: "Projects" }).click();
  await expect(
    page.getByRole("heading", { name: "Projects", exact: true }),
  ).toBeVisible();
});

test("exercises the form control kitchen sink", async ({ page }) => {
  await page.goto("/");

  const roleSelect = page.getByRole("combobox", { name: "Role" });
  await roleSelect.click();
  await page.getByRole("option", { name: "Administrator" }).click();
  await expect(roleSelect).toHaveText("Administrator");

  const terms = page.getByRole("checkbox", { name: "Accept terms" });
  await terms.click();
  await expect(terms).not.toBeChecked();

  const sharedVisibility = page.getByRole("radio", { name: "Shared" });
  await sharedVisibility.click();
  await expect(sharedVisibility).toBeChecked();

  const description = page.getByRole("textbox", { name: "Description" });
  await description.fill("Form control smoke test");
  await expect(description).toHaveValue("Form control smoke test");

  const progress = page.getByRole("slider", { name: "Progress" });
  await progress.press("ArrowRight");
  await expect(progress).toHaveAttribute("aria-valuenow", "63");
});

test("renders settings and the not-found recovery path", async ({ page }) => {
  await page.goto("/settings");
  await expect(
    page.getByRole("heading", { name: "Settings", exact: true }),
  ).toBeVisible();

  await page.goto("/missing-page");
  await expect(
    page.getByRole("heading", { name: "Page not found" }),
  ).toBeVisible();

  await page.getByRole("link", { name: "Return home" }).click();
  await expect(page).toHaveURL(/\/$/);
});

test("keeps interactive overlays free of blocking accessibility violations", async ({
  page,
}) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Dialog", exact: true }).click();
  const dialog = page.getByRole("dialog", { name: "Confirm archive" });
  await expect(dialog).toBeVisible();
  await waitForAnimations(dialog);
  await expectNoBlockingAccessibilityViolations(page);
  await dialog.getByRole("button", { name: "Cancel" }).click();
  await expect(dialog).toBeHidden();

  await page.getByRole("button", { name: "Sheet", exact: true }).click();
  const sheet = page.getByRole("dialog", { name: "Edit project" });
  await expect(sheet).toBeVisible();
  await waitForAnimations(sheet);
  await expectNoBlockingAccessibilityViolations(page);
  await sheet.getByRole("button", { name: "Cancel" }).click();
  await expect(sheet).toBeHidden();

  await page.getByRole("button", { name: "Delete project" }).click();
  const alertDialog = page.getByRole("alertdialog", {
    name: "Delete this project?",
  });
  await expect(alertDialog).toBeVisible();
  await waitForAnimations(alertDialog);
  await expectNoBlockingAccessibilityViolations(page);
  await alertDialog.getByRole("button", { name: "Cancel" }).click();
  await expect(alertDialog).toBeHidden();

  await page.getByRole("button", { name: "Project actions" }).click();
  const menu = page.getByRole("menu");
  await expect(menu).toBeVisible();
  await waitForAnimations(menu);
  await expectNoBlockingAccessibilityViolations(page, {
    include: '[role="menu"]',
  });
  await page.keyboard.press("Escape");
  await expect(menu).toBeHidden();

  await page.getByRole("combobox", { name: "Role" }).click();
  const listbox = page.getByRole("listbox");
  await expect(
    page.getByRole("option", { name: "Administrator" }),
  ).toBeVisible();
  await waitForAnimations(listbox);
  await expectNoBlockingAccessibilityViolations(page, {
    include: '[role="listbox"]',
  });
  await page.keyboard.press("Escape");
  await expect(listbox).toBeHidden();
});

for (const path of ["/", "/projects", "/settings"] as const) {
  test(`has no serious or critical accessibility violations on ${path}`, async ({
    page,
  }) => {
    await page.goto(path);
    await expect(page.getByRole("heading").first()).toBeVisible();

    await expectNoBlockingAccessibilityViolations(page);
  });
}
