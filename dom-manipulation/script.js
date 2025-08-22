const quotesString = localStorage.getItem("quotes")
const quotes = JSON.parse(quotesString) || []
const categoryFilter = document.getElementById("categoryFilter")

function showRandomQuote() {
    const quotesDisplay = document.getElementById("quoteDisplay")
  
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    
    quotesDisplay.innerHTML = `${randomQuote.text} ${randomQuote.category}`
    sessionStorage.setItem("lastViewed", JSON.stringify({text: randomQuote.text, category: randomQuote.category}))

}

function createAddQuoteForm() {
    const quotesDisplay = document.getElementById("quoteDisplay")
    const newQuoteText = document.getElementById("newQuoteText")
    const newQuoteCategory = document.getElementById("newQuoteCategory")
    const text = newQuoteText.value.trim() || ""
    const category = newQuoteCategory.value.trim() || ""
    quotes.push({ text, category }) 
    populateCategories();
    saveQuotes();
    const quote = document.createElement("p")
    quote.innerHTML = `${text} ${category}`
    quotesDisplay.appendChild(quote)
    newQuoteText.value = ""
    newQuoteCategory.value = ""
    savePost(text, category)
} 
function addQuote() {
    createAddQuoteForm()
}

function downloadJSON() {
    const jsonString = JSON.stringify(quotes, null, 2)
    const blob = new Blob([jsonString], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "quotes.json"
    link.click()
}

function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes))
}

 function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}

  
function filterQuotes() {
    const selectedCategory = categoryFilter.value
    localStorage.setItem("lastFilter", selectedCategory)
    const quotesDisplay = document.getElementById("quoteDisplay")
    const filteredQuotes = quotes.filter(quote => quote.category === selectedCategory)
    quotesDisplay.innerHTML = ""
    filteredQuotes.forEach(quote => {
        const newQuote = document.createElement("p")
        newQuote.textContent = `${quote.text} ${quote.category}`
        quotesDisplay.appendChild(newQuote)
    })
   
}

function populateCategories() {
    const categories = quotes.map(quote => quote.category)
    const uniqueCategories = [...new Set(categories)]
    uniqueCategories.forEach(category => {
        const option = document.createElement("option") 
        option.innerHTML = category
        option.value = category
        categoryFilter.appendChild(option)
    });
} 

const downloadBtn = document.getElementById("exportQuote")
downloadBtn.addEventListener("click", downloadJSON)
const newQuote = document.getElementById("newQuote")
newQuote.addEventListener("click", showRandomQuote)

populateCategories()

categoryFilter.value = localStorage.getItem("lastFilter")

async function fetchQuotesFromServer() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        const posts = await response.json()
        localStorage.setItem("posts", JSON.stringify(posts.slice(0, 10)))
    } catch (error) {
        console.error(error)
    }
}
async function savePost(title, body) {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                title,
                body,
                userId: 1,
            }),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        })
        const post = await response.json()
        const posts = JSON.parse(localStorage.getItem("posts"))
        localStorage.setItem("posts", JSON.stringify([...posts, post]))
    } catch (error) {
        console.error(error)
    }
}

fetchQuotesFromServer()