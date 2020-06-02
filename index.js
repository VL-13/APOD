fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
.then(response => response.json())
.then(data => {
    document.getElementById('new-image').setAttribute("src", data.url);

    let todayDate = document.getElementById('today');
    todayDate.innerText = data.date

    let newTitle = document.getElementById('title');
    newTitle.innerText = data.title
    
    let info = document.getElementById('info');
    info.innerText = data.explanation

    //let copyRight = document.getElementById('copyright');
    //copyRight.innerText = data.copyright
})