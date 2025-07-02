import { test, expect } from '@playwright/test';                         
import { hasSubscribers } from 'diagnostics_channel';
const { chromium, firefox, webkit} = require('playwright');
test('Duyệt đơn nghỉ phép', async({page}, testInfo) => {
    await page.goto("https://prerp.bmtu.edu.vn/landingpage?lang=vi", {waitUntil: 'networkidle', timeout: 60000});
    await page.getByRole('link', {name: 'Nhân viên'}).click();
    await page.fill('#user_email', 'BUH00982')
    await page.fill('#password_txt', '12345678Aa@');
    await page.getByRole('checkbox', {name: 'Lưu đăng nhập'}).check();
    await page.getByRole('button', {name: 'Đăng nhập'}).click();
// Chọn phân hệ
    await page.getByRole('button', {name: 'Hệ thống ERP'}).click();
// Chọn menu left
    await page.getByRole('button', {name: 'Quản lý nghỉ phép'}).click();
    await page.getByRole('link', {name: 'Đăng ký nghỉ phép'}).click();
// Chọn menu left
    await page.getByRole('link', {name: 'Tác vụ xử lý'}).click();
// Click btn chi tiết có id lớn nhất
    const buttons = await page.locator('.btn-show-detail', {hasText: 'Chi tiết'}).elementHandles();
    if(buttons.length === 0){
        throw new Error('Không tìm thấy btn nào có class btn-show-detail')
    }
    let maxid = -1;
    let targetbutton = null;
    for(const btn of buttons){
        const idStr = await btn.getAttribute('data-holpros-id');
        const id = parseInt(idStr || '0', 10);
        if(id > maxid){
            maxid = id;
            targetbutton = btn;
        }
    }
    if(!targetbutton){
        throw new Error('Không Không tìm thấy button nào có data-holpros-id hợp lệ')
    }
    await targetbutton.click();
// click btn trình
    await page.waitForSelector('#holDetailModalLabel');
    await page.click('#btn-user-handle-leave')
// chọn người xử lý tiếp theo
    await page.waitForSelector('#processModalLabel');
    // await page.click('#btn-user-handle-leave');
    // await page.waitForSelector('#modal-assign-next-user',{timeout: 30000});
    await page.click('#nextHandler');
    await page.selectOption('#nextHandler', { label: 'Trưởng Đơn Vị Lớn' });
    page.on('dialog', async dialog => {
        console.log('Alert message:', dialog.message());
        await dialog.accept(); // Tự động click nút OK
        // await page.click('OK');
    });
    await page.click('#confirmProcess');
// Bấm xác nhận "OK" trong alert
});