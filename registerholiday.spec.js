import { test, expect } from '@playwright/test';                         
import { hasSubscribers } from 'diagnostics_channel';
const { chromium, firefox, webkit} = require('playwright');

test('đăng ký nghỉ phép', async({page}, testInfo) => {
// Đăng nhập
    await page.goto("https://prerp.bmtu.edu.vn/landingpage?lang=vi", {waitUntil: 'networkidle', timeout: 60000});
    await page.getByRole('link', {name: 'Nhân viên'}).click();
    await page.fill('#user_email', 'BUH00981')
    await page.fill('#password_txt', '12345678Aa@');
    await page.getByRole('checkbox', {name: 'Lưu đăng nhập'}).check();
    await page.getByRole('button', {name: 'Đăng nhập'}).click();
// Chọn phân hệ
    await page.getByRole('button', {name: 'Hệ thống ERP'}).click();
// Chọn menu left
    await page.getByRole('button', {name: 'Quản lý nghỉ phép'}).click();
    await page.getByRole('link', {name: 'Đăng ký nghỉ phép'}).click();
// Đăng ký nghỉ phép
    await page.getByRole('button', {name: 'Đăng ký nghỉ phép'}).click();

    await page.getByRole('textbox', {name: 'Chọn loại đơn'}).click();

    await page.selectOption('[name="holtype"]', 'NGHI-PHEP');

// click chọn ngày cụ thể
//     await page.locator('[aria-label="Tháng năm 26, 2025"]').click();
// click chọn qua tháng trước/ sau
//     await page.click('.flatpickr-next-month');
// chọn nhiều ngày trên lịch đang hiển thị

    await page.click('input[name="date_leave_range"]')
    await page.waitForSelector('.flatpickr-calendar', {state: 'visible'});
    // chọn ngày enabe
    const DaysToSelect = ['1', '2', '3'];
    for(const day of DaysToSelect)
    {
        page.locator('.flatpickr-days:not(flatpickr-disabled)').nth(0).click();
    }
    // chọn ngày enable và disable
    for(const day of DaysToSelect)
    {
        const dayLocator = page.locator(`.flatpickr-days:not(flatpickr-disabled) >> text='${day}'`);
        if(await dayLocator.count() > 0)
        {await dayLocator.nth(0).click();}
        else
        {console.warn('Không tìm thấy ngày được chọn: ${day}');}
    }
    // Chọn người bàn giao công việc
    // await page.getByRole('combobox', {name: 'Người bàn giao công việc'}).click({timeout: 60000});
    await page.locator('.sel-handover-receiver + .select2.select2-container').click();
    await page.waitForSelector('li[role=option]', {timeout: 3000});
    // await page.getByRole('option', {name: 'trưởng đơn vị nhỏ'}).click();
    await page.selectOption('select[name = "handover_receiver"]',['982$$$Trưởng Đơn Vị Nhỏ','168$$$Đặng Thế Thành']);
    

    //  Chọn địa điểm là nước ngoài
    await page.getByLabel('Nước ngoài').check();
    // Chọn quốc gia
    await page.locator('select.selectpicker.country-select + span.select2.select2-container').click();
    await page.waitForSelector('li[role=option]', {timeout: 3000});
    await page.getByRole('option', {name:'Nga'}).click();
    // Fill ghi chú
    await page.fill('#note', 'abc');
    // Click btn Gửi đơn
    await page.getByRole('button', {name: 'Gửi đơn xin phép'}).click();
    // Chọn người phê duyệt
    await page.waitForSelector('#modal-assign-next-user',{timeout: 30000})
    await page.locator('#select2-info-user-next-container').click();
    await page.waitForSelector('li[role=option]');
    await page.getByRole('option', {name: "Trưởng Đơn Vị Nhỏ"}).click();
    await page.click('#btnSubmit');
});

