
export class AlunosAPI {
    static search(username) {
        const endpoint = `https://api.github.com/users/${username}`

        return fetch(endpoint)
            .then(data => data.json())
            .then(({ login, name, public_repos, followers }) => ({
                login,
                name,
                public_repos,
                followers
            }))
    }


    static index() {
        const endpoint = `https://api.github.com/users/${username}`

        return fetch(endpoint)
            .then(data => data.json())
            .then(({ login, name, public_repos, followers }) => ({
                login,
                name,
                public_repos,
                followers
            }))

    }


}



export class Alunos {
    url = "http://localhost:3333/alunos";
    entries = [];

    constructor(root) {
        this.root = document.querySelector(root)
        this.load()
    }


    async load() {


        try {

            const response = await fetch(this.url);

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const data = await response.json();

            this.entries = data

            this.update();

        } catch (error) {
            console.error(error.message);
        }

    }

    async add(nome, email) {

        const data = {
            nome: nome,
            email: email
        }

        try {
            const response = await fetch(this.url, {
                method: "POST",
                body: JSON.stringify(data),
                headers: { "Content-type": "application/json" }
            });

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            this.load();

        } catch (error) {
            console.error(error.message);
        }

    }

    async delete(aluno) {

        try {
            const newUrl = this.url + "/" + aluno.uuid

            const response = await fetch(newUrl, {
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            this.load();

        } catch (error) {
            console.error(error.message);
        }

    }


}

export class AlunosView extends Alunos {
    constructor(root) {
        super(root)

        this.tbody = this.root.querySelector('table tbody')

        this.update()
        this.onAdd()
    }


    onAdd() {
        const addButton = this.root.querySelector('.adicionar button')
        addButton.onclick = () => {
            const inputNome = this.root.querySelector('#input-nome')
            const inputEmail = this.root.querySelector('#input-email')

            this.add(inputNome.value, inputEmail.value)

        }

    }

    update() {
        this.removeAllTr()

        this.entries.forEach(aluno => {
            const linha = this.createRow()
            linha.querySelector('.aluno-nome p').textContent = aluno.nome;
            linha.querySelector('.aluno-email p').textContent = aluno.email;

            linha.querySelector('.remover').onclick = () => {
                this.delete(aluno)
            }

            this.tbody.append(linha)
        })

    }

    createRow() {
        const tr = document.createElement('tr')

        const data = `
            <td class="aluno-nome">
                <p>Maria</p>
            </td>
            <td class="aluno-email">
                <p>maria@email</p>
            </td>
            <td>
                <button class="remover" >Remover</button>
            </td>
    `;
        tr.innerHTML = data

        return tr;

    }


    removeAllTr() {

        this.tbody.querySelectorAll('tr').forEach((tr) => {
            tr.remove()
        });
    }
}