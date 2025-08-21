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
    const newQuoteText = document.getElementById("newQuoteText")
    const newQuoteCategory = document.getElementById("newQuoteCategory")
    const text = newQuoteText.value.trim() || ""
    const category = newQuoteCategory.value.trim() || ""
    quotes.push({ text, category }) 
    newQuoteText.value = ""
    newQuoteCategory.value = ""
} 
function addQuote() {
    createAddQuoteForm()
}
const newQuote = document.getElementById("newQuote")
newQuote.addEventListener("click", showRandomQuote)