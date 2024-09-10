async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        return null;
    }
}

async function updateSection(id, data) {
    const section = document.getElementById(id);
    if (!data) {
        section.innerHTML = `<h2>${section.querySelector('h2').textContent}</h2><p>Falha ao carregar dados.</p>`;
        return;
    }

    // Caso os dados sejam um array de objetos
    if (Array.isArray(data) && data.length > 0) {
        let table = document.createElement('table');
        let headerRow = document.createElement('tr');
        let headers = Object.keys(data[0]);

        console.log('headers:', headers)

        headers.forEach(headerText => {
            let header = document.createElement('th');
            header.textContent = headerText;
            headerRow.appendChild(header);
        });

        table.appendChild(headerRow);

        data.forEach(rowData => {
            let row = document.createElement('tr');
            headers.forEach(key => {
                let cell = document.createElement('td');
                cell.textContent = rowData[key];
                row.appendChild(cell);
            });
            table.appendChild(row);
        });

        section.innerHTML = `<h2>${section.querySelector('h2').textContent}</h2>`;
        section.appendChild(table);
    } else {
        section.innerHTML = `<h2>${section.querySelector('h2').textContent}</h2><p>Sem dados disponíveis.</p>`;
    }
}

async function init() {
    const urls = [
        'https://dados.al.gov.br/catalogo/api/3/action/datastore_search?resource_id=8a46bec0-256d-4265-a49b-6c08e2441d70&limit=5',
        'https://dados.al.gov.br/catalogo/api/3/action/datastore_search?resource_id=61dd69ae-75a6-40b3-b61b-faffca8d494d&limit=5',
        'https://dados.al.gov.br/catalogo/api/3/action/datastore_search?resource_id=b38d7939-a946-45a8-a46f-640dc38e7fce&limit=5',
        'https://dados.al.gov.br/catalogo/api/3/action/datastore_search?resource_id=5bc7bd4a-f1e9-424e-a844-e3748dbcfd96&limit=5'
    ];

    try {
        const [data1, data2, data3, data4] = await Promise.all(urls.map(url => fetchData(url)));

        console.log(data1.result.records);
        
        updateSection('section1', data1.result.records);
        updateSection('section2', data2.result.records);
        updateSection('section3', data3.result.records);
        updateSection('section4', data4.result.records);
    } catch (error) {
        console.error('Erro ao atualizar seções:', error);
    }
}

// Isso é pra aguardar que a estrutura da página esteja disponível
document.addEventListener('DOMContentLoaded', init);
