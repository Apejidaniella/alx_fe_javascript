const quotesString = localStorage.getItem("quotes")
const quotes = JSON.parse(quotesString) || []

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
    saveQuotes();
    const quote = document.createElement("p")
    quote.innerHTML = `${text} ${category}`
    quotesDisplay.appendChild(quote)
    newQuoteText.value = ""
    newQuoteCategory.value = ""
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
const downloadBtn = document.getElementById("exportQuote")
downloadBtn.addEventListener("click", downloadJSON)
const newQuote = document.getElementById("newQuote")
newQuote.addEventListener("click", showRandomQuote)

