import { test, expect} from '@playwright/test';
const { chromium, firefox, webkit } = require('playwright');
// const {selectOption} = require('../helper/helper')

test('login', async ({ page }, testInfo) => {
  // testInfo.setTimeout(60000); // Đặt timeout toàn bộ test là 60 giây

  await page.goto('https://prerp.bmtu.edu.vn/landingpage?lang=vi', { waitUntil: 'networkidle', timeout: 60000 });
  await page.getByRole('link', { name: 'Nhân viên' }).click();
  await page.fill("input[name='email_txt']", "buh00981");
  await page.fill("input[name='password_txt']", "12345678Aa@");
  await page.click("input[type='submit'][name='commit'][value='Đăng nhập']");

  

  await page.waitForSelector('#form_show_popup_erp');
  await page.waitForSelector('#btn_erp');
  await page.click('#btn_erp');

  await page.locator('a.nav-link.dropdown-indicator', { hasText: 'Quản lý nghỉ phép' }).click();
  await page.getByRole('link', { name: 'Đăng ký nghỉ phép'}, {timeout: 5000, state: 'visible'}).click();
  await page.waitForURL("**/leave_request/index?lang=vi")
  await page.getByRole('button', { name: 'Đăng ký nghỉ phép'}, {timeout: 5000, state: 'visible'}).click();

  await page.waitForSelector('#leaveRequestModal');

  await selectOption(page,'select[name="holtype"]','NGHI-PHEP');

  await page.click('input[name="date_leave_range"]');
  await page.click('span.flatpickr-day[aria-label="Tháng sáu 17, 2025"]');
  await page.getByRole('button', { name: 'Xác nhận'}).click();

  await selectOption(page,'select[name = "handover_receiver"]','Trưởng Đơn Vị Nhỏ');
  // page.check('#region-type-out-1');
  await page.fill('#note','việc cá nhân playwright');
  await page.click('button:has-text("Gửi đơn xin phép")');
  
  await page.waitForTimeout(3000);
  await page.click('#btnSubmit');
});