type Customer = { id: number, lastname: string, firstname: string}
type AccountType = 'epargne' | 'Courant' | 'Titre'
type Account = {id: number, accountNumber: string, customerID: number, accountType: AccountType, amount: number }
type Operation = {id: number, type: 'depot' | 'retrait', operationDate: Date, amount: number, accountID: number}

class OperationService {

    private customerList: Customer[] = []

    private accountList: Account[] = []
    private operationList: Operation[] = []

    createCustomer(customer: Customer): Customer{
        this.customerList.push(customer)

        return customer
    }
    createAccount(account: Account): Account{
        this.accountList.push(account)

        return account
    }
    findAccountById(id: number): Account | boolean{
        const accountFounded = this.accountList.find(item => item.id === id)
        return accountFounded ?? false
    }
    makeOperation(operation: Operation): Operation {

        const account = this.findAccountById(operation.accountID)
        if(!account) {
            throw new Error('Account not found')
        }
        const accountFounded = account as Account

        if(operation.type === 'retrait' && operation.amount > accountFounded.amount) {
            throw new Error('Votre solde est inferieur au montant du retrait')
        }

        accountFounded.amount = operation.type === 'retrait' ? accountFounded.amount = accountFounded.amount - operation.amount : accountFounded.amount = accountFounded.amount + operation.amount

        console.log(`Le nouveau solde de  ${accountFounded.accountNumber} est de ${accountFounded.amount} FCFA`)

        this.operationList.push(operation)

        return operation
    }

    get customerLists(): Customer[] {
        return this.customerList
    }
    get accountLists(): Account[] {
        return this.accountList
    }
    get operationLists(): Operation[] {
        return this.operationList
    }
}

const operationService = new OperationService()
const light: Customer = {
    id: 1,
    lastname: 'Light',
    firstname: 'Yeo'
}

const lea: Customer = {
    id: 2,
    lastname: 'Amenan',
    firstname: 'Lea'
}
const lightCustomer = operationService.createCustomer(light)
const leaCustomer = operationService.createCustomer(lea)

const lightAccount = operationService.createAccount({
    id: 1,
    accountNumber: 'AC0001',
    customerID: lightCustomer.id,
    accountType: 'Courant',
    amount: 500
})

const leaAccount = operationService.createAccount({
    id: 2,
    accountNumber: 'AC0002',
    customerID: leaCustomer.id,
    accountType: 'Titre',
    amount: 1000
})
operationService.makeOperation({
    id: 1,
    type: 'retrait',
    accountID: lightAccount.id,
    operationDate: new Date(),
    amount: 500
})

operationService.makeOperation({
    id: 2,
    type: 'depot',
    accountID: lightAccount.id,
    operationDate: new Date(),
    amount: 10000
})

operationService.makeOperation({
    id: 3,
    type: 'retrait',
    accountID: leaAccount.id,
    operationDate: new Date(),
    amount: 500
})

console.log('La liste des clients est: ', operationService.customerLists)
console.log('La liste des comptes est: ', operationService.accountLists)
console.log('La liste des opérations est: ', operationService.operationLists)