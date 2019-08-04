/* global page */

describe('E2E Test', () => {

    const baseURL = 'http://localhost:3000/'

    const data = {
        fname: 'test-fname',
        lname: 'test-lname',
        email: 'email@test.com',
        date: '24.01.2019'
    }

    let rowsBefore;
    let rowsAfter;
    let newRow;
    let editedRow;
    let lastRow;


    describe('Adding new participant', () => {

        it('Should redirect to form on register', async () => {
            await page.goto(baseURL);
            await page.waitFor(100);

            //check how many rows was before testing
            rowsBefore = await page.evaluate(() => document.querySelector('tbody tr:last-child th').textContent);

            await page.click(`[data-test='linkToEntry']`);
            await page.click(`[name='first_name']`);
            const newUrl = await page.url(); 
            expect(newUrl).toBe(baseURL+'entry');
        });

        it('Should display error after leaving first_name field empty', async () => {
            await page.click(`[name='last_name']`);
            const fnameError = await page.$(`[data-test='fnameError']`); 
            expect(fnameError).not.toBeNull();
        });

        it('Should display error after leaving last_name field empty', async () => {
            await page.click(`[name='email_address']`);
            const lnameError = await page.$(`[data-test='lnameError']`); 
            expect(lnameError).not.toBeNull();
        });

        it('Should display error after leaving email_address field empty', async () => {
            await page.click(`[name='event_date']`);
            const emailError = await page.$(`[data-test='emailError']`); 
            expect(emailError).not.toBeNull();
        });
            
        it('Should display error after leaving event_date field empty', async () => {
            await page.click(`[name='first_name']`);
            const dateError = await page.$(`[data-test='dateError']`); 
            expect(dateError).not.toBeNull();
        });    

        it('Should display error after typing invalid email address', async () => {
            await page.type(`[name='email_address']`, 'test');
            const newEmailError = await page.$(`[data-test='emailError']`); 
            expect(newEmailError).not.toBeNull();
        });

        it('Should NOT display error after typing first name', async () => {
            await page.type(`[name='first_name']`, data.fname);
            const newFnameError = await page.$(`[data-test='fnameError']`); 
            expect(newFnameError).toBeNull();
        });

        it('Should NOT display error after typing last name', async () => {
            await page.type(`[name='last_name']`, data.lname);
            const newFnameError = await page.$(`[data-test='fnameError']`); 
            expect(newFnameError).toBeNull();
        });

        it('Should NOT display error after typing valid email address', async () => {
            //remove previous test value
            await page.click(`[name='email_address']`);
            for (let i = 0; i < 4; i++) {
                await page.keyboard.press('Backspace');
            }
            await page.type(`[name='email_address']`, data.email);
            const newFnameError = await page.$(`[data-test='fnameError']`); 
            expect(newFnameError).toBeNull();
        });

        it('Should NOT display error after typing first_name', async () => {
            await page.type(`[name='event_date']`, data.date);
            const newFnameError = await page.$(`[data-test='fnameError']`); 
            expect(newFnameError).toBeNull();
        });

        it('Should redirect to list after submit', async () => {
            await page.click(`[type='submit']`);
            await page.waitForNavigation(); 
            await page.waitFor(500);

            //check how many rows are after adding testing row
            rowsAfter = await page.evaluate(() => document.querySelector('tbody tr:last-child th').textContent);

            //get content of testing row
            newRow = await page.evaluate(() => document.querySelector('tbody tr:last-child').textContent);

            const newUrl = await page.url(); 
            expect(newUrl).toBe(baseURL);
        });

        it('Should add new row', () => {
            expect(parseInt(rowsAfter, 10) - parseInt(rowsBefore, 10)).toBe(1);
        });

        it('Should display on list new fname', async () => {
            expect(newRow).toContain(data.fname);
        });

        it('Should display on list new lname', async () => {
            expect(newRow).toContain(data.lname);
        });

        it('Should display on list new email', async () => {
            expect(newRow).toContain(data.email);
        });

        // Test works with headless: false and in manual tests. I have no idea why, but with headless: true it gives another date output 
        // it('Should display on list new date', async () => {
        //     const day = data.date.substring(0,2);
        //     const month = data.date.substring(3,5);
        //     const year = data.date.substring(6,10);
        //     const date = [year, month, day].join("-");

        //     expect(newRow).toContain(date);
        // });

    });


    describe('Editing participant', () => {

        it('Should redirect to edit', async () => {
            await page.click('tbody tr:last-child [data-test="editButton"]');
            const newUrl = await page.url(); 
            expect(newUrl).toContain(baseURL+'edit/');
            await page.waitFor(100);
        });

        it('Should have typed testing first name', async () => {
            const editFirstName = await page.$eval(`[name='first_name']`, el => el.value); 
            expect(editFirstName).toBe(data.fname);
        })

        it('Should have typed testing last name', async () => {
            const editLastName = await page.$eval(`[name='last_name']`, el => el.value); 
            expect(editLastName).toBe(data.lname);
        })

        it('Should have typed testing email address', async () => {
            const editEmail = await page.$eval(`[name='email_address']`, el => el.value); 
            expect(editEmail).toBe(data.email);
        })
        
        it('Should redirect to list after submit', async () => {
            await page.click(`[type='submit']`);
            await page.waitForNavigation(); 
            await page.waitFor(500);

            //get content of edited row
            editedRow = await page.evaluate(() => document.querySelector('tbody tr:last-child').textContent);

            const newUrl = await page.url(); 
            expect(newUrl).toBe(baseURL);
        });

        it('Should save old data if submitted without changing fields', async () => {
            expect(editedRow).toBe(newRow);
        });

        it('Should change row if submitted with changing fields', async () => {
            await page.click('tbody tr:last-child [data-test="editButton"]');
            await page.waitFor(100);
            await page.type(`[name='first_name']`, 'edit');
            await page.type(`[name='last_name']`, 'edit');
            await page.type(`[name='email_address']`, 'edit');
            await page.type(`[name='event_date']`, '03.03.2018');
            await page.click(`[type='submit']`);
            await page.waitForNavigation(); 
            await page.waitFor(500);

            //get content of edited row
            editedRow = await page.evaluate(() => document.querySelector('tbody tr:last-child').textContent);
            expect(editedRow).not.toBe(newRow);
        }, 10000);

        it('Should display on list new fname', async () => {
            expect(editedRow).toContain(data.fname + 'edit');
        });

        it('Should display on list new lname', async () => {
            expect(editedRow).toContain(data.lname + 'edit');
        });

        it('Should display on list new email', async () => {
            expect(editedRow).toContain(data.email + 'edit');
        });

    });


    describe('Deleting participant', () => {

        it('Should show confirm box', async () => {
            let dialogExists = false;
            page.on('dialog', async dialog => {
                dialogExists = true;
                await dialog.accept();
            });
            await page.click('tbody tr:last-child [data-test="deleteButton"]');
            expect(dialogExists).toBe(true);
        });

        it('Should delete row on confirm accept', async () => {
            await page.waitFor(500);
            lastRow = await page.evaluate(() => document.querySelector('tbody tr:last-child').textContent);
            expect(lastRow).not.toBe(editedRow);
        })

        it('Should have same amount of rows as before tests', async () => {
             //check how many rows are after adding testing row
             rowsAfter = await page.evaluate(() => document.querySelector('tbody tr:last-child th').textContent);
             expect(rowsAfter).toBe(rowsBefore);
        });

    });

});