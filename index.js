import './src/style.css'

const requests = require('axios').default

const api = 'https://api.hh.ru/vacancies'
const $form = document.querySelector('form')
const $tbody = document.querySelector('tbody')

const hideFormError = function () { document.querySelector('.widget-form-error').style.visibility = 'hidden' }
const showFormError = function () { document.querySelector('.widget-form-error').style.visibility = 'visible' }

const showTableLoader = function() { document.querySelector('.widget-table-loader').style.visibility = 'visible' }
const hideTableLoader = function() { document.querySelector('.widget-table-loader').style.visibility = 'hidden' }

$form.addEventListener('submit', function (event) {
    event.preventDefault()
    
    hideFormError()
    $tbody.innerHTML = ''
    
    const params = {
        text: document.querySelector('#vacancy').value,
        salary: document.querySelector('#salary').value,
        per_page: document.querySelector('#per-page').value,
        page: document.querySelector('#page').value
    }

    if( params.salary === "" || params.page === "") {
        showFormError()
        return
    }

    showTableLoader()
    const req = requests.get(api, {
        params: params
    })

    req.then(response => {
        console.log(response)
        response.data.items.forEach(element => {
            
            $tbody.innerHTML += `
            <tr>
                <td>${element.id}</td>
                <td>${element.name}</td>
                <td>${element.snippet.requirement}<br>${element.snippet.responsibility}</td>
            </tr>
            `
        });

        hideTableLoader()
    })
    .catch(error => {
        alert(error.message);
    });

} )
