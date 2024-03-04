 const books = [
     {title: "TGG", author: "FSF", year: "1925"},
     {title: "TKMB", author: "HL", year: "1960"},
     {title: "1984", author: "GO", year: "1949"},
     {title: "1984", author: "UP", year: "1949"},
];



// function getBookTitleByYear(books){
//     const bookshelf = {};
//     for (let i = 0; i<books.length; i++){
        //  let Bookyear = books[i].year;
        //  let Booktitle = books[i].title;
//         if(Bookyear[i] === Bookyear[i+1]){
//             bookshelf[Bookyear]= [Booktitle];
//         }
//         else {
//             Bookyear = [Booktitle];
//         }
//     };
    
//     return bookshelf;
//     }

function getBookTitlesByYear(books) {
    const bookshelf = {};
    for (let i = 0; i < books.length; i++) {
        const { title, author, year } = books[i];
        
        if (bookshelf[year]) {
            bookshelf[year].push(title);
        }
        else {
            bookshelf[year] = [title];
        }
    }
    
    return bookshelf;
}

export function getBookTitlesByYear(){};S
