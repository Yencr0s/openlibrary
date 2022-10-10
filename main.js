function showData() {
    document.getElementById("titulo").value = data[dataIndex].izenburua;
    document.getElementById("autor").value = data[dataIndex].egilea;
    document.getElementById("ISBN").value = data[dataIndex].isbn;
    document.getElementById("Fecha").value = data[dataIndex].data;
    document.getElementById("imagen").src =
        "https://covers.openlibrary.org/b/id/" + data[dataIndex].filename;
}

function cargarScripts() {
    data = [
        {
            isbn: "1617293563",
            egilea: "Raoul-Gabriel Urma",
            data: "Nov 15, 2018",
            izenburua:
                "Modern Java in Action: Lambdas, streams, functional and reactive programming",
            filename: "8508261-M.jpg",
        },

        {
            isbn: "9781617291302",
            egilea: "Benjamin Muschko",
            data: "Mar 09, 2014",
            izenburua: "Gradle in Action",
            filename: "8514400-M.jpg",
        },

        {
            isbn: "1883601126",
            egilea: "Matt Welsh",
            data: "1995",
            izenburua: "The Linux bible",
            filename: "6764181-M.jpg",
        },

        {
            isbn: "9781617293290",
            egilea: "Dmitry Jemerov",
            data: "Feb 19, 2017",
            izenburua: "Kotlin in Action",
            filename: "8507716-M.jpg",
        }
    ];

    showData();
    document.getElementById("btnPrev").onclick = function () {
        if (dataIndex > 0) {
            dataIndex--;
            showData();
        }
    };

    // how to use onclick

    document.getElementById("btnSig").onclick = function () {
        if (dataIndex < data.length - 1) {
            dataIndex++;
            showData();
        }
    };

    document.getElementById("btnSearch").onclick = async function () {
        let isbn = document.getElementById("ISBN").value;
        let books = data.filter((book) => book.isbn == isbn);
        if (books.length > 0) {
            dataIndex = data.indexOf(books[0]);
        } else {
            let resultado = await fetch(
                "https://openlibrary.org/api/books?bibkeys=ISBN:" +
                    isbn +
                    "&jscmd=data&format=json"
            ).then(r => {
                return r.json();
            });
            data.push({isbn: isbn, egilea: resultado["ISBN:" + isbn].authors[0].name, data: resultado["ISBN:" + isbn].publish_date, izenburua: resultado["ISBN:" + isbn].title, filename: resultado["ISBN:" + isbn].cover["medium"].replace("https://covers.openlibrary.org/b/id/", "")});
            dataIndex = data.length - 1;

            console.log(resultado)
            console.log(resultado["ISBN:" + isbn].title)
            console.log(resultado["ISBN:" + isbn].authors[0].name)
            console.log(resultado["ISBN:" + isbn].publish_date)
            console.log(resultado["ISBN:" + isbn].cover["medium"])
        }
        showData();
        // //access data from r.json
        

        // document.getElementById("titulo").value = resultado["ISBN:" + isbn].title;
        // document.getElementById("autor").value = resultado["ISBN:" + isbn].authors[0].name;
        // document.getElementById("ISBN").value = isbn;
        // document.getElementById("Fecha").value = resultado["ISBN:" + isbn].publish_date;
        // document.getElementById("imagen").src = resultado["ISBN:" + isbn].cover["medium"];

    };
}

let dataIndex = 0;
let data;
window.onload = cargarScripts;

