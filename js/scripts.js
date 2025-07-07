class EmployeeAdress {
    constructor(employeesList) {
        this.employeesList = employeesList;
        this.idCounter = 0;
        this.completeEmployee = []
        this.editOrNew = 'None'
        this.currentId = 0
        this.startTable()
        this.addGlobalEvents()
    }

    resetInput() {
            let popUpName = document.querySelector("#pop-up-name")
            let popUpStreet = document.querySelector("#pop-up-street")
            let popUpNeighborhood = document.querySelector("#pop-up-neighborhood")
            let popUpCity = document.querySelector("#pop-up-city")
            let popUpState = document.querySelector("#pop-up-state")
            let popUpCountry = document.querySelector("#pop-up-country")

            popUpName.value = ''
            popUpStreet.value = ''
            popUpNeighborhood.value = ''
            popUpCity.value = ''
            popUpState.value = ''
            popUpCountry.value = '' 
            
            popUpName.classList.remove('incorrect-element')
            popUpStreet.classList.remove('incorrect-element')
            popUpNeighborhood.classList.remove('incorrect-element')
            popUpCity.classList.remove('incorrect-element')
            popUpState.classList.remove('incorrect-element')
            popUpCountry.classList.remove('incorrect-element')
    }

    validateInput() {
        
        let popUpName = document.querySelector("#pop-up-name")
        let popUpStreet = document.querySelector("#pop-up-street")
        let popUpNeighborhood = document.querySelector("#pop-up-neighborhood")
        let popUpCity = document.querySelector("#pop-up-city")
        let popUpState = document.querySelector("#pop-up-state")
        let popUpCountry = document.querySelector("#pop-up-country")        
        

        let correctElements = 0

        if (isNaN(Number(popUpName.value)) && popUpName.value != "") {
            correctElements += 1
            popUpName.classList.remove('incorrect-element')
        } else {
            popUpName.classList.add('incorrect-element')
        }

        if (isNaN(Number(popUpStreet.value)) && popUpStreet.value != "") {
            correctElements += 1
            popUpStreet.classList.remove('incorrect-element')
        } else {
            popUpStreet.classList.add('incorrect-element')
        }

        if (isNaN(Number(popUpNeighborhood.value)) && popUpNeighborhood.value != "") {
            correctElements += 1
            popUpNeighborhood.classList.remove('incorrect-element')
        } else {
            popUpNeighborhood.classList.add('incorrect-element')            
        }

        if (isNaN(Number(popUpCity.value)) && popUpCity.value != "") {
            correctElements += 1
            popUpCity.classList.remove('incorrect-element')
        } else {
            popUpCity.classList.add('incorrect-element')
        }

        if (isNaN(Number(popUpState.value)) && popUpState.value != "") {
            correctElements += 1
            popUpState.classList.remove('incorrect-element')
        } else {
            popUpState.classList.add('incorrect-element')
        }

        if (isNaN(Number(popUpCountry.value)) && popUpCountry.value !='') {
            correctElements += 1
            popUpCountry.classList.remove('incorrect-element')
        } else {
            popUpCountry.classList.add('incorrect-element')
        }

        if (correctElements != 6) {
            return false
        } else {
            return true
        }
    }

    addGlobalEvents() {
        let addEmployeeBtn = document.querySelector('#add-employee')
        let closePopUp = document.querySelector('.fa-close')
        let verifyElements = document.querySelector('.fa-check')

        let popUp = document.querySelector('#popup-window')

        addEmployeeBtn.addEventListener('click', () => {
            this.resetInput()
            this.editOrNew = 'Add'
            popUp.classList.remove('hide')
        })
        closePopUp.addEventListener('click', () => {
            popUp.classList.add('hide')
        })
        verifyElements.addEventListener('click', () =>{
            let validateElements = this.validateInput()
            // console.log(validateElements)
            if (validateElements == true) {
                if (this.editOrNew == 'Add') {
                    this.addUpdateElement('Add')

                } else if (this.editOrNew == 'Edit') {
                    this.addUpdateElement('Edit')
                }
                popUp.classList.add('hide')
            }
        })

    }

    addEventsToEmployees(template) {
        let editBtn = template.querySelector('.table-body-edit');
        let deleteBtn = template.querySelector('.table-body-delete');
        // let table = document.querySelector('#table-body')

        //manipulando texto
        let templateId = template.querySelector('.table-body-id')
        
        const employeeId = Number(templateId.textContent)
        const indexEmployeeTest = this.completeEmployee.findIndex(item =>
            item.id == employeeId
        )

        // Importante adicionar ARROW function para poder usar o THIS
        deleteBtn.addEventListener('click', () => {
            const row = deleteBtn.closest('tr');
            if (row) {
                row.remove();
                if (indexEmployeeTest !== -1) {
                    this.employeesList.splice(indexEmployeeTest, 1);
                    this.completeEmployee.splice(indexEmployeeTest, 1);
                }
            }
            // console.log(this.employeesList)
            // console.log(this.completeEmployee)
        })

        editBtn.addEventListener('click', () => {
            this.editOrNew = 'Edit'

            let templateId = template.querySelector('.table-body-id')
            this.currentId = Number(templateId.textContent)

            this.resetInput()
            let popUp = document.querySelector('#popup-window')
            popUp.classList.remove('hide')

            let templateName = template.querySelector('.table-body-name')
            let templateStreet = template.querySelector('.table-body-street')
            let templateNeighborhood = template.querySelector('.table-body-neighborhood')
            let templateCity = template.querySelector('.table-body-city')
            let templateState = template.querySelector('.table-body-state')
            let templateCountry = template.querySelector('.table-body-country')

            let popUpName = document.querySelector("#pop-up-name")
            let popUpStreet = document.querySelector("#pop-up-street")
            let popUpNeighborhood = document.querySelector("#pop-up-neighborhood")
            let popUpCity = document.querySelector("#pop-up-city")
            let popUpState = document.querySelector("#pop-up-state")
            let popUpCountry = document.querySelector("#pop-up-country")

            popUpName.value = templateName.textContent
            popUpStreet.value = templateStreet.textContent
            popUpNeighborhood.value = templateNeighborhood.textContent
            popUpCity.value = templateCity.textContent
            popUpState.value = templateState.textContent
            popUpCountry.value = templateCountry.textContent

        })
    }

    addUpdateElement(addOrEdit) {
        let popUpName = document.querySelector("#pop-up-name")
        let popUpStreet = document.querySelector("#pop-up-street")
        let popUpNeighborhood = document.querySelector("#pop-up-neighborhood")
        let popUpCity = document.querySelector("#pop-up-city")
        let popUpState = document.querySelector("#pop-up-state")
        let popUpCountry = document.querySelector("#pop-up-country")

        let employeeDict = {
            name: popUpName.value,
            street: popUpStreet.value,
            neighborhood: popUpNeighborhood.value,
            city: popUpCity.value,
            state: popUpState.value,
            country: popUpCountry.value
        };

        if (addOrEdit == 'Add') {
            this.idCounter += 1;
            this.employeesList.push(employeeDict)
            this.completeEmployee.push(
                {id: this.idCounter, employee: employeeDict}
            )
            this.insertElementInTable(employeeDict)
        } else {

            const indexEmployee = this.completeEmployee.findIndex(item =>
                item.id == this.currentId
            )

            this.completeEmployee[indexEmployee]['employee'] = employeeDict
            this.employeesList[indexEmployee] = employeeDict

            let lines = document.querySelectorAll('tbody tr')

            // console.log(this.currentId)

            lines.forEach((line) =>{
                let lineId = line.cells[0];
                let lineIdValue = Number(lineId.textContent)
                if (Number(lineIdValue) == this.currentId) {
                    line.cells[1].textContent = popUpName.value;
                    line.cells[2].textContent = popUpStreet.value;
                    line.cells[3].textContent = popUpNeighborhood.value;
                    line.cells[4].textContent = popUpCity.value;
                    line.cells[5].textContent = popUpState.value;
                    line.cells[6].textContent = popUpCountry.value;
                }
            })
        }       
        // console.log(this.completeEmployee)
        // console.log(this.employeesList)
    }



    insertElementInTable(employee) {
        let template = document.querySelector(".table-items.hide").cloneNode(true);
        template.classList.remove('hide');

        //manipulando texto
        let templateId = template.querySelector('.table-body-id')
        let templateName = template.querySelector('.table-body-name')
        let templateStreet = template.querySelector('.table-body-street')
        let templateNeighborhood = template.querySelector('.table-body-neighborhood')
        let templateCity = template.querySelector('.table-body-city')
        let templateState = template.querySelector('.table-body-state')
        let templateCountry = template.querySelector('.table-body-country')

        templateId.textContent = this.idCounter
        templateName.textContent = employee['name']
        templateStreet.textContent = employee['street']
        templateNeighborhood.textContent = employee['neighborhood']
        templateCity.textContent = employee['city']
        templateState.textContent = employee['state']
        templateCountry.textContent = employee['country']

        //Add to table
        let table = document.querySelector('#table-body')
        table.appendChild(template)

        //ADD EVENTS TO BTNS MISSING
        this.addEventsToEmployees(template)
    }

    startTable() {
        this.employeesList.forEach((element) => {
            this.idCounter += 1
            this.completeEmployee.push(
                {id: this.idCounter, employee: element}
            )
            this.insertElementInTable(element);
            
        });
        // console.log(this.employeesList)
        // console.log(this.completeEmployee)
    }
}


