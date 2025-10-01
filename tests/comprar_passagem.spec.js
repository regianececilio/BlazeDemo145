// FLUXO E2E COMPLETO

// Declarando o objeto test
const { test, expect } = require('@playwright/test')

// Função para retornar o seletor do elemento
function seletor_elemento(tipoElemento, linha, coluna) {

    switch (tipoElemento) {

        case 'thead':
            return `body > div.container > table > thead > tr > th:nth-child(${coluna})`
            break
        case 'tbody':
            return `body > div.container > table > tbody > tr:nth-child(${linha}) > td:nth-child(${coluna})`
            break
        case 'input':
            return `body > div.container > table > tbody > tr:nth-child(${linha}) > td:nth-child(${coluna}) > input`
            break
    }

}

// Declarando o teste E2E
test('Realizar fluxo de compra da passagem', async ({page}) => {

    // Acessando e verificando o site
    await page.goto('https://www.blazedemo.com/')
    await expect(page).toHaveURL('https://www.blazedemo.com/')


    // Página inicial
    
    // Selecionar origem e destino
    const fromPort = '[name=fromPort]', toPort = '[name=toPort]'
    await page.selectOption(fromPort, 'Boston')
    await page.selectOption(toPort, 'Cairo')

    //Ir para a página de voos
    await page.locator('.btn.btn-primary').click()


    // Página de voos

    // Verificar a página acessada
    await expect(page).toHaveURL(/.*reserve/)
    let tituloSecao = 'body > div.container > h3'
    await expect(page.locator(tituloSecao)).toHaveText('Flights from Boston to Cairo:')

    // Verificar dados funcionais
    
    // Verificar título das colunas C e D
    await expect(page.locator(seletor_elemento('thead', 0, 4))).toHaveText('Departs: Boston')
    await expect(page.locator(seletor_elemento('thead', 0, 5))).toHaveText('Arrives: Cairo')
    
    // Verificar dados do Voo 1
    await expect(page.locator(seletor_elemento('tbody', 1, 3))).toHaveText('43')
    await expect(page.locator(seletor_elemento('tbody', 1, 4))).toHaveText('Virgin America')
    await expect(page.locator(seletor_elemento('tbody', 1, 5))).toHaveText('1:43 AM')
    await expect(page.locator(seletor_elemento('tbody', 1, 6))).toHaveText('9:45 PM')
    await expect(page.locator(seletor_elemento('tbody', 1, 7))).toHaveText('$472.56')
    
    // Verificar dados do Voo 2
    await expect(page.locator(seletor_elemento('tbody', 2, 3))).toHaveText('234')
    await expect(page.locator(seletor_elemento('tbody', 2, 4))).toHaveText('United Airlines')
    await expect(page.locator(seletor_elemento('tbody', 2, 5))).toHaveText('7:43 AM')
    await expect(page.locator(seletor_elemento('tbody', 2, 6))).toHaveText('10:45 PM')
    await expect(page.locator(seletor_elemento('tbody', 2, 7))).toHaveText('$432.98')
    
    // Verificar dados do Voo 3
    await expect(page.locator(seletor_elemento('tbody', 3, 3))).toHaveText('9696')
    await expect(page.locator(seletor_elemento('tbody', 3, 4))).toHaveText('Aer Lingus')
    await expect(page.locator(seletor_elemento('tbody', 3, 5))).toHaveText('5:27 AM')
    await expect(page.locator(seletor_elemento('tbody', 3, 6))).toHaveText('8:22 PM')
    await expect(page.locator(seletor_elemento('tbody', 3, 7))).toHaveText('$200.98')
    
    // Verificar dados do Voo 4
    await expect(page.locator(seletor_elemento('tbody', 4, 3))).toHaveText('12')
    await expect(page.locator(seletor_elemento('tbody', 4, 4))).toHaveText('Virgin America')
    await expect(page.locator(seletor_elemento('tbody', 4, 5))).toHaveText('11:23 AM')
    await expect(page.locator(seletor_elemento('tbody', 4, 6))).toHaveText('1:45 PM')
    await expect(page.locator(seletor_elemento('tbody', 4, 7))).toHaveText('$765.32')
    				
    // Verificar dados do Voo 5
    await expect(page.locator(seletor_elemento('tbody', 5, 3))).toHaveText('4346')
    await expect(page.locator(seletor_elemento('tbody', 5, 4))).toHaveText('Lufthansa')
    await expect(page.locator(seletor_elemento('tbody', 5, 5))).toHaveText('1:45 AM')
    await expect(page.locator(seletor_elemento('tbody', 5, 6))).toHaveText('8:34 PM')
    await expect(page.locator(seletor_elemento('tbody', 5, 7))).toHaveText('$233.98')
    await page.waitForTimeout(1000)

    // Ir para a tela de reserva
   	// selecionando um dos voos - exemplo do voo 2
    await page.locator(seletor_elemento('input', 2, 2)).click()

   
    // Página de reserva

    // Verificar a página acessada
    await expect(page).toHaveURL(/.*purchase/)
    tituloSecao = 'body > div.container > h2'
    await expect(page.locator(tituloSecao)).toHaveText('Your flight from TLV to SFO has been reserved.')

    // Verificar dados exibidos na página
    await expect(page.locator('body > div.container > p:nth-child(2)')).toHaveText('Airline: United')
    await expect(page.locator('body > div.container > p:nth-child(3)')).toHaveText('Flight Number: UA954')
    await expect(page.locator('body > div.container > p:nth-child(4)')).toHaveText('Price: 400')
    await expect(page.locator('body > div.container > p:nth-child(5)')).toHaveText('Arbitrary Fees and Taxes: 514.76')
    await expect(page.locator('body > div.container > p:nth-child(7) > em')).toHaveText('914.76')

    //Preencher dados da página
    const inputName = '#inputName', address = '#address', city = '#city', state = '#state', zipCode = '#zipCode',
        cardType = '#cardType', creditCardNumber = '#creditCardNumber', creditCardMonth = '#creditCardMonth',
        creditCardYear = '#creditCardYear', nameOnCard = '#nameOnCard'

    await page.fill(inputName, 'Maria Jose Silva')
    await page.fill(address, 'Av. Mario Xisto Gontijo, 220')
    await page.fill(city, 'Belo Horizonte')
    await page.fill(state, 'Minas Gerais')
    await page.fill(zipCode, '30000-000')
    await page.selectOption(cardType, 'dinersclub')
    await page.fill(creditCardNumber, "125415260001251")
    await page.fill(creditCardMonth, '06')
    await page.fill(creditCardYear, '2027')
    await page.fill(nameOnCard, 'Maria J Silva')
    await page.setChecked('#rememberMe')
    await page.waitForTimeout(1000)
    
    // Ir para a tela de confirmação    
    await page.locator('.btn.btn-primary').click()
    

    // Página de confirmação

    // Verificar a página acessada
    await expect(page).toHaveURL(/.*confirmation/)
    tituloSecao = 'body > div.container > div > h1'
    await expect(page.locator(tituloSecao)).toHaveText('Thank you for your purchase today!')

    // Verificar dados exibidos na página
    // o Id e Date não serão verificados, pois mudam de valor a cada reserva
    await expect(page.locator('body > div.container > div > table > tbody > tr:nth-child(2) > td:nth-child(2)')).toHaveText('PendingCapture')
    await expect(page.locator('body > div.container > div > table > tbody > tr:nth-child(3) > td:nth-child(2)')).toHaveText('555 USD')
    await expect(page.locator('body > div.container > div > table > tbody > tr:nth-child(4) > td:nth-child(2)')).toHaveText('xxxxxxxxxxxx1111')
    await expect(page.locator('body > div.container > div > table > tbody > tr:nth-child(5) > td:nth-child(2)')).toHaveText('11 /2018')
    await expect(page.locator('body > div.container > div > table > tbody > tr:nth-child(6) > td:nth-child(2)')).toHaveText('888888')
    
    await page.waitForTimeout(1000)

})