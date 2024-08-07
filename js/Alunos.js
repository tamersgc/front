




export class Alunos {
    constructor(root) {
        this.root = document.querySelector(root)
        this.load()
    }


    async load() {

        this.entries = []

        // this.entries = [{
        //     nome: 'maykbrito',
        //     email: 'maykbrito@email.com'
        // },
        // {
        //     nome: 'joao',
        //     email: 'joao@email.com'
        // },
        // {
        //     nome: 'maria',
        //     email: 'maria@email.com'
        // }
        // ]



        try {
            const url = "http://localhost:3333/alunos";

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const data = await response.json();

            this.entries = data || []

            console.log("TESTE")

            this.update();

            // console.log(data)

            // console.log(this.entries);
            // console.log(this.entries2);
        } catch (error) {
            console.error(error.message);
        }

        console.log(this.entries);




    }

    delete(aluno) {
        const filteredENtries = this.entries.filter(entry => entry.email !== aluno.email)

        console.log(filteredENtries)

        this.entries = filteredENtries

        this.update()

    }


}

export class AlunosView extends Alunos {
    constructor(root) {
        super(root)

        this.tbody = this.root.querySelector('table tbody')


        this.update()
    }

    update() {
        this.removeAllTr()

        console.log("UPDATE")

        console.log(this.entries)



        this.entries.forEach(aluno => {
            const linha = this.createRow()
            console.log(linha)
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