let employees = [
  { name: "Ana Souza", street: "123 Avenida Paulista", neighborhood: "Bela Vista", city: "São Paulo", state: "São Paulo", country: "Brazil" },
  { name: "Carlos Silva", street: "456 Rua das Laranjeiras", neighborhood: "Laranjeiras", city: "Rio de Janeiro", state: "Rio de Janeiro", country: "Brazil" },
  { name: "Mariana Oliveira", street: "789 Avenida Afonso Pena", neighborhood: "Funcionários", city: "Belo Horizonte", state: "Minas Gerais", country: "Brazil" },
  { name: "João Pereira", street: "321 Rua XV de Novembro", neighborhood: "Centro", city: "Curitiba", state: "Paraná", country: "Brazil" },
  { name: "Beatriz Lima", street: "654 Avenida Conde da Boa Vista", neighborhood: "Boa Vista", city: "Recife", state: "Pernambuco", country: "Brazil" },
  { name: "Rafael Costa", street: "987 Rua dos Andradas", neighborhood: "Centro Histórico", city: "Porto Alegre", state: "Rio Grande do Sul", country: "Brazil" },
  { name: "Camila Ramos", street: "135 Avenida Beira Mar", neighborhood: "Meireles", city: "Fortaleza", state: "Ceará", country: "Brazil" },
  { name: "Lucas Rocha", street: "246 Avenida Tancredo Neves", neighborhood: "Caminho das Árvores", city: "Salvador", state: "Bahia", country: "Brazil" },
  { name: "Fernanda Alves", street: "579 Rua Eduardo Ribeiro", neighborhood: "Centro", city: "Manaus", state: "Amazonas", country: "Brazil" },
  { name: "Thiago Martins", street: "864 SQS 202 Bloco B", neighborhood: "Asa Sul", city: "Brasília", state: "Distrito Federal", country: "Brazil" }
];

let employeeList = new EmployeeAdress(employees)
// console.log(employeeList.employeesList)
// employeeList.startTable()
// employeeList.addGlobalEvents()