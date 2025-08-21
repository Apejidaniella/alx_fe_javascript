const quotes = [
    {
        "text": "He who laugh last laugh best.",
        "category": "category 1"
    },
    {
        "text": "Half bread is better than none",
        "category": "category 2"
    }
]

function showRandomQuote() {
    const quotesDisplay = document.getElementById("quoteDisplay")
    
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    
    quotesDisplay.innerHTML = `${randomQuote.text} ${randomQuote.category}`

}

function createAddQuoteForm() {
    const quotesDisplay = document.getElementById("quoteDisplay")
    const newQuoteText = document.getElementById("newQuoteText")
    const newQuoteCategory = document.getElementById("newQuoteCategory")
    const text = newQuoteText.value.trim() || ""
    const category = newQuoteCategory.value.trim() || ""
    quotes.push({ text, category }) 
    const quote = document.createElement("p")
    quote.innerHTML = `${text} ${category}`
    quotesDisplay.appendChild(quote)
    newQuoteText.value = ""
    newQuoteCategory.value = ""
} 
function addQuote() {
    createAddQuoteForm()
}
const newQuote = document.getElementById("newQuote")
newQuote.addEventListener("click", showRandomQuote